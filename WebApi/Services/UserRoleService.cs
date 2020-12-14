using ApplicationFitness;
using ApplicationFitness.Domain.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Services.Interfaces.Admin;

namespace WebApi.Services
{
    public class UserRoleService : IUserRoleService
    {
        private readonly FitnessAppContext _context;
        private const int AdminRole = 2;
        private const int UserRole = 1;
        public UserRoleService(FitnessAppContext context)
        {
            _context = context;
        }
        public IEnumerable<int> GetAdminIds()
        {
            var adminIds = _context.UserRoles.Where(r => r.RoleId == AdminRole).Select(r => r.UserId);
            return adminIds;
        }

        public void UpdateUserRole(UserDto user)
        {
            var userRole = _context.UserRoles.SingleOrDefault(u => u.UserId == user.Id);
            if (userRole == null)
                return;
            _context.UserRoles.Remove(userRole);
            _context.UserRoles.Add(new UserRole { UserId = user.Id, RoleId = user.IsAdmin ? AdminRole : UserRole });
            _context.SaveChanges();
        }
    }
}
