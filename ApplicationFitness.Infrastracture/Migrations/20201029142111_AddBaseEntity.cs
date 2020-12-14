using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Migrations
{
    public partial class AddBaseEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FitnessProgram",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "NutritionProgram",
                table: "Schedules");

            migrationBuilder.AddColumn<string>(
                name: "FitnessProgramDescription",
                table: "Schedules",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FitnessProgramName",
                table: "Schedules",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NutritionProgramDescription",
                table: "Schedules",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NutritionProgramName",
                table: "Schedules",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FitnessProgramDescription",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "FitnessProgramName",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "NutritionProgramDescription",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "NutritionProgramName",
                table: "Schedules");

            migrationBuilder.AddColumn<string>(
                name: "FitnessProgram",
                table: "Schedules",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NutritionProgram",
                table: "Schedules",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
