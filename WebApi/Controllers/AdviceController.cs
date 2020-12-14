using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services.Interfaces;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdviceController : ControllerBase
    {
        private readonly IAdviceService _adviceService;

        public AdviceController(IAdviceService adviceService)
        {
            _adviceService = adviceService;
        }

        [AllowAnonymous]
        [HttpGet("advices")]
        public IActionResult GetAdvices()
        {
            var advices = _adviceService.GetProgramAdvices();
            return Ok(advices);
        }
    }
}
