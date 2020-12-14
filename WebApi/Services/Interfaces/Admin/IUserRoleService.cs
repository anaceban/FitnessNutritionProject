using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;

namespace WebApi.Services.Interfaces.Admin
{
    public interface IUserRoleService
    {
        void UpdateUserRole(UserDto user);
        IEnumerable<int> GetAdminIds();
    }
}
