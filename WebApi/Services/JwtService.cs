using ApplicationFitness.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApi.Identity;

namespace WebApi.Services
{
    public static class JwtService
    {
        public static async Task<UserManagerResponse> GenerateJwt(User user, UserManager<User> userManager, AuthOptions authOptions)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                };
            var userRoles = await userManager.GetRolesAsync(user);
            claims.AddRange(userRoles.Select(s => new Claim(ClaimTypes.Role, s)));
            var isAdmin = userRoles.Contains("admin");
            var signinCredentials = new SigningCredentials(authOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256);
            var jwtSecurityToken = new JwtSecurityToken(
                 issuer: authOptions.Issuer,
                 audience: authOptions.Audience,
                 claims: claims,
                 expires: DateTime.Now.AddDays(30),
                 signingCredentials: signinCredentials
            );

            var tokenHandler = new JwtSecurityTokenHandler();

            var encodedToken = tokenHandler.WriteToken(jwtSecurityToken);
            return new UserManagerResponse
            {
                Message = "Successfully",
                IsSucces = true,
                ExpireDate = jwtSecurityToken.ValidTo,
                Token = encodedToken,
                IsAdmin = isAdmin
            };
        }
    }
}
