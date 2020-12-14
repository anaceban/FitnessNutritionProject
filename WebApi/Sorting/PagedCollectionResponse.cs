using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Sorting
{
    public class PagedCollectionResponse<T> where T : class
    {
        public int TotalItemsCount { get; set; }
        public IEnumerable<T> Items { get; set; }
        public int CurrentPage { get; set; }

        private PagedCollectionResponse()
        {

        }

        public static PagedCollectionResponse<T> Create<E>(IEnumerable<E> collection, FilterModel filter, Func<E, T> map)
        {
            var result = new PagedCollectionResponse<T>();
            result.Items = collection.Skip((filter.Page) * filter.Limit).Take(filter.Limit).Select(map).ToList();
            result.TotalItemsCount = collection.Count();
            result.CurrentPage = filter.Page;
            return result;
        }
    }
}
