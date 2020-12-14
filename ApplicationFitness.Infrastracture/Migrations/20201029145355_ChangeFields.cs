using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Migrations
{
    public partial class ChangeFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DishDays_Dishes_DayId",
                table: "DishDays");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DishDays",
                table: "DishDays");

            migrationBuilder.DropIndex(
                name: "IX_DishDays_DayId",
                table: "DishDays");

            migrationBuilder.DropColumn(
                name: "DayId",
                table: "DishDays");

            migrationBuilder.AddColumn<int>(
                name: "ProgramDayId",
                table: "DishDays",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DishDays",
                table: "DishDays",
                columns: new[] { "DishId", "ProgramDayId" });

            migrationBuilder.CreateIndex(
                name: "IX_DishDays_ProgramDayId",
                table: "DishDays",
                column: "ProgramDayId");

            migrationBuilder.AddForeignKey(
                name: "FK_DishDays_Dishes_ProgramDayId",
                table: "DishDays",
                column: "ProgramDayId",
                principalTable: "Dishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DishDays_Dishes_ProgramDayId",
                table: "DishDays");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DishDays",
                table: "DishDays");

            migrationBuilder.DropIndex(
                name: "IX_DishDays_ProgramDayId",
                table: "DishDays");

            migrationBuilder.DropColumn(
                name: "ProgramDayId",
                table: "DishDays");

            migrationBuilder.AddColumn<int>(
                name: "DayId",
                table: "DishDays",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DishDays",
                table: "DishDays",
                columns: new[] { "DishId", "DayId" });

            migrationBuilder.CreateIndex(
                name: "IX_DishDays_DayId",
                table: "DishDays",
                column: "DayId");

            migrationBuilder.AddForeignKey(
                name: "FK_DishDays_Dishes_DayId",
                table: "DishDays",
                column: "DayId",
                principalTable: "Dishes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
