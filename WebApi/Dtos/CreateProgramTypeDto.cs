using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class CreateProgramTypeDto
    {
        [Required]
        [StringLength(200, MinimumLength = 5, ErrorMessage = "Name is too short")]
        public string Name { get; set; }
        public int ScheduleId { get; set; }
    }
}
