using ApplicationFitness.Domain;
using ApplicationFitness.Domain.Configurations;
using ApplicationFitness.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Configuration;


namespace ApplicationFitness
{
    public class FitnessAppContext : DbContext
    {
        private string _connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog = FitnessApplication; Integrated Security = True;";
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_connectionString);

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserConfig());
            modelBuilder.ApplyConfiguration(new DayConfig());
            modelBuilder.ApplyConfiguration(new RoleConfig());
            modelBuilder.Entity<DishDay>()
                .HasKey(bc => new { bc.DishId, bc.ProgramDayId });
            modelBuilder.Entity<DishDay>()
                .HasOne(bc => bc.Dish)
                .WithMany(c => c.DishDays)
                .HasForeignKey(bc => bc.ProgramDayId);
            modelBuilder.Entity<DishDay>()
                .HasOne(bc => bc.ProgramDay)
                .WithMany(c => c.DishDays)
                .HasForeignKey(bc => bc.DishId);
            modelBuilder.Entity<UserSchedule>()
                .HasKey(bc => new { bc.UserId, bc.ProgramScheduleId });
            modelBuilder.Entity<UserSchedule>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.UserSchedules)
                .HasForeignKey(bc => bc.ProgramScheduleId);
            modelBuilder.Entity<UserSchedule>()
                .HasOne(bc => bc.ProgramSchedule)
                .WithMany(c => c.UserSchedules)
                .HasForeignKey(bc => bc.UserId);

        }
        public DbSet<User> Users { get; set; }
        public DbSet<ProgramSchedule> Schedules { get; set; }
        public DbSet<ProgramDay> ProgramDays { get; set; }
        public DbSet<Dish> Dishes { get; set; }
        public DbSet<ProgramType> Types { get; set; }
        public DbSet<UserSchedule> UsersPrograms { get; set; }
        public DbSet<DishDay> DishDays { get; set; }

    }
}
