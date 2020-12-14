using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class UserDataDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int YearOfBirth { get; set; }
        public int Weight { get; set; }
        public int Height { get; set; }
        public int NumberOfCaloriesPerDay { get; set; }
    }
}
