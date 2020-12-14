using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Infrastracture.Migrations
{
    public partial class RemoveAnyFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LevelOfFitnessExperience",
                schema: "Auth",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PrimaryGoal",
                schema: "Auth",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LevelOfFitnessExperience",
                schema: "Auth",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrimaryGoal",
                schema: "Auth",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
