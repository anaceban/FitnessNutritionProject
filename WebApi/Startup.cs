using System;
using ApplicationFitness;
using ApplicationFitness.Domain.Models;
using ApplicationFitness.Domain.Models.Auth;
using AutoMapper;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using WebApi.Identity;
using WebApi.Mappings;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<FitnessAppContext>(optionBuilder =>
            {
                optionBuilder.UseSqlServer(Configuration.GetConnectionString("DbConnection"));
                
            });

            services.AddIdentity<User, Role>(options =>
            {
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;   
                options.Password.RequireLowercase = true; 
                options.Password.RequireUppercase = true; 
                options.Password.RequireDigit = false;
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<FitnessAppContext>();
            var authOptions = services.ConfigureAuthOptions(Configuration);
            services.AddJwtAuthentication(authOptions);
            services.AddControllers(options =>
            {
                options.Filters.Add(new AuthorizeFilter());
            });
            var mapperConfig = new MapperConfiguration(m =>
            {
                m.AddProfile(new MappingProfile());
            });
            ConfigureSwagger(services);
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    buider =>
                    {
                        buider.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    });
            });
            services.AddControllers();
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );
            services.AddSingleton(mapperConfig.CreateMapper());
            services.AddScoped();

        }
        private void ConfigureSwagger(IServiceCollection services)
        {
            var contact = new OpenApiContact()
            {
                Name = "FirstName LastName",
                Email = "user@example.com",
                Url = new Uri("http://www.example.com")
            };

            var license = new OpenApiLicense()
            {
                Name = "My License",
                Url = new Uri("http://www.example.com")
            };

            var info = new OpenApiInfo()
            {
                Version = "v1",
                Title = "Swagger Demo API",
                Description = "Swagger Demo API Description",
                TermsOfService = new Uri("http://www.example.com"),
                Contact = contact,
                License = license
            };

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", info);
            });
        }


        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseMiddleware<LoggerMiddleWare>();
            app.UseCors();
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            
            
            app.UseAuthorization();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json",
                "Swagger Demo API v1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
           
        }
    }
}
