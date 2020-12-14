using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ApplicationFitness.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Identity;
using ApplicationFitness.Domain.Models.Auth;
using WebApi.Services;
using WebApi.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AutoMapper;
using WebApi.Services.Interfaces;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IUserService _userService;
        private readonly SignInManager<User> _signInManager;
        private readonly IProgramScheduleService _programScheduleService;
        private readonly AuthOptions _authenticationOptions;
        private readonly IMapper _mapper;
        private readonly IProgramDayService _dayService;
        private readonly IDayDishService _dayDishService;
        private readonly IUserReviewService _userReviewService;

        public AccountController(UserManager<User> userManager, RoleManager<Role> roleManager,
            IUserService userService, SignInManager<User> signInManager, IProgramScheduleService programScheduleService,
            IOptions<AuthOptions> authOptions, IMapper mapper, IProgramDayService dayService, IDayDishService dayDishService,
            IUserReviewService userReviewService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _userService = userService;
            _signInManager = signInManager;
            _programScheduleService = programScheduleService;
            _authenticationOptions = authOptions.Value;
            _mapper = mapper;
            _dayService = dayService;
            _dayDishService = dayDishService;
            _userReviewService = userReviewService;
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("register")]
        public async Task<UserManagerResponse> Register([FromBody] RegisterModelDto model)
        {
            if (ModelState.IsValid)
            {
                var userCheck = await _userManager.FindByEmailAsync(model.Email);

                if (userCheck == null)
                {
                    var user = new User
                    {
                        Email = model.Email,
                        UserName = model.Email,
                        FirstName = model.FirstName,
                        LastName = model.LastName
                    };
                    var result = await _userManager.CreateAsync(user, model.Password);
                    if (result.Succeeded)
                    {
                        var resultRole = _roleManager.RoleExistsAsync("user").Result;
                        if (!resultRole)
                        {
                            var role = new Role("user");
                            var roleResult = _roleManager.CreateAsync(role).Result;
                            if (!roleResult.Succeeded)
                            {
                                return new UserManagerResponse
                                {
                                    Message = "Such User Already Exist"
                                };
                            }
                        }
                        await _userManager.AddToRoleAsync(user, "user");
                        await _signInManager.SignInAsync(user, false);
                        var encodedToken = JwtService.GenerateJwt(user, _userManager, _authenticationOptions);
                        return await JwtService.GenerateJwt(user, _userManager, _authenticationOptions);
                    }
                    else
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError(string.Empty, error.Description);
                            return new UserManagerResponse
                            {
                                Message = "Error"
                            };
                        }
                    }
                }
                return new UserManagerResponse
                {
                    Message = "User With Such Email Already Exist",
                    IsSucces = false
                };
            }

            return new UserManagerResponse
            {
                Message = "Successfully",
                IsSucces = true
            };
        }
        [HttpPut("page")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> CreateProfilePage([FromBody] UserProfileDto dto)
        {
            if (dto == null)
            {
                return NotFound();
            }
            if (ModelState.IsValid)
            {
                var user = await _userManager.GetUserAsync(HttpContext.User);

                _userService.UpdateUserProfile(dto, user);
                var schedule = _programScheduleService.FindProgramForUser(user);
                if (schedule == null)
                {
                    return BadRequest("No such program schedule");
                }

                return Ok(schedule);
            }
            return Ok();
        }

        [HttpGet("program")]
        [Authorize(Roles = "user")]
        public IActionResult GetScheduleForUser()
        {
            var user = _userManager.GetUserAsync(HttpContext.User);
            var programSchedule = _programScheduleService.GetProgramForUser(user.Result);
            if(programSchedule == null)
            {
                return Ok();
            }
            return Ok(_mapper.Map<ProgramScheduleDto>(programSchedule));
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<UserManagerResponse> Login([FromBody] LoginModelDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new UserManagerResponse
                {
                    IsSucces = false,
                    Message = "User with such email doesn't exist"
                };
            }
            var checkingPasswordResult = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);

            if (checkingPasswordResult.Succeeded)
            {
                return await JwtService.GenerateJwt(user, _userManager, _authenticationOptions);
            }

            return new UserManagerResponse
            {
                Message = "Incorect password"
            };
        }
        [HttpPost]
        [Authorize]
        [Route("logout")]
        public async Task<IActionResult> LogOut()
        {
            await _signInManager.SignOutAsync();
            return Ok("Successfully");
        }

        [HttpGet("profilePage")]
        [Authorize(Roles = "user")]
        public IActionResult GetUserData()
        {
            var user = _userManager.GetUserAsync(HttpContext.User);
            var data = new UserDataDto
            {
                FirstName = user.Result.FirstName,
                LastName = user.Result.LastName,
                Weight = user.Result.Weight,
                Height = user.Result.Height,
                NumberOfCaloriesPerDay = user.Result.NumberOfCaloriesPerDay,
                YearOfBirth = user.Result.YearOfBirth
            };
            return Ok(data);
        }
        [HttpGet("days")]
        [Authorize(Roles = "user")]
        public IActionResult GetProgramDays()
        {
            var user = _userManager.GetUserAsync(HttpContext.User);
            var schedule = _programScheduleService.FindProgramForUser(user.Result);
            var programDays = _dayService.GetProgramDayByScheduleId(schedule.Id).ToList();
            return Ok(programDays);
        }
        [HttpGet("dishes")]
        [Authorize(Roles = "user")]
        public IActionResult GetProgramDishes()
        {
            var user = _userManager.GetUserAsync(HttpContext.User);
            var dishes = _programScheduleService.GetDishes(user.Result);

            return Ok(dishes);
        }

    }
}
