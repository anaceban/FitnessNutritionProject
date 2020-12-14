using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class CreateProgramScheduleDto
    {
        public int Id { get; set; }

        public int? ProgramTypeId { get; set; }
        [Required]
        public string FitnessProgramName { get; set; }
        [Required]
        public string NutritionProgramName { get; set; }
        public string FitnessProgramDescription { get; set; }
        [Required]
        public string NutritionProgramDescription { get; set; }
        [Required]
        public string TypeName { get; set; }
    }
}
