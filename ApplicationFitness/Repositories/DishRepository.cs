using ApplicationFitness.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApi.Repositories;

namespace ApplicationFitness.Infrastracture.Repositories
{
    public class DishRepository : Repository<Dish>, IDishRepository
    {
        public DishRepository(FitnessAppContext context): base(context)
        {

        }
        public IEnumerable<Dish> GetDishForDay(int dayId)
        {
            var dishes = _context.DishDays.Where(d => d.ProgramDayId == dayId).Select(d => d.Dish);
            return dishes;
        }
    }
}
