using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SakthiDivineTrip.API.DTO;

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
        [HttpGet]
        public async Task<IActionResult> GetAllBookings(string? status)
        {
            var query = _applicationDbContext.Bookings
                .Include(x => x.Tour)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(status))
            {
                query = query.Where(x =>
                    x.BookingStatus == status);
            }

            var bookings = await query
                .OrderByDescending(x => x.BookingDate)
                .Select(x => new
                {
                    x.BookingId,
                    x.CustomerName,
                    x.CustomerPhone,
                    x.TourId,
                    TourName = x.Tour.TourName,
                    x.NumberOfSeats,
                    x.TotalAmount,
                    x.BookingStatus,
                    x.BookingDate,
                    x.CancelledOn,
                    x.CancellationReason,
                    x.RefundAmount,
                    x.CreatedOn,
                    x.UpdatedOn,
                    x.EarlyBirdSeats,
                    x.RegularSeats
                })
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
        // POST: api/AdminBooking
        [HttpPost]
        public async Task<IActionResult> CreateBooking(
            AdminCreateBookingDto request)
        {
            // 1. Validate customer details
            if (string.IsNullOrWhiteSpace(request.CustomerName))
                return BadRequest("Customer name is required.");

            if (string.IsNullOrWhiteSpace(request.CustomerPhone))
                return BadRequest("Customer phone is required.");

            if (request.NumberOfSeats <= 0)
                return BadRequest("Number of seats must be greater than 0.");

            // 2. Find tour
            var tour = await _applicationDbContext.Tours
                .FirstOrDefaultAsync(x => x.TourId == request.TourId);

            if (tour == null)
                return NotFound("Tour not found.");

            // 3. Check tour availability
            if (!tour.IsActive)
                return BadRequest("This tour is not active.");

            if (tour.StartDate < DateOnly.FromDateTime(DateTime.UtcNow))
                return BadRequest("This tour has already started.");

            if (request.NumberOfSeats > tour.AvailableSeats)
                return BadRequest(
                    $"Only {tour.AvailableSeats} seats are available.");

            // 4. Calculate Early Bird and Regular seats
            int earlyBirdSeats = 0;
            int regularSeats = request.NumberOfSeats;

            if (tour.IsEarlyBirdActive &&
                tour.EarlyBirdPrice.HasValue &&
                tour.EarlyBirdRemaining.HasValue &&
                tour.EarlyBirdRemaining.Value > 0)
            {
                earlyBirdSeats = Math.Min(
                    request.NumberOfSeats,
                    tour.EarlyBirdRemaining.Value);

                regularSeats =
                    request.NumberOfSeats - earlyBirdSeats;
            }

            // 5. Calculate total amount
            decimal totalAmount =
                (earlyBirdSeats * (tour.EarlyBirdPrice ?? tour.Price)) +
                (regularSeats * tour.Price);

            // 6. Price per person
            decimal pricePerPerson;

            if (request.NumberOfSeats > 0)
            {
                pricePerPerson =
                    totalAmount / request.NumberOfSeats;
            }
            else
            {
                pricePerPerson = tour.Price;
            }

            // 7. Reduce available seats
            tour.AvailableSeats -= request.NumberOfSeats;

            // 8. Reduce Early Bird seats
            if (earlyBirdSeats > 0)
            {
                tour.EarlyBirdRemaining =
                    (tour.EarlyBirdRemaining ?? 0) - earlyBirdSeats;

                if (tour.EarlyBirdRemaining <= 0)
                {
                    tour.EarlyBirdRemaining = 0;
                    tour.IsEarlyBirdActive = false;
                }
            }

            // 9. Create booking
            var booking = new Booking
            {
                TourId = request.TourId,
                CustomerName = request.CustomerName.Trim(),
                CustomerPhone = request.CustomerPhone.Trim(),
                NumberOfSeats = request.NumberOfSeats,

                PricePerPerson = pricePerPerson,
                TotalAmount = totalAmount,

                EarlyBirdSeats = earlyBirdSeats,
                RegularSeats = regularSeats,

                BookingDate = DateTime.UtcNow,

                BookingStatus = "Pending",

                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow
            };

            _applicationDbContext.Bookings.Add(booking);

            await _applicationDbContext.SaveChangesAsync();

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