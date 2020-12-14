using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Infrastracture.Migrations
{
    public partial class AddReviews : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_ScheduleId",
                table: "Reviews",
                column: "ScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Schedules_ScheduleId",
                table: "Reviews",
                column: "ScheduleId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Schedules_ScheduleId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_ScheduleId",
                table: "Reviews");

            migrationBuilder.AddColumn<int>(
                name: "ProgramScheduleId",
                table: "Reviews",
                type: "int",
                nullable: true);

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
    }
}
