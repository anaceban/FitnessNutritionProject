using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Sorting
{
    public abstract class FilterModelBase: ICloneable
    {
        public int Page { get; set; }
        public int Limit { get; set; }

        public FilterModelBase()
        {
            Page = 1;
            Limit = 100;
        }

        public abstract object Clone();
    }
}
