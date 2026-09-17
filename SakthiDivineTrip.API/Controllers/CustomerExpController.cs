using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SakthiDivineTrip.API.DTO;
using SakthiDivineTrip.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace SakthiDivineTrip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerExpController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public CustomerExpController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet("published")]
        public async Task<IActionResult> GetPublishedExperiences()
        {
            var experiences = await _applicationDbContext.CustomerExperiences
                .Where(x => x.IsActive && x.IsPublishedWithPermission)
                .ToListAsync();

            return Ok(experiences);
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetExperiences()
        {
            var experiences = await _applicationDbContext.CustomerExperiences
                .ToListAsync();

            return Ok(experiences);
        }
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetExperienceById(int id)
        {
            var experience = await _applicationDbContext.CustomerExperiences
                .FirstOrDefaultAsync(x => x.ExperienceId == id);

            if (experience == null)
            {
                return NotFound("Customer experience not found.");
            }

            return Ok(experience);
        }
        [HttpPost]
        public async Task<IActionResult> CreateExperience(CustomerExpRequest exprequest)
        {
            var experience = new CustomerExperience
            {
                TourId = exprequest.TourId,
                CustomerName = exprequest.CustomerName,
                ExperienceTitle = exprequest.ExperienceTitle,
                ExperienceText = exprequest.ExperienceText,
                Rating = exprequest.Rating,
                ExperienceDate = exprequest.ExperienceDate,
                PhotoPath = exprequest.PhotoPath,
                VideoPath = exprequest.VideoPath,

                // Server-managed fields
                IsPublishedWithPermission = false,
                IsFeatured = false,
                DisplayOrder = 0,
                IsActive = true,
                CreatedOn = DateTime.UtcNow
            };

            _applicationDbContext.CustomerExperiences.Add(experience);

            await _applicationDbContext.SaveChangesAsync();

            return Ok(experience);
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateExperience(int id, CustomerExpPatch request)
        {
            var experience = await _applicationDbContext.CustomerExperiences
                .FirstOrDefaultAsync(x => x.ExperienceId == id);

            if (experience == null)
            {
                return NotFound("Customer experience not found.");
            }

            if (request.TourId.HasValue)
                experience.TourId = request.TourId.Value;

            if (request.CustomerName != null)
                experience.CustomerName = request.CustomerName;

            if (request.ExperienceTitle != null)
                experience.ExperienceTitle = request.ExperienceTitle;

            if (request.ExperienceText != null)
                experience.ExperienceText = request.ExperienceText;

            if (request.Rating.HasValue)
                experience.Rating = request.Rating.Value;

            if (request.ExperienceDate.HasValue)
                experience.ExperienceDate = request.ExperienceDate.Value;

            if (request.PhotoPath != null)
                experience.PhotoPath = request.PhotoPath;

            if (request.VideoPath != null)
                experience.VideoPath = request.VideoPath;

            experience.UpdatedOn = DateTime.UtcNow;

            await _applicationDbContext.SaveChangesAsync();

            return Ok(experience);
        }

        [HttpPut("{id}/publish")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PublishExperience(int id)
        {
            var experience = await _applicationDbContext.CustomerExperiences
                .FirstOrDefaultAsync(x => x.ExperienceId == id);

            if (experience == null)
            {
                return NotFound("Customer experience not found.");
            }

            experience.IsPublishedWithPermission = true;
            experience.UpdatedOn = DateTime.UtcNow;

            await _applicationDbContext.SaveChangesAsync();

            return Ok("Customer experience published successfully.");
        }

        [HttpPut("{id}/unpublish")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UnpublishExperience(int id)
        {
            var experience = await _applicationDbContext.CustomerExperiences
                .FirstOrDefaultAsync(x => x.ExperienceId == id);

            if (experience == null)
            {
                return NotFound("Customer experience not found.");
            }

            experience.IsPublishedWithPermission = false;
            experience.UpdatedOn = DateTime.UtcNow;

            await _applicationDbContext.SaveChangesAsync();

            return Ok("Customer experience unpublished successfully.");
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteExperience(int id)
        {
            var experience = await _applicationDbContext.CustomerExperiences
                .FirstOrDefaultAsync(x => x.ExperienceId == id);

            if (experience == null)
            {
                return NotFound("Customer experience not found.");
            }

            _applicationDbContext.CustomerExperiences.Remove(experience);

            await _applicationDbContext.SaveChangesAsync();

            return Ok("Customer experience deleted successfully.");
        }
    }
}
