using ApplicationFitness;
using ApplicationFitness.Domain.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Repositories;
using WebApi.Services.Interfaces;
using WebApi.Sorting;

namespace WebApi.Services
{
    public class ProgramDayService : IProgramDayService
    {
        private readonly FitnessAppContext _context;
        private readonly IMapper _mapper;
        private readonly IRepository<ProgramDay> _repository;
        private readonly IDishService _dishService;
        private readonly IProgramTypeService _programTypeService;
        public ProgramDayService(FitnessAppContext context, IMapper mapper, IRepository<ProgramDay> repository, IDishService dishService, IProgramTypeService programTypeService)
        {
            _context = context;
            _mapper = mapper;
            _repository = repository;
            _dishService = dishService;
            _programTypeService = programTypeService;
        }

        public DishDay AddNewDishDay(DayDishDto dishDay)
        {
            var dayDish = new DishDay { DishId = dishDay.DishId, ProgramDayId = dishDay.ProgramDayId };
            _context.DishDays.Add(dayDish);
            _context.SaveChanges();
            return dayDish;
        }

        public ProgramDay AddNewProgramDay(AddDishDay dto)
        {
            var type = _programTypeService.GetProgramByName(dto.TypeName);
            var day = new ProgramDay
            {
                Name = dto.DayName,
                TrainingLink = dto.TrainingLink,
                ScheduleId = type.ProgramScheduleId
            };
            _repository.Add(day);

            _repository.Add(day);
            _context.SaveChanges();
            foreach (var d in dto.dishes)
            {
                _context.DishDays.Add(new DishDay
                {
                    DishId = d,
                    ProgramDayId = day.Id
                });
            }
            _context.SaveChanges();
            return day;
        }


        public IEnumerable<ProgramDayDto> GetProgramDayByScheduleId(int scheduleId)
        {
            var days = _context.ProgramDays.Where(s => s.ScheduleId == scheduleId);
            if (days == null)
            {
                return null;
            }
            var result = _mapper.Map<List<ProgramDayDto>>(days);
            return result;
        }

        public IEnumerable<int> GetProgramDayIdsByScheduleId(int id)
        {
            var daysIds = _context.ProgramDays.Where(s => s.ScheduleId == id).Select(d => d.Id);
            if (daysIds == null)
            {
                return null;
            }
            return daysIds;
        }

        public IEnumerable<ProgramDay> GetProgramDays()
        {
            return _repository.GetAll();
        }

        public IEnumerable<DayDto> GetProgramDays(FilterModel filter)
        {
            var result = new List<DayDto>();
            var properyInfo = typeof(ProgramDay);
            var propery = properyInfo.GetProperty(filter.SortedField ?? "TrainingLink");
            if (string.IsNullOrEmpty(filter.Term))
            {
                var allDays = GetProgramDays().AsEnumerable();
                allDays = filter.SortAsc ? allDays.OrderBy(p => propery.GetValue(p)) : allDays.OrderByDescending(p => propery.GetValue(p));
                foreach(var d in allDays)
                {
                    var dishes = _dishService.GetDishesForDay(d.Id);
                    result.Add(new DayDto
                    {
                        Id = d.Id,
                        Name = d.Name,
                        TrainingLink = d.TrainingLink,
                        ScheduleId = d.ScheduleId,
                        TypeName = _programTypeService.GetProgramTypeScheduleId(d.ScheduleId).Name,
                        Dishes = _mapper.Map<List<DishDto>>(dishes)
                    });
                }
                return result;
            }
            var days = _context.ProgramDays.Where(u => u.Name.StartsWith(filter.Term) || u.TrainingLink.StartsWith(filter.Term)).AsEnumerable();
            days = filter.SortAsc ? days.OrderBy(p => propery.GetValue(p)) : days.OrderByDescending(p => propery.GetValue(p));
            foreach (var d in days)
            {
                var dishes = _dishService.GetDishesForDay(d.Id);
                result.Add(new DayDto
                {
                    Name = d.Name,
                    TrainingLink = d.TrainingLink,
                    ScheduleId = d.ScheduleId,
                    TypeName = _programTypeService.GetProgramTypeScheduleId(d.ScheduleId).Name,
                    Dishes = _mapper.Map<List<DishDto>>(dishes)

                });
            }
            return result;
        }

        public IEnumerable<int> GetProgramDaysIds()
        {
            var daysIds = _context.ProgramDays.Select(d => d.Id);
            return daysIds;
        }

        public bool RemoveDayById(int id)
        {
            var day = _repository.Find(id);
            if(day != null)
            {
                _repository.Delete(day);
                _repository.Save();
                return true;
            }
            return false;
        }
    }
}
