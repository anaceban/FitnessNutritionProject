using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Infrastracture.Migrations
{
    public partial class UpdateManyToManyUserSchedules : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersPrograms_Users_ProgramScheduleId",
                table: "UsersPrograms");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersPrograms_Schedules_UserId",
                table: "UsersPrograms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersPrograms",
                table: "UsersPrograms");

            migrationBuilder.DropIndex(
                name: "IX_UsersPrograms_UserId",
                table: "UsersPrograms");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UsersPrograms");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersPrograms",
                table: "UsersPrograms",
                columns: new[] { "UserId", "ProgramScheduleId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UsersPrograms_Schedules_ProgramScheduleId",
                table: "UsersPrograms",
                column: "ProgramScheduleId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersPrograms_Users_UserId",
                table: "UsersPrograms",
                column: "UserId",
                principalSchema: "Auth",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsersPrograms_Schedules_ProgramScheduleId",
                table: "UsersPrograms");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersPrograms_Users_UserId",
                table: "UsersPrograms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersPrograms",
                table: "UsersPrograms");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UsersPrograms",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersPrograms",
                table: "UsersPrograms",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UsersPrograms_UserId",
                table: "UsersPrograms",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UsersPrograms_Users_ProgramScheduleId",
                table: "UsersPrograms",
                column: "ProgramScheduleId",
                principalSchema: "Auth",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersPrograms_Schedules_UserId",
                table: "UsersPrograms",
                column: "UserId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
