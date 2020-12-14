using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Infrastracture.Migrations
{
    public partial class AddScheduleToReview : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProgramScheduleId",
                table: "Reviews",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ScheduleId",
                table: "Reviews",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ProgramScheduleId",
                table: "Reviews",
                column: "ProgramScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Schedules_ProgramScheduleId",
                table: "Reviews",
                column: "ProgramScheduleId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Schedules_ProgramScheduleId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_ProgramScheduleId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "ProgramScheduleId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "ScheduleId",
                table: "Reviews");
        }
    }
}
