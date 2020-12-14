using ApplicationFitness.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Sorting;

namespace WebApi.Services
{
    public interface IProgramScheduleService
    {
        IList<ProgramSchedule> GetProgramSchedules();
        IEnumerable<CreateProgramScheduleDto> GetProgramSchedules(FilterModel model);
        ProgramSchedule GetProgramScheduleById(int id);
        bool RemoveProgramScheduleById(int id);
        ProgramSchedule AddNewProgramSchedule(CreateProgramScheduleDto dto);
        ProgramSchedule UpdateProgramSchedule(int id, UpdateProgramDto dto);
        ProgramSchedule PartialUpdate(int id, UpdateProgramScheduleDto dto);
        ProgramSchedule FindProgramForUser(User user);
        ProgramSchedule GetProgramForUser(User user);
        List<ProgramDishDto> GetDishes(User user);
        ProgramScheduleDto GetProgramByTypeId(int typeId);

    }
}
