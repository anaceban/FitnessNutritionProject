using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class ProgramScheduleDto
    {
        public int Id { get; set; }
        public int ProgramTypeId { get; set; }
        public string FitnessProgramName { get; set; }
        public string NutritionProgramName { get; set; }
        public string FitnessProgramDescription { get; set; }
        public string NutritionProgramDescription { get; set; }
    }
}
