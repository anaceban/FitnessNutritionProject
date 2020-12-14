using ApplicationFitness.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Sorting;

namespace WebApi.Services.Interfaces
{
    public interface IProgramDayService
    {

        IEnumerable<ProgramDayDto> GetProgramDayByScheduleId(int id);
        IEnumerable<int> GetProgramDayIdsByScheduleId(int id);

        ProgramDay AddNewProgramDay(AddDishDay dto);

        DishDay AddNewDishDay(DayDishDto dishDay);
        IEnumerable<int> GetProgramDaysIds();

        IEnumerable<DayDto> GetProgramDays(FilterModel filter);
        bool RemoveDayById(int id);
    }
}
