using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationFitness.Domain.Models
{
    public class ProgramType : BaseEntity
    {
        public string Name { get; set; }
        public int ProgramScheduleId { get; set; }
        public ProgramSchedule ProgramSchedule { get; set; }
    }
}
