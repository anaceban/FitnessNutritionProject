using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int YearOfBirth { get; set; }
        public string PrimaryGoal { get; set; }
        public string LevelOfFitnessExperience { get; set; }
        public bool IsAdmin { get; set; }

    }
}
