using ApplicationFitness.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;

namespace WebApi.Services.Interfaces
{
    public interface IDayDishService
    {
        List<DishDay> GetAll();

    }
}
