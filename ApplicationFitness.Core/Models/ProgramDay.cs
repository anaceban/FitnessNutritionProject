using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationFitness.Domain.Models
{
    public class ProgramDay : BaseEntity
    {  
        public string Name { get; set; }
        public List<DishDay> DishDays { get; set; }
        public int ScheduleId { get; set; }
        public ProgramSchedule Schedule { get; set; }
        public string TrainingLink { get; set; }
    }
}
