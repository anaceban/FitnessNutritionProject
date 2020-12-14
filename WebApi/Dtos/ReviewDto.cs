using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Dtos
{
    public class ReviewDto
    {
        [Required]
        public string Comment { get; set; }
        public int ScheduleId { get; set; }
        public int RatingMark { get; set; }

    }
}
