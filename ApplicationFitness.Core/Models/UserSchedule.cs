using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationFitness.Domain.Models
{
    public class UserSchedule 
    { 
        public int UserId { get; set; }
        public User User { get; set; }
        public int ProgramScheduleId { get; set; }
        public ProgramSchedule ProgramSchedule { get; set; }

    }
}
