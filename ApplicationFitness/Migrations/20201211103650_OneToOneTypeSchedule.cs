using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Infrastracture.Migrations
{
    public partial class OneToOneTypeSchedule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Schedules_ProgramTypeId",
                table: "Schedules");

            migrationBuilder.AddColumn<int>(
                name: "ProgramScheduleId",
                table: "Types",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_ProgramTypeId",
                table: "Schedules",
                column: "ProgramTypeId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Schedules_ProgramTypeId",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "ProgramScheduleId",
                table: "Types");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_ProgramTypeId",
                table: "Schedules",
                column: "ProgramTypeId");
        }
    }
}
