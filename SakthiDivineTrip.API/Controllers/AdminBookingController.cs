using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SakthiDivineTrip.API.Models;

namespace SakthiDivineTrip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminBookingController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public AdminBookingController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        // GET: api/AdminBooking
        // GET: api/AdminBooking?status=Pending
        [HttpGet]
        public async Task<IActionResult> GetAllBookings(string? status)
        {
            var query = _applicationDbContext.Bookings
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(x =>
                    x.BookingStatus == status);
            }

            var bookings = await query
                .OrderByDescending(x => x.BookingDate)
                .ToListAsync();

            return Ok(bookings);
        }

        // GET: api/AdminBooking/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookingById(int id)
        {
            var booking = await _applicationDbContext.Bookings
                .FirstOrDefaultAsync(x => x.BookingId == id);

            if (booking == null)
            {
                return NotFound("Booking not found.");
            }

            return Ok(booking);
        }

        // PUT: api/AdminBooking/confirm/5
        [HttpPut("confirm/{id}")]
        public async Task<IActionResult> ConfirmBooking(int id)
        {
            var booking = await _applicationDbContext.Bookings
                .FirstOrDefaultAsync(x => x.BookingId == id);

            if (booking == null)
            {
                return NotFound("Booking not found.");
            }

            // Only Pending bookings can be confirmed
            if (booking.BookingStatus != "Pending")
            {
                return BadRequest(
                    "Only pending bookings can be confirmed.");
            }

            booking.BookingStatus = "Confirmed";
            booking.UpdatedOn = DateTime.UtcNow;

            await _applicationDbContext.SaveChangesAsync();

            return Ok(booking);
        }

        // PUT: api/AdminBooking/cancel/5
        [HttpPut("cancel/{id}")]
        public async Task<IActionResult> CancelBooking(
            int id,
            string cancellationReason)
        {
            // -----------------------------
            // 1. Validate cancellation reason
            // -----------------------------

            if (string.IsNullOrWhiteSpace(cancellationReason))
            {
                return BadRequest(
                    "Cancellation reason is required.");
            }

            if (cancellationReason.Length > 500)
            {
                return BadRequest(
                    "Cancellation reason cannot exceed 500 characters.");
            }

            // -----------------------------
            // 2. Find booking
            // -----------------------------

            var booking = await _applicationDbContext.Bookings
                .FirstOrDefaultAsync(x => x.BookingId == id);

            if (booking == null)
            {
                return NotFound("Booking not found.");
            }

            // -----------------------------
            // 3. Validate booking status
            // -----------------------------

            if (booking.BookingStatus != "Pending" &&
                booking.BookingStatus != "Confirmed")
            {
                return BadRequest(
                    "Only pending or confirmed bookings can be cancelled.");
            }

            // -----------------------------
            // 4. Find tour
            // -----------------------------

            var tour = await _applicationDbContext.Tours
                .FirstOrDefaultAsync(x =>
                    x.TourId == booking.TourId);

            if (tour == null)
            {
                return NotFound("Tour not found.");
            }

            // -----------------------------
            // 5. Calculate refund
            // -----------------------------

            var today =
                DateOnly.FromDateTime(DateTime.UtcNow);

            int daysBeforeTrip =
                tour.StartDate.DayNumber - today.DayNumber;

            decimal refundAmount;

            if (daysBeforeTrip > 7)
            {
                // More than 7 days before trip
                // 100% refund
                refundAmount = booking.TotalAmount;
            }
            else if (daysBeforeTrip >= 1)
            {
                // 1 to 7 days before trip
                // 50% refund
                refundAmount = booking.TotalAmount * 0.50m;
            }
            else
            {
                // Trip date or after
                // No refund
                refundAmount = 0m;
            }

            // -----------------------------
            // 6. Restore available seats
            // -----------------------------

            tour.AvailableSeats +=
                booking.NumberOfSeats;

            // -----------------------------
            // 7. Restore Early Bird seats
            // -----------------------------

            if (booking.EarlyBirdSeats > 0)
            {
                tour.EarlyBirdRemaining =
                    (tour.EarlyBirdRemaining ?? 0)
                    + booking.EarlyBirdSeats;

                // Early Bird becomes available again
                // because those seats returned to the pool.
                if (tour.EarlyBirdPrice.HasValue &&
                    tour.EarlyBirdLimit.HasValue &&
                    tour.EarlyBirdRemaining > 0)
                {
                    tour.IsEarlyBirdActive = true;
                }
            }

            // -----------------------------
            // 8. Update booking
            // -----------------------------

            booking.BookingStatus = "Cancelled";
            booking.CancelledOn = DateTime.UtcNow;
            booking.CancellationReason =
                cancellationReason.Trim();
            booking.RefundAmount = refundAmount;
            booking.UpdatedOn = DateTime.UtcNow;

            // -----------------------------
            // 9. Save changes
            // -----------------------------

            await _applicationDbContext.SaveChangesAsync();

            return Ok(booking);
        }
    }
}