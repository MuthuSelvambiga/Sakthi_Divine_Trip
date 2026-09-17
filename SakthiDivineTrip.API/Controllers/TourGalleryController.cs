using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SakthiDivineTrip.API.DTO;
using SakthiDivineTrip.API.Models;


namespace SakthiDivineTrip.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TourGalleryController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TourGalleryController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetGalleries()
        {
            var galleries = await _applicationDbContext.TourGalleries.ToListAsync();
            return Ok(galleries);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetGalleryById(int id)
        {
            var gallerybyID = await _applicationDbContext.TourGalleries.FirstOrDefaultAsync(x => x.GalleryId == id);
            if (gallerybyID == null)
            {
                return NotFound("Gallery ID not found");
            }

            return Ok(gallerybyID);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateGallery(TourGalleryRequest tourGalleryRequest)
        {
            var createGallery = new TourGallery()
            {
                TourId = tourGalleryRequest.TourId,
                ImageTitle = tourGalleryRequest.ImageTitle,
                ImagePath = tourGalleryRequest.ImagePath,
                DisplayOrder = tourGalleryRequest.DisplayOrder,
                IsCoverImage = tourGalleryRequest.IsCoverImage,

                IsActive = true,
                CreatedOn = DateTime.UtcNow

            };


            _applicationDbContext.TourGalleries.Add(createGallery);
            await _applicationDbContext.SaveChangesAsync();
            return Ok("Tour Gallery created successfully");
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateGallery(int id, GalleryPatchRequest patchrequest)
        {
            var updateGallery = await _applicationDbContext.TourGalleries.FirstOrDefaultAsync(x => x.GalleryId == id);
            if (updateGallery == null)
            {
                return NotFound("Gallery with this ID not found");
            }
            if (patchrequest.TourId.HasValue)
            {
                updateGallery.TourId = patchrequest.TourId.Value;
            }
            if (!string.IsNullOrWhiteSpace(patchrequest.ImageTitle))
            {
                updateGallery.ImageTitle = patchrequest.ImageTitle;
            }
            if (!string.IsNullOrWhiteSpace(patchrequest.ImagePath))
            {
                updateGallery.ImagePath = patchrequest.ImagePath;
            }
            if (patchrequest.DisplayOrder.HasValue)
            {
                updateGallery.DisplayOrder = patchrequest.DisplayOrder.Value;
            }
            if (patchrequest.IsCoverImage.HasValue)
            {
                updateGallery.IsCoverImage = patchrequest.IsCoverImage.Value;
            }

            await _applicationDbContext.SaveChangesAsync();
            return Ok(updateGallery);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteGallery(int id)
        {
            var deleteGallery = await _applicationDbContext.TourGalleries.FirstOrDefaultAsync(x => x.GalleryId== id);

            if (deleteGallery == null)
            {
                return NotFound("Gallery of that ID not found");
            }
            _applicationDbContext.TourGalleries.Remove(deleteGallery);
            await _applicationDbContext.SaveChangesAsync();

            return Ok("Gallery Deleted Scuccessfully");

        }
    }
}
