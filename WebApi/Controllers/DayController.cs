using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Services.Interfaces;
using WebApi.Sorting;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DayController : ControllerBase
    {
        private readonly IProgramDayService _programDayService;
        IMapper _mapper;
        public DayController(IProgramDayService programDayService, IMapper mapper)
        {
            _programDayService = programDayService;
            _mapper = mapper;
        }

        [HttpPost("addDay")]
        [Authorize(Roles = "admin")]
        public IActionResult Post([FromBody] AddDishDay dto)
        {
            _programDayService.AddNewProgramDay(dto);
            return Ok();
        }
        [HttpPost("addDishDay")]
        [Authorize(Roles = "admin")]
        public IActionResult Post([FromBody] DayDishDto dto)
        {
            _programDayService.AddNewDishDay(dto);
            return Ok();
        }

        [HttpGet("getDayIds")]
        [Authorize(Roles = "admin")]
        public IActionResult Get()
        {
            var ids = _programDayService.GetProgramDaysIds();
            return Ok(ids);
        }
        
        [HttpGet("allDays")]
        [Authorize(Roles = "admin")]
        public ActionResult<PagedCollectionResponse<DayDto>> Get([FromQuery] FilterModel filter)
        {

            var days = _programDayService.GetProgramDays(filter);
            var result = PagedCollectionResponse<DayDto>.Create(days, filter, (u) => _mapper.Map<DayDto>(u));

            return Ok(result);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public IActionResult Delete(int id)
        {
            var day = _programDayService.RemoveDayById(id);
            return Ok(day);
        }

    }
}
