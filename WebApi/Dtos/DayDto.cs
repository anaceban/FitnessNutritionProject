using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class DayDto
    {
        public int Id { get; set; }
        public int ScheduleId { get; set; }
        public string Name { get; set; }
        public string TrainingLink { get; set; }
        public string TypeName { get; set; }
        public IEnumerable<DishDto> Dishes {get; set;}
    }
}
