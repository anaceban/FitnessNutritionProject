using ApplicationFitness.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class AddDishDay
    {
        public int ScheduleId { get; set; }
        public string DayName { get; set; }
        public string TrainingLink { get; set; }
        public List<int> dishes { get; set; }
    }
}
