using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Infrastracture.Migrations
{
    public partial class ChangeDishDay : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DishDays_ProgramDays_DishId",
                table: "DishDays");

            migrationBuilder.DropForeignKey(
                name: "FK_DishDays_Dishes_ProgramDayId",
                table: "DishDays");

            migrationBuilder.AddForeignKey(
                name: "FK_DishDays_Dishes_DishId",
                table: "DishDays",
                column: "DishId",
                principalTable: "Dishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DishDays_ProgramDays_ProgramDayId",
                table: "DishDays",
                column: "ProgramDayId",
                principalTable: "ProgramDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DishDays_Dishes_DishId",
                table: "DishDays");

            migrationBuilder.DropForeignKey(
                name: "FK_DishDays_ProgramDays_ProgramDayId",
                table: "DishDays");

            migrationBuilder.AddForeignKey(
                name: "FK_DishDays_ProgramDays_DishId",
                table: "DishDays",
                column: "DishId",
                principalTable: "ProgramDays",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DishDays_Dishes_ProgramDayId",
                table: "DishDays",
                column: "ProgramDayId",
                principalTable: "Dishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
