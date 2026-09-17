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
    public class ToursController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;


        public ToursController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet("upcoming")]
        public async Task<IActionResult> GetUpcomingTours()
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var tours = await _applicationDbContext.Tours
                .Where(x => x.IsActive && x.StartDate > today)
                .OrderBy(x => x.StartDate)
                .Take(4)
                .ToListAsync();

            return Ok(tours);
        }
        [HttpGet("past")]
        public async Task<IActionResult> GetPastTours()
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var tours = await _applicationDbContext.Tours
                .Where(x => x.IsActive && x.StartDate < today)
                .OrderByDescending(x => x.StartDate)
                .ToListAsync();

            return Ok(tours);
        }
        [HttpGet]
        public async Task<IActionResult> GetTours()
        {
            var tours = await _applicationDbContext.Tours
                .Where(x => x.IsActive)
                .ToListAsync();

            return Ok(tours);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTourByID(int id)
        {
            var tour = await _applicationDbContext.Tours.FirstOrDefaultAsync(x => x.TourId == id);
            if (tour == null)
            {
                return NotFound("No Tour Found");
            }
            return Ok(tour);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateTour(TourRequest tourRequest)
        {


            var tour = new Tour
            {
                CategoryId = tourRequest.CategoryId,
                TourName = tourRequest.TourName,
                Location = tourRequest.Location,
                Description = tourRequest.Description,
                StartDate = tourRequest.StartDate,
                EndDate = tourRequest.EndDate,
                DurationDays = tourRequest.DurationDays,
                Price = tourRequest.Price,
                AvailableSeats = tourRequest.AvailableSeats,
                CoverImage = tourRequest.CoverImage,
               
                EarlyBirdPrice = tourRequest.EarlyBirdPrice,
                EarlyBirdLimit = tourRequest.EarlyBirdLimit,
                EarlyBirdRemaining = tourRequest.EarlyBirdLimit,
                IsEarlyBirdActive = tourRequest.IsEarlyBirdActive,

                 IsActive = true,

                CreatedOn = DateTime.UtcNow
            };

            _applicationDbContext.Tours.Add(tour);
            await _applicationDbContext.SaveChangesAsync();

            return CreatedAtAction(
                    nameof(GetTourByID),
                    new { id = tour.TourId },
                    tour);

        }
        [HttpPatch("{Id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateTours(int Id, TourUpdateRequest tourRequest)
        {
            var updatedTour = await _applicationDbContext.Tours.FirstOrDefaultAsync(x => x.TourId == Id);
            if (updatedTour == null)
            {
                return NotFound("Tour not found");
            }
            if (tourRequest.CategoryId.HasValue)
            {
                updatedTour.CategoryId = tourRequest.CategoryId.Value;
            }
            if (!string.IsNullOrWhiteSpace(tourRequest.TourName))
            {
                updatedTour.TourName = tourRequest.TourName;
            }
            if (!string.IsNullOrWhiteSpace(tourRequest.Location))
            {
                updatedTour.Location = tourRequest.Location;
            }
            if (!string.IsNullOrWhiteSpace(tourRequest.Description))
            {
                updatedTour.Description = tourRequest.Description;
            }
            if (tourRequest.StartDate.HasValue)
            {
                updatedTour.StartDate = tourRequest.StartDate.Value;
            }
            if (tourRequest.EndDate.HasValue)
            {
                updatedTour.EndDate = tourRequest.EndDate.Value;
            }
            if (tourRequest.DurationDays.HasValue)
            {
                updatedTour.DurationDays = tourRequest.DurationDays.Value;
            }
            if (tourRequest.Price.HasValue)
            {
                updatedTour.Price = tourRequest.Price.Value;
            }
            if (tourRequest.AvailableSeats.HasValue)
            {
                updatedTour.AvailableSeats = tourRequest.AvailableSeats.Value;
            }
            if (!string.IsNullOrWhiteSpace(tourRequest.CoverImage))
            {
                updatedTour.CoverImage = tourRequest.CoverImage;
            }
            if (tourRequest.EarlyBirdPrice.HasValue)
            {
                updatedTour.EarlyBirdPrice = tourRequest.EarlyBirdPrice.Value;
            }
            if (tourRequest.EarlyBirdLimit.HasValue)
            {
                updatedTour.EarlyBirdLimit = tourRequest.EarlyBirdLimit.Value;
            }
            if (tourRequest.IsEarlyBirdActive.HasValue)
            {
                updatedTour.IsEarlyBirdActive = tourRequest.IsEarlyBirdActive.Value;
            }

            await _applicationDbContext.SaveChangesAsync();

            return Ok(updatedTour);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult>DeleteTour(int id)
        {
            var deleteTour=await _applicationDbContext.Tours.FirstOrDefaultAsync(x=>x.TourId==id);

            if (deleteTour == null)
            {
                return NotFound("Tour Not Found");
            }
            if (!deleteTour.IsActive)
            {
                return BadRequest("Tour is already inactive.");
            }
            deleteTour.IsActive = false;
            deleteTour.UpdatedOn = DateTime.UtcNow;

           
            await _applicationDbContext.SaveChangesAsync();

            return Ok("Tour deactivated  Scuccessfully");

        }

        [HttpGet("{id}/details")]
        public async Task<IActionResult> GetTourDetails(int id)
        {
            var tour = await _applicationDbContext.Tours
                            .Include(x => x.TourGalleries)
                            .Include(x => x.TourItineraries)
                            .Include(x => x.TourInclusions)
                            .Include(x => x.CustomerExperiences)
                            .FirstOrDefaultAsync(x => x.TourId == id && x.IsActive);

            if (tour == null)
            {
                return NotFound("Tour not found");
            }

            var response = new TourDetailsResponse
            {
                TourId = tour.TourId,
                TourName = tour.TourName,
                Location = tour.Location,
                Description = tour.Description,
                StartDate = tour.StartDate,
                EndDate = tour.EndDate,
                DurationDays = tour.DurationDays,
                Price = tour.Price,
                AvailableSeats = tour.AvailableSeats,
                CoverImage = tour.CoverImage,
                EarlyBirdPrice = tour.EarlyBirdPrice,
                IsEarlyBirdActive = tour.IsEarlyBirdActive,

                Gallery = tour.TourGalleries
                            .OrderBy(x => x.DisplayOrder)
                            .Select(x => new TourGalleryResponse
                            {
                                GalleryId = x.GalleryId,
                                ImageTitle = x.ImageTitle,
                                ImagePath = x.ImagePath,
                                DisplayOrder = x.DisplayOrder,
                                IsCoverImage = x.IsCoverImage
                            })
                            .ToList(),
                Itinerary = tour.TourItineraries
    .Where(x => x.DisplayOnWebsite)
    .OrderBy(x => x.SequenceNo)
    .Select(x => new TourItenaryResponse
    {
        ItineraryId = x.ItineraryId,
        SequenceNo = x.SequenceNo,
        EventTime = x.EventTime,
        ActivityType = x.ActivityType,
        Title = x.Title,
        Description = x.Description
    })
    .ToList(),
                Inclusions =tour.TourInclusions
                            .OrderBy(x=>x.DisplayOrder)
                            .Select(x=>new TourInclusionResponse
                            {
                                InclusionId= x.InclusionId,
                                InclusionText= x.InclusionText,
                                DisplayOrder= x.DisplayOrder

                            })
                            .ToList(),

                Experiences=tour.CustomerExperiences
                            .Where(x=>x.IsActive && x.IsPublishedWithPermission)
                            .OrderByDescending(x=>x.IsFeatured)
                            .ThenBy(x=>x.DisplayOrder)
                            .Select(x=>new CustomerExperienceResponse
                            {
                                ExperienceId= x.ExperienceId,
                                CustomerName= x.CustomerName,
                                ExperienceTitle= x.ExperienceTitle,
                                ExperienceText= x.ExperienceText,
                                Rating= x.Rating,
                                ExperienceDate= x.ExperienceDate,
                                PhotoPath= x.PhotoPath,
                                VideoPath= x.VideoPath
                            })
                            .ToList()


            };

            return Ok(response);
        }
    }
}
