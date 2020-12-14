using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Dtos;
using ApplicationFitness.Domain.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserScheduleController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserScheduleService _userScheduleService;

        public UserScheduleController(IMapper mapper, IUserScheduleService userScheduleService)
        {
            _mapper = mapper;
            _userScheduleService = userScheduleService;
        }
        [HttpGet]
        public IActionResult Get(int id)
        {
            var userProgram = _userScheduleService.GetUserScheduleById(id);
            if (userProgram == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<UserProgramDto>(userProgram));
        }

    }
}
