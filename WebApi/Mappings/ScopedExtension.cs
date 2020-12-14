using ApplicationFitness.Infrastracture.Repositories;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Repositories;
using WebApi.Services;
using WebApi.Services.Interfaces;
using WebApi.Services.Interfaces.Admin;

namespace WebApi.Mappings
{
    public static class ScopedExtension
    {
        public static void AddScoped(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IDishRepository, DishRepository>();
            services.AddScoped<IProgramScheduleService, ProgramScheduleService>();
            services.AddScoped<IProgramTypeService, ProgramTypeService>();
            services.AddScoped<IUserReviewService, UserReviewService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IDishService, DishService>();
            services.AddScoped<IUserScheduleService, UserScheduleService>();
            services.AddScoped<IUserRoleService, UserRoleService>();
            services.AddScoped<IProgramDayService, ProgramDayService>();
            services.AddScoped<IDayDishService, DayDishService>();
            services.AddScoped<IAdviceService, AdviceService>();
        }
    }
}
