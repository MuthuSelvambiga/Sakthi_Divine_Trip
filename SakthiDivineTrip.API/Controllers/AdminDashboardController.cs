using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using SakthiDivineTrip.API.Models;

namespace SakthiDivineTrip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminDashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public AdminDashboardController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboardSummary()
        {
            var totalTours = await _applicationDbContext.Tours
                .CountAsync(x => x.IsActive);

            var totalBookings = await _applicationDbContext.Bookings
                .CountAsync();

            var pendingBookings = await _applicationDbContext.Bookings
                .CountAsync(x => x.BookingStatus == "Pending");

            var totalExperiences = await _applicationDbContext.CustomerExperiences
                .CountAsync();

            return Ok(new
            {
                totalTours,
                totalBookings,
                pendingBookings,
                totalExperiences
            });
        }
    }
}
