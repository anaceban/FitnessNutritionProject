using ApplicationFitness;
using ApplicationFitness.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Repositories;

namespace WebApi.Services
{
    public class UserScheduleService : IUserScheduleService
    {
        private readonly FitnessAppContext _context;
        public UserScheduleService(FitnessAppContext context)
        {
            _context = context;
        }
        public void AddNewUserProgramSchedule(User user, ProgramSchedule schedule)
        {
            var userSchedule = _context.UsersPrograms.SingleOrDefault(u => u.UserId == user.Id && u.ProgramScheduleId == schedule.Id);
            if (userSchedule == null)
            {
                var result = new UserSchedule
                {
                    User = user,
                    ProgramSchedule = schedule,
                    UserId = user.Id,
                    ProgramScheduleId = schedule.Id
                };
                _context.UsersPrograms.Add(result);
                _context.SaveChanges();
            }
            else
            {
                _context.UsersPrograms.Remove(userSchedule);
                _context.UsersPrograms.Add( new UserSchedule
                {
                    User = user,
                    ProgramSchedule = schedule,
                    UserId = user.Id,
                    ProgramScheduleId = schedule.Id
                }
                );
                _context.SaveChanges();
            }
        }


        public List<UserSchedule> GetAllUsersWithProgram()
        {
            return _context.UsersPrograms.ToList();
        }

        public UserSchedule GetUserScheduleById(int id)
        {
            var userProgram = _context.UsersPrograms.Find(id);
            if (userProgram == null)
            {
                return null;
            }
            else return userProgram;
        }
    }
}
