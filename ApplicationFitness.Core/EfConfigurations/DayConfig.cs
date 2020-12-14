using ApplicationFitness.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace ApplicationFitness.Domain.Configurations
{
    public class DayConfig :IEntityTypeConfiguration<ProgramDay>
    {
        public void Configure(EntityTypeBuilder<ProgramDay> builder)
        {

            builder.HasOne(x => x.Schedule).WithMany(x => x.ProgramWeek).HasForeignKey(x => x.ScheduleId);
        }

    }
}
