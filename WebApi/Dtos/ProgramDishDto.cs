using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class ProgramDishDto
    {
        public string TrainingLink { get; set; }
        public int ProgramDayNumber { get; set; }
        public IEnumerable<DishDto> Dishes { get; set; }
    }
}
