using ApplicationFitness;
using ApplicationFitness.Domain.Models;
using AutoMapper;
using Microsoft.VisualBasic.CompilerServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Repositories;
using WebApi.Sorting;

namespace WebApi.Services
{
    public class ProgramScheduleService : IProgramScheduleService
    {
        private readonly IRepository<ProgramSchedule> _programScheduleRepository;
        private readonly IUserScheduleService _userScheduleService;
        private readonly IDishService _dishService;
        private readonly IMapper _mapper;
        private readonly IProgramTypeService _programTypeService;
        private readonly FitnessAppContext _context;
        public ProgramScheduleService(IRepository<ProgramSchedule> repository, IUserScheduleService userScheduleService
            , IDishService dishService, IMapper mapper, FitnessAppContext context, IProgramTypeService typeService)
        {
            _programScheduleRepository = repository;
            _userScheduleService = userScheduleService;
            _dishService = dishService;
            _mapper = mapper;
            _context = context;
            _programTypeService = typeService;
        }

        public ProgramSchedule AddNewProgramSchedule(CreateProgramScheduleDto dto)
        {
            var type = new CreateProgramTypeDto
            {
                Name = dto.TypeName,
            };
            _programTypeService.AddNewProgramType(type);
            var program = new ProgramSchedule
            {
                ProgramTypeId = _programTypeService.GetProgramByName(type.Name).Id,
                FitnessProgramName = dto.FitnessProgramName,
                NutritionProgramName = dto.NutritionProgramName,
                FitnessProgramDescription = dto.FitnessProgramDescription,
                NutritionProgramDescription = dto.NutritionProgramDescription

            };
            _programScheduleRepository.Add(program);
            _programScheduleRepository.Save();
            _programTypeService.UpdateProgramTypeDetails(program.ProgramTypeId, new UpdateProgramTypeDto 
            { 
                ScheduleId = program.Id
            });
            return program;
        }

        public ProgramSchedule GetProgramScheduleById(int id)
        {
            return _programScheduleRepository.Find(id);
        }

        public IList<ProgramSchedule> GetProgramSchedules()
        {
            return _programScheduleRepository.GetAll().ToList();
        }

        public bool RemoveProgramScheduleById(int id)
        {
            var program = _programScheduleRepository.Find(id);
            
            if (program != null)
            {
                _programTypeService.RemoveProgramTypeById(program.ProgramTypeId);
                return true;
            }
            
            else return false;
        }

        public ProgramSchedule UpdateProgramSchedule(int id, UpdateProgramDto dto)
        {
            ProgramSchedule programSchedule = _programScheduleRepository.Find(id);
            if(programSchedule == null)
            {
                return null;
            }
            else if (dto.FitnessProgramName != programSchedule.FitnessProgramName)
                return null;

            programSchedule.FitnessProgramName = dto.FitnessProgramName;
            programSchedule.NutritionProgramName = dto.NutritionProgramName;
            programSchedule.FitnessProgramDescription = dto.FitnessProgramDescription;
            programSchedule.NutritionProgramDescription = dto.NutritionProgramDescription;
            _programScheduleRepository.Save();
            return programSchedule;
        }
        public ProgramSchedule PartialUpdate(int id, UpdateProgramScheduleDto dto)
        {
            ProgramSchedule programSchedule = _programScheduleRepository.Find(id);
            if (programSchedule == null)
                return null;

            if (!string.IsNullOrWhiteSpace(dto.FitnessProgramName))
                programSchedule.FitnessProgramName = dto.FitnessProgramName;
            
            
            programSchedule.ProgramTypeId = dto.ProgramTypeId;

            if (!string.IsNullOrWhiteSpace(dto.NutritionProgramName))
                programSchedule.NutritionProgramName = dto.NutritionProgramName;

            _programScheduleRepository.Save();
            return programSchedule;
        }

        public ProgramSchedule FindProgramForUser(User user)
        {
            var type = _programTypeService.GetProgramTypes().SingleOrDefault(t => t.Name == user.ProgramTypeName);
            var schedule = _programScheduleRepository.Find(p => p.ProgramTypeId == type.Id);
            if(schedule != null)
            {
                _userScheduleService.AddNewUserProgramSchedule(user, schedule);
                return schedule;
            }
            else return null;
        }

        public ProgramSchedule GetProgramForUser(User user)
        {
            var type = _programTypeService.GetProgramTypes().SingleOrDefault(t => t.Name == user.ProgramTypeName);
            if(type== null)
            {
                return null;
            }
            var schedule = _programScheduleRepository.Find(p => p.ProgramTypeId == type.Id);
            if (schedule != null)
                return schedule;
            else return null;
        }
        public IEnumerable<CreateProgramScheduleDto> GetProgramSchedules(FilterModel filter)
        {
            var propertyInfo = typeof(ProgramSchedule);
            var result = new List<CreateProgramScheduleDto>();
            var propery = propertyInfo.GetProperty(filter.SortedField ?? "FitnessProgramName");
            if (string.IsNullOrEmpty(filter.Term))
            {
                var schedules = GetProgramSchedules() as IEnumerable<ProgramSchedule>;
                schedules = filter.SortAsc ? schedules.OrderBy(p => propery.GetValue(p)) : schedules.OrderByDescending(p => propery.GetValue(p));
                foreach (var p in schedules)
                {
                    result.Add(new CreateProgramScheduleDto
                    {
                        Id = p.Id,
                        FitnessProgramName = p.FitnessProgramName,
                        NutritionProgramName = p.NutritionProgramName,
                        FitnessProgramDescription = p.FitnessProgramDescription,
                        NutritionProgramDescription = p.NutritionProgramDescription,
                        TypeName = _programTypeService.GetProgramTypeById(p.ProgramTypeId).Name
                    });
                }
                
                return result;
            }
            var programs = _programScheduleRepository.GetAll().AsEnumerable().Where(u => u.FitnessProgramName.StartsWith(filter.Term) || u.NutritionProgramName.StartsWith(filter.Term));
            programs  = filter.SortAsc ? programs.OrderBy(p => propery.GetValue(p)) : programs.OrderByDescending(p => propery.GetValue(p));
            foreach (var p in programs)
            {
                result.Add(new CreateProgramScheduleDto
                {
                    Id = p.Id,
                    FitnessProgramName = p.FitnessProgramName,
                    NutritionProgramName = p.NutritionProgramName,
                    FitnessProgramDescription = p.FitnessProgramDescription,
                    NutritionProgramDescription = p.NutritionProgramDescription,
                    TypeName = _programTypeService.GetProgramTypeById(p.ProgramTypeId).Name
                });
            }
            return result;
        }

        public List<ProgramDishDto> GetDishes(User user)
        {
            
            var schedule = GetProgramForUser(user);
            if(schedule == null)
            {
                return null;
            }
            var dayIds = _context.ProgramDays.Where(s => s.ScheduleId == schedule.Id).ToList();
            var dayDishes = new List<DishDay>();
            var result = new List<ProgramDishDto>();
            foreach(var d in dayIds)
            {
                var item = new ProgramDishDto 
                { 
                    ProgramDayNumber = d.Id, 
                    Dishes = _dishService.GetDishesForDay(d.Id).Select(r => _mapper.Map<DishDto>(r)), 
                    TrainingLink = d.TrainingLink 
                };
                result.Add(item);
            }
            return result.ToList();
        }

        public ProgramScheduleDto GetProgramByTypeId(int typeId)
        {
            var schedule = _programScheduleRepository.GetAll().SingleOrDefault(t => t.ProgramTypeId == typeId);
            var result = _mapper.Map<ProgramScheduleDto>(schedule);
            return result;
        }
    }
}
