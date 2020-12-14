using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationFitness.Infrastracture.Migrations
{
    public partial class AddRatingToReview : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RatingMark",
                table: "Reviews",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RatingMark",
                table: "Reviews");
        }
    }
}
