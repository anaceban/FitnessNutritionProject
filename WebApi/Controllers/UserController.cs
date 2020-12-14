using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationFitness.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Identity;
using WebApi.Services;
using WebApi.Sorting;
using Microsoft.EntityFrameworkCore;
using ApplicationFitness.Domain.Models.Auth;
using WebApi.Services.Interfaces.Admin;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserManager<User> _userManager;
        IUserService _userService;
        IMapper _mapper;
        IUserRoleService _userRoleService;

        public UserController(UserManager<User> userManager, IUserService userService, IMapper mapper, IUserRoleService userRoleService)
        {
            _userManager = userManager;
            _userService = userService;
            _mapper = mapper;
            _userRoleService = userRoleService;
        }

        [Authorize(Roles = "admin")]
        [HttpGet("users")]
        public IActionResult GetAllUsers()
        {
            var users = _userService.GetUsers();
            return Ok(users);
        }

        [Authorize(Roles = "admin")]
        [HttpDelete]
        public IActionResult DeleteUserById(int id)
        {
            var user = _userService.GetUserById(id);
            if (user != null)
            {
                _userService.RemoveUserById(id);
            }
            
            return Ok();
        }

        [Authorize(Roles = "admin")]
        [HttpGet("sorted")]
        public ActionResult<PagedCollectionResponse<UserDto>> Get([FromQuery] FilterModel filter)
        {
            var users = _userService.GetUsersFiltered(filter);
            var adminIds = _userRoleService.GetAdminIds();
            var result = PagedCollectionResponse<UserDto>.Create(users, filter, (u) =>
            {
                var userDto = _mapper.Map<UserDto>(u);
                userDto.IsAdmin = adminIds.Contains(u.Id);
                return userDto;
            });
            return result;
        }


        [HttpPut]
        [Authorize(Roles = "admin")]
        [Route("updateRole")]
        public ActionResult MakeUserAdmin([FromBody] UserDto user)
        {
            _userRoleService.UpdateUserRole(user);
            return Ok();
        }
    }
}