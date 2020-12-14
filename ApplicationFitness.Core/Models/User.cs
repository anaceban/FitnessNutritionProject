using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationFitness.Domain.Models
{
    public class User : IdentityUser<int>
    { 
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Weight { get; set; }
        public int Height { get; set; }
        public int YearOfBirth { get; set; }
        public string Gender { get; set; }

        public List<UserSchedule> UserSchedules { get; set; }
        public List <Review> Reviews { get; set; } 
        public int NumberOfCaloriesPerDay { get; set; }
        public string ProgramTypeName { get; set; }
    }

    
}
