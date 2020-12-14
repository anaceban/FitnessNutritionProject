using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class GetReviewDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Comment { get; set; }
        public int ScheduleId { get; set; }
        public int RatingMark { get; set; }
    }
}
