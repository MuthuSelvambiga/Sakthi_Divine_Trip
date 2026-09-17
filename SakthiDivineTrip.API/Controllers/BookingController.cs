using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SakthiDivineTrip.API.DTO;
using SakthiDivineTrip.API.Models;
using System.Data;
using System.Text.RegularExpressions;

namespace SakthiDivineTrip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public BookingController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking(BookingRequest booking)
        {
            // -----------------------------
            // 1. Validate customer input
            // -----------------------------

            if (booking.NumberOfSeats <= 0)
            {
                return BadRequest(
                    "Number of seats must be greater than zero.");
            }

            if (string.IsNullOrWhiteSpace(booking.CustomerName))
            {
                return BadRequest(
                    "Customer name is required.");
            }

            if (booking.CustomerName.Length > 100)
            {
                return BadRequest(
                    "Customer name cannot exceed 100 characters.");
            }

            if (string.IsNullOrWhiteSpace(booking.CustomerPhone))
            {
                return BadRequest(
                    "Customer phone is required.");
            }

            if (!Regex.IsMatch(
                booking.CustomerPhone,
                @"^[6-9]\d{9}$"))
            {
                return BadRequest(
                    "Enter a valid 10-digit phone number.");
            }

            // -----------------------------
            // 2. Start transaction
            // -----------------------------

            await using var transaction =
                await _applicationDbContext.Database
                    .BeginTransactionAsync(
                        IsolationLevel.Serializable);

            // -----------------------------
            // 3. Get tour
            // -----------------------------

            var tour = await _applicationDbContext.Tours
                .FirstOrDefaultAsync(
                    x => x.TourId == booking.TourId);

            if (tour == null)
            {
                return NotFound("Tour not found.");
            }

            // -----------------------------
            // 4. Check tour status
            // -----------------------------

            if (!tour.IsActive)
            {
                return BadRequest(
                    "This tour is not active.");
            }

            // -----------------------------
            // 5. Check tour date
            // -----------------------------

            var today =
                DateOnly.FromDateTime(DateTime.UtcNow);

            if (tour.StartDate <= today)
            {
                return BadRequest(
                    "This tour is no longer available for booking.");
            }

            // -----------------------------
            // 6. Check available seats
            // -----------------------------

            if (booking.NumberOfSeats > tour.AvailableSeats)
            {
                return BadRequest(
                    $"Only {tour.AvailableSeats} seats are available.");
            }

            // -----------------------------
            // 7. Calculate Early Bird seats
            // -----------------------------

            int earlyBirdSeats = 0;

            if (tour.IsEarlyBirdActive &&
                tour.EarlyBirdPrice.HasValue &&
                tour.EarlyBirdRemaining.HasValue &&
                tour.EarlyBirdRemaining.Value > 0)
            {
                earlyBirdSeats = Math.Min(
                    booking.NumberOfSeats,
                    tour.EarlyBirdRemaining.Value);
            }

            // -----------------------------
            // 8. Calculate regular seats
            // -----------------------------

            int regularSeats =
                booking.NumberOfSeats - earlyBirdSeats;

            // -----------------------------
            // 9. Calculate total amount
            // -----------------------------

            decimal totalAmount =
                (earlyBirdSeats *
                 tour.EarlyBirdPrice.GetValueOrDefault())
                +
                (regularSeats * tour.Price);

            // -----------------------------
            // 10. Update Early Bird seats
            // -----------------------------

            if (tour.EarlyBirdRemaining.HasValue)
            {
                tour.EarlyBirdRemaining -= earlyBirdSeats;
            }

            if (tour.EarlyBirdRemaining == 0)
            {
                tour.IsEarlyBirdActive = false;
            }

            // -----------------------------
            // 11. Update available seats
            // -----------------------------

            tour.AvailableSeats -=
                booking.NumberOfSeats;

            // -----------------------------
            // 12. Create booking
            // -----------------------------

            var register = new Booking
            {
                TourId = tour.TourId,
                CustomerName = booking.CustomerName,
                CustomerPhone = booking.CustomerPhone,
                NumberOfSeats = booking.NumberOfSeats,

                EarlyBirdSeats = earlyBirdSeats,
                RegularSeats = regularSeats,

                TotalAmount = totalAmount,

                BookingDate = DateTime.UtcNow,
                BookingStatus = "Pending",
                CreatedOn = DateTime.UtcNow
            };

            _applicationDbContext.Bookings.Add(register);

            // -----------------------------
            // 13. Save changes
            // -----------------------------

            await _applicationDbContext.SaveChangesAsync();

            // -----------------------------
            // 14. Commit transaction
            // -----------------------------

            await transaction.CommitAsync();

            // -----------------------------
            // 15. Return booking
            // -----------------------------

            return Ok(register);
        }
    }
}