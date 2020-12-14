using ApplicationFitness.Domain;
using ApplicationFitness.Domain.Configurations;
using ApplicationFitness.Domain.Models;
using ApplicationFitness.Domain.Models.Auth;
using ApplicationFitness.Infrastacture;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.Reflection;
using WebApi;

namespace ApplicationFitness
{
    public class FitnessAppContext : IdentityDbContext<User, Role, int, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
        public FitnessAppContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new DayConfig());
            modelBuilder.Entity<DishDay>()
                .HasKey(bc => new { bc.DishId, bc.ProgramDayId });
            modelBuilder.Entity<DishDay>()
                .HasOne(bc => bc.Dish)
                .WithMany(c => c.DishDays)
                .HasForeignKey(bc => bc.DishId);
            modelBuilder.Entity<DishDay>()
                .HasOne(bc => bc.ProgramDay)
                .WithMany(c => c.DishDays)
                .HasForeignKey(bc => bc.ProgramDayId);
            modelBuilder.Entity<UserSchedule>()
                .HasKey(up => new { up.UserId, up.ProgramScheduleId });
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(FitnessAppContext)));
            ApplyIdentityMapConfiguration(modelBuilder);
            modelBuilder.Entity<Review>()
                .HasOne(r => r.ProgramSchedule)
                .WithMany(p => p.Reviews)
                .HasForeignKey(s => s.ScheduleId);
            modelBuilder.Entity<ProgramType>()
                .HasOne(r => r.ProgramSchedule)
                .WithOne(p => p.ProgramType)
                .HasForeignKey<ProgramType>(s => s.ProgramScheduleId);
            modelBuilder.Entity<ProgramSchedule>()
                .HasOne(r => r.ProgramType)
                .WithOne(p => p.ProgramSchedule)
                .HasForeignKey<ProgramSchedule>(s => s.ProgramTypeId);

        }

        public DbSet<ProgramSchedule> Schedules { get; set; }
        public DbSet<ProgramDay> ProgramDays { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<ProgramType> Types { get; set; }
        public DbSet<UserSchedule> UsersPrograms { get; set; }
        public DbSet<DishDay> DishDays { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<ProgramAdvice> Advices { get; set; }

        private void ApplyIdentityMapConfiguration(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users", SchemaConsts.Auth);
            modelBuilder.Entity<UserClaim>().ToTable("UserClaims", SchemaConsts.Auth);
            modelBuilder.Entity<UserLogin>().ToTable("UserLogins", SchemaConsts.Auth);
            modelBuilder.Entity<UserToken>().ToTable("UserRoles", SchemaConsts.Auth);
            modelBuilder.Entity<Role>().ToTable("Roles", SchemaConsts.Auth);
            modelBuilder.Entity<RoleClaim>().ToTable("RoleClaims", SchemaConsts.Auth);
            modelBuilder.Entity<UserRole>().ToTable("UserRole", SchemaConsts.Auth);
        }
    }

}
