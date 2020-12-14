using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Infrastracture.Migrations
{
    public partial class RemoveAdminField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAdmin",
                schema: "Auth",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsAdmin",
                schema: "Auth",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
