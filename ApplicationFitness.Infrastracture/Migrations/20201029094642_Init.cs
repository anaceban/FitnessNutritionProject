using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FitnessContents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripton = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FitnessContents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(maxLength: 255, nullable: false),
                    LastName = table.Column<string>(maxLength: 255, nullable: false),
                    Age = table.Column<int>(nullable: false),
                    Weight = table.Column<int>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    Email = table.Column<string>(maxLength: 255, nullable: false),
                    Password = table.Column<string>(maxLength: 255, nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProgramDays",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ScheduleId = table.Column<int>(nullable: false),
                    ContentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgramDays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProgramDays_FitnessContents_ContentId",
                        column: x => x.ContentId,
                        principalTable: "FitnessContents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProgramDays_Schedules_ScheduleId",
                        column: x => x.ScheduleId,
                        principalTable: "Schedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FullPrograms",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FitnessProgram = table.Column<string>(nullable: true),
                    NutritionProgram = table.Column<string>(nullable: true),
                    TypeId = table.Column<int>(nullable: false),
                    ScheduleId = table.Column<int>(nullable: false)
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

            migrationBuilder.CreateTable(
                name: "Dishes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Quantity = table.Column<int>(nullable: true),
                    DayId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dishes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dishes_ProgramDays_DayId",
                        column: x => x.DayId,
                        principalTable: "ProgramDays",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UsersPrograms",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false),
                    FullProgramId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersPrograms", x => new { x.UserId, x.FullProgramId });
                    table.ForeignKey(
                        name: "FK_UsersPrograms_Users_FullProgramId",
                        column: x => x.FullProgramId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersPrograms_FullPrograms_UserId",
                        column: x => x.UserId,
                        principalTable: "FullPrograms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dishes_DayId",
                table: "Dishes",
                column: "DayId");

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

            migrationBuilder.CreateIndex(
                name: "IX_ProgramDays_ContentId",
                table: "ProgramDays",
                column: "ContentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProgramDays_ScheduleId",
                table: "ProgramDays",
                column: "ScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersPrograms_FullProgramId",
                table: "UsersPrograms",
                column: "FullProgramId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dishes");

            migrationBuilder.DropTable(
                name: "UsersPrograms");

            migrationBuilder.DropTable(
                name: "ProgramDays");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "FullPrograms");

            migrationBuilder.DropTable(
                name: "FitnessContents");

            migrationBuilder.DropTable(
                name: "Role");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "Types");
        }
    }
}
