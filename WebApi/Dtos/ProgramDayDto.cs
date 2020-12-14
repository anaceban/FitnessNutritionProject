using ApplicationFitness.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class ProgramDayDto
    {
        public int ScheduleId { get; set; }
        public string Name { get; set; }
        public string TrainingLink { get; set; }
    }
}
