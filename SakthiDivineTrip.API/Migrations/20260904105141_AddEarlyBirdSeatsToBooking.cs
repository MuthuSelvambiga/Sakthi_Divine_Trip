using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SakthiDivineTrip.API.Migrations
{
    /// <inheritdoc />
    public partial class AddEarlyBirdSeatsToBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EarlyBirdSeats",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RegularSeats",
                table: "Bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EarlyBirdSeats",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "RegularSeats",
                table: "Bookings");
        }
    }
}
