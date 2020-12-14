using ApplicationFitness.Domain.Models;
using ApplicationFitness.Domain.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Identity;
using WebApi.Sorting;

namespace WebApi.Services
{
    public interface IUserService
    {

        User GetUserById(int id);

        User AddNewUser(RegisterModelDto dto);


        void RemoveUserById(int id);
        User UpdateUserProfile(UserProfileDto dto, User user);
        List<User> GetUsers();
        IEnumerable<User> GetUsersFiltered(FilterModel filter);

        int GetNumberOfCaloriesPerDay(User user);

    }
}
