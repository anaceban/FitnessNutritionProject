using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Migrations
{
    public partial class ModifyTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramDays_FitnessContents_ContentId",
                table: "ProgramDays");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersPrograms_Users_FullProgramId",
                table: "UsersPrograms");

            migrationBuilder.DropForeignKey(
                name: "FK_UsersPrograms_FullPrograms_UserId",
                table: "UsersPrograms");

            migrationBuilder.DropTable(
                name: "FitnessContents");

            migrationBuilder.DropTable(
                name: "FullPrograms");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersPrograms",
                table: "UsersPrograms");

            migrationBuilder.DropIndex(
                name: "IX_UsersPrograms_FullProgramId",
                table: "UsersPrograms");

            migrationBuilder.DropIndex(
                name: "IX_ProgramDays_ContentId",
                table: "ProgramDays");

            migrationBuilder.DropColumn(
                name: "FullProgramId",
                table: "UsersPrograms");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ContentId",
                table: "ProgramDays");

            migrationBuilder.AddColumn<int>(
                name: "ProgramScheduleId",
                table: "UsersPrograms",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ProgramTypeId",
                table: "Schedules",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "TrainingLink",
                table: "ProgramDays",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersPrograms",
                table: "UsersPrograms",
                columns: new[] { "UserId", "ProgramScheduleId" });

            migrationBuilder.CreateIndex(
                name: "IX_UsersPrograms_ProgramScheduleId",
                table: "UsersPrograms",
                column: "ProgramScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_ProgramTypeId",
                table: "Schedules",
                column: "ProgramTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Schedules_Types_ProgramTypeId",
                table: "Schedules",
                column: "ProgramTypeId",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersPrograms_Users_ProgramScheduleId",
                table: "UsersPrograms",
                column: "ProgramScheduleId",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Schedules_Types_ProgramTypeId",
                table: "Schedules");

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
                name: "IX_UsersPrograms_ProgramScheduleId",
                table: "UsersPrograms");

            migrationBuilder.DropIndex(
                name: "IX_Schedules_ProgramTypeId",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "ProgramScheduleId",
                table: "UsersPrograms");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ProgramTypeId",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "TrainingLink",
                table: "ProgramDays");

            migrationBuilder.AddColumn<int>(
                name: "FullProgramId",
                table: "UsersPrograms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ContentId",
                table: "ProgramDays",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersPrograms",
                table: "UsersPrograms",
                columns: new[] { "UserId", "FullProgramId" });

            migrationBuilder.CreateTable(
                name: "FitnessContents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripton = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FitnessContents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FullPrograms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScheduleId = table.Column<int>(type: "int", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FullPrograms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FullPrograms_Schedules_ScheduleId",
                        column: x => x.ScheduleId,
                        principalTable: "Schedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FullPrograms_Types_TypeId",
                        column: x => x.TypeId,
                        principalTable: "Types",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UsersPrograms_FullProgramId",
                table: "UsersPrograms",
                column: "FullProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramDays_ContentId",
                table: "ProgramDays",
                column: "ContentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FullPrograms_ScheduleId",
                table: "FullPrograms",
                column: "ScheduleId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FullPrograms_TypeId",
                table: "FullPrograms",
                column: "TypeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramDays_FitnessContents_ContentId",
                table: "ProgramDays",
                column: "ContentId",
                principalTable: "FitnessContents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersPrograms_Users_FullProgramId",
                table: "UsersPrograms",
                column: "FullProgramId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UsersPrograms_FullPrograms_UserId",
                table: "UsersPrograms",
                column: "UserId",
                principalTable: "FullPrograms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
