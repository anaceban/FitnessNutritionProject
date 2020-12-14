using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationFitness.Domain.Models
{
    public class Review : BaseEntity
    {
        public string Comment { get; set; } 
        public User User { get; set; }
        public ProgramSchedule ProgramSchedule { get; set; }
        public int ScheduleId { get; set; }
        public int UserId { get; set; }
        public int RatingMark { get; set; }
    }
}
