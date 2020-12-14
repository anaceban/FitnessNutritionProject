using ApplicationFitness.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using WebApi.Repositories;

namespace ApplicationFitness.Infrastracture.Repositories
{
    public interface IDishRepository: IRepository<Dish>
    {
        IEnumerable<Dish> GetDishForDay(int dayId);
    }

}
