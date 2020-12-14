using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Infrastracture.Migrations
{
    public partial class UpdateType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Types_ProgramTypeId",
                table: "Schedules");

            migrationBuilder.AlterColumn<int>(
                name: "ProgramTypeId",
                table: "Schedules",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Types_ProgramTypeId",
                table: "Schedules",
                column: "ProgramTypeId",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Types_ProgramTypeId",
                table: "Schedules");

            migrationBuilder.AlterColumn<int>(
                name: "ProgramTypeId",
                table: "Schedules",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Types_ProgramTypeId",
                table: "Schedules",
                column: "ProgramTypeId",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
