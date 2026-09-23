using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SakthiDivineTrip.API.DTO;
using SakthiDivineTrip.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;

namespace SakthiDivineTrip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerExpController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        private readonly IWebHostEnvironment _environment;

        public CustomerExpController(
            ApplicationDbContext applicationDbContext,
            IWebHostEnvironment environment)
        {
            _applicationDbContext = applicationDbContext;
            _environment = environment;
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
                .Include(x => x.Tour)
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new
                {
                    x.ExperienceId,
                    x.TourId,
                    TourName = x.Tour != null ? x.Tour.TourName : "General Experience",
                    x.CustomerName,
                    x.ExperienceTitle,
                    x.ExperienceText,
                    x.Rating,
                    x.ExperienceDate,
                    x.PhotoPath,
                    x.VideoPath,
                    x.IsPublishedWithPermission,
                    x.IsFeatured,
                    x.DisplayOrder,
                    x.IsActive,
                    x.CreatedOn,
                    x.UpdatedOn
                })
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
        [HttpPost]
        public async Task<IActionResult> CreateExperience(
    [FromForm] CustomerExpRequest exprequest)
        {
            string? photoPath = null;

            if (exprequest.Photo != null && exprequest.Photo.Length > 0)
            {
                var uploadFolder = Path.Combine(
                    _environment.WebRootPath,
                    "images",
                    "customer-experiences"
                );

                Directory.CreateDirectory(uploadFolder);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(exprequest.Photo.FileName)}";

                var filePath = Path.Combine(uploadFolder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await exprequest.Photo.CopyToAsync(stream);
                }

                photoPath = $"/images/customer-experiences/{fileName}";
            }

            var experience = new CustomerExperience
            {
                TourId = exprequest.TourId,
                CustomerName = exprequest.CustomerName,
                ExperienceTitle = exprequest.ExperienceTitle,
                ExperienceText = exprequest.ExperienceText,
                Rating = exprequest.Rating,
                ExperienceDate = exprequest.ExperienceDate,

                PhotoPath = photoPath,
                VideoPath = null,

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
        [HttpPost("upload-photo")]
        public async Task<IActionResult> UploadPhoto(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Please select a photo.");
            }

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };

            var extension = Path.GetExtension(file.FileName)
                .ToLowerInvariant();

            if (!allowedExtensions.Contains(extension))
            {
                return BadRequest(
                    "Only JPG, JPEG, PNG and WEBP images are allowed."
                );
            }

            var uploadsFolder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "images",
                "customer-experiences"
            );

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var fileName = $"{Guid.NewGuid()}{extension}";

            var filePath = Path.Combine(
                uploadsFolder,
                fileName
            );

            using (var stream = new FileStream(
                filePath,
                FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photoPath = $"/images/customer-experiences/{fileName}";

            return Ok(new
            {
                photoPath
            });
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
