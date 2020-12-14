using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Services;
using WebApi.Sorting;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramTypeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProgramTypeService _programTypeService;

        public ProgramTypeController(IProgramTypeService programTypeService, IMapper mapper)
        {
            _programTypeService = programTypeService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("types")]

        public IActionResult Get()
        {
            var programTypes = _programTypeService.GetProgramTypes();
            var rezult = programTypes.Select(p => _mapper.Map<ProgramTypeDto>(p)).ToList();
            return Ok(rezult);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("filtered")]
        public ActionResult<PagedCollectionResponse<ProgramTypeDto>> Get([FromQuery] FilterModel filter)
        {
            var types = _programTypeService.GetTypesFiltered(filter);
            var result = PagedCollectionResponse<ProgramTypeDto>.Create(types, filter, (t) => _mapper.Map<ProgramTypeDto>(t));
            return result;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var programType = _programTypeService.GetProgramTypeById(id);
            if (programType == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ProgramTypeDto>(programType));

        }
        [Authorize(Roles = "admin")]
        [HttpPost("create")]
        public IActionResult Post([FromBody] CreateProgramTypeDto dto)
        {
            var programType = _programTypeService.AddNewProgramType(dto);

            if (programType == null)
                return BadRequest("ProgramType with such name already exists");

            var result = _mapper.Map<ProgramTypeDto>(programType);

            return CreatedAtAction(nameof(Get), new { id = programType.Id }, result);
        }
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ProgramTypeDto dto)
        {
            var programType = _programTypeService.UpdateProgramType(id, dto);

            if (programType == null)
                return BadRequest("Another programType with such FitnessProgramName already exists");

            return NoContent();
        }
        [AllowAnonymous]
        [HttpPatch("{id}")]
        public IActionResult Patch(int id, [FromBody] UpdateProgramTypeDto dto)
        {
            var programType = _programTypeService.UpdateProgramTypeDetails(id, dto);

            if (programType == null)
                return NotFound();

            var result = _mapper.Map<ProgramTypeDto>(programType);
            return Ok(result);
        }
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _programTypeService.RemoveProgramTypeById(id);
            return NoContent();
        }
    }
}
