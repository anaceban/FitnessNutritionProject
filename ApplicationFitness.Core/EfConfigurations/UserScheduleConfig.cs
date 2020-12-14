using ApplicationFitness.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationFitness.Domain.Configurations
{
    public class UserScheduleConfig : IEntityTypeConfiguration<UserSchedule>
    {
        public void Configure(EntityTypeBuilder<UserSchedule> builder)
        {
            builder.HasOne(up => up.ProgramSchedule)
                .WithMany(u => u.UserSchedules)
                .HasForeignKey(u => u.ProgramScheduleId);
            builder.HasOne(up => up.User)
                .WithMany(p => p.UserSchedules)
                .HasForeignKey(p => p.UserId);
        }
    }
}
