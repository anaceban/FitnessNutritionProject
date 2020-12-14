using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Migrations
{
    public partial class AddNewTableDishDays : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dishes_ProgramDays_DayId",
                table: "Dishes");

            migrationBuilder.DropIndex(
                name: "IX_Dishes_DayId",
                table: "Dishes");

            migrationBuilder.DropColumn(
                name: "FitnessProgram",
                table: "FullPrograms");

            migrationBuilder.DropColumn(
                name: "NutritionProgram",
                table: "FullPrograms");

            migrationBuilder.DropColumn(
                name: "DayId",
                table: "Dishes");

            migrationBuilder.AddColumn<string>(
                name: "FitnessProgram",
                table: "Schedules",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NutritionProgram",
                table: "Schedules",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DishDays",
                columns: table => new
                {
                    DishId = table.Column<int>(nullable: false),
                    DayId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DishDays", x => new { x.DishId, x.DayId });
                    table.ForeignKey(
                        name: "FK_DishDays_Dishes_DayId",
                        column: x => x.DayId,
                        principalTable: "Dishes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DishDays_ProgramDays_DishId",
                        column: x => x.DishId,
                        principalTable: "ProgramDays",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DishDays_DayId",
                table: "DishDays",
                column: "DayId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DishDays");

            migrationBuilder.DropColumn(
                name: "FitnessProgram",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "NutritionProgram",
                table: "Schedules");

            migrationBuilder.AddColumn<string>(
                name: "FitnessProgram",
                table: "FullPrograms",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NutritionProgram",
                table: "FullPrograms",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DayId",
                table: "Dishes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dishes_DayId",
                table: "Dishes",
                column: "DayId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dishes_ProgramDays_DayId",
                table: "Dishes",
                column: "DayId",
                principalTable: "ProgramDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
