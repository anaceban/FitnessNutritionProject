using ApplicationFitness.Domain.Models;
using ApplicationFitness.Domain.Models.Auth;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebApi.Identity
{
    public static class IdentityDataInitializer
    {
        public static async Task SeedData(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            await SeedUsers(userManager, roleManager);
            SeedRoles(roleManager);
        }
        public static async Task SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (userManager.FindByEmailAsync("ana12333@gmail.com").Result == null)
            {
                var user = new User
                {
                    Email = "ana12333@gmail.com",
                    UserName = "ana12333@gmail.com",
                    FirstName = "User",
                    LastName = "Default"
                };
                var result = userManager.CreateAsync(user, "First1234").Result;
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "user");
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Email, user.Email)
                    };
                    var userRoles = await userManager.GetRolesAsync(user);
                    claims.AddRange(userRoles.Select(s => new Claim(ClaimTypes.Role, s)));
                    await userManager.AddToRoleAsync(user, "user");

                }
            }
            if (userManager.FindByEmailAsync("ceb@gmail.com").Result == null)
            {
                var userAdmin = new User
                {
                    Email = "ceb@gmail.com",
                    UserName = "ceb@gmail.com",
                    FirstName = "Ana",
                    LastName = "Ceban"
                };
                var resultAdmin = userManager.CreateAsync(userAdmin, "Aaa212257").Result;
                if (resultAdmin.Succeeded)
                {
                    await userManager.AddToRoleAsync(userAdmin, "admin");
                    var claimsAdmin = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, userAdmin.Id.ToString()),
                        new Claim(ClaimTypes.Email, userAdmin.Email)
                    };
                    var userRoles = await userManager.GetRolesAsync(userAdmin);
                    claimsAdmin.AddRange(userRoles.Select(s => new Claim(ClaimTypes.Role, s)));
                    await roleManager.CreateAsync(new Role("admin"));
                }
            }
        }
        public static void SeedRoles(RoleManager<Role> roleManager)
        {
            if (!roleManager.RoleExistsAsync("user").Result)
            {
                Role role = new Role("user");
                var result = roleManager.CreateAsync(role).Result;
            }
            if (!roleManager.RoleExistsAsync("admin").Result)
            {
                Role role = new Role("admin");
                var result = roleManager.
                    CreateAsync(role).Result;
            }

        }

    }
}
