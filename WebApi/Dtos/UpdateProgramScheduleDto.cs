using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class UpdateProgramScheduleDto
    {
        public int ProgramTypeId { get; set; }
        public string FitnessProgramName { get; set; }
        public string NutritionProgramName { get; set; }

    }
}
