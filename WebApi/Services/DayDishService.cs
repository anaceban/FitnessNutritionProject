using ApplicationFitness;
using ApplicationFitness.Domain.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Services.Interfaces;

namespace WebApi.Services
{
    public class DayDishService : IDayDishService
    {
        private readonly FitnessAppContext _context;
        public DayDishService(FitnessAppContext context)
        {
            _context = context;
        }
        public List<DishDay> GetAll()
        {
            var dishes = _context.DishDays.ToList();
            return dishes;
        }
    }
}
