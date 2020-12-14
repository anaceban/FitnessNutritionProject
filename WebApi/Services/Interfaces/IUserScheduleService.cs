using ApplicationFitness.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;

namespace WebApi.Services
{
    public interface IUserScheduleService
    {
        List<UserSchedule> GetAllUsersWithProgram();

        void AddNewUserProgramSchedule(User user, ProgramSchedule schedule);
        UserSchedule GetUserScheduleById(int id);


    }
}
