using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationFitness.Domain.Models
{
    public class ProgramSchedule : BaseEntity
    { 
        public List<ProgramDay> ProgramWeek { get; set; }

        public ProgramType ProgramType { get; set; }
        public int ProgramTypeId { get; set; }
        public string FitnessProgramDescription { get; set; }
        public string NutritionProgramDescription { get; set; }
        public string FitnessProgramName { get; set; }
        public string NutritionProgramName { get; set; }
        public List<UserSchedule> UserSchedules { get; set; }
        public List<Review> Reviews { get; set; }
    }
}
