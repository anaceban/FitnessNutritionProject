using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationFitness.Domain.Models
{
    public class DishDay 
    {
        public int DishId { get; set; }
        public Dish Dish { get; set; }
        public int ProgramDayId { get; set; }
        public ProgramDay ProgramDay { get; set; }
    }
}
