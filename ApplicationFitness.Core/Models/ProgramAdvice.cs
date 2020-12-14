using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationFitness.Domain.Models
{
    public class ProgramAdvice : BaseEntity
    {
        public string AdviceForUser { get; set; }
        public string AdviceDesc { get; set; }
    }
}
