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
    public class TourInclusionsController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TourInclusionsController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetInclusions()
        {
            var inclusions = await _applicationDbContext.TourInclusions.ToListAsync();
            return Ok(inclusions);
        }
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetInclusionsByID(int id)
        {
            var inclusionbyID = await _applicationDbContext.TourInclusions.FirstOrDefaultAsync(x => x.InclusionId == id);
            if (inclusionbyID == null)
            {
                return NotFound("Inclusion ID not found");
            }

            return Ok(inclusionbyID);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateInclusion(TourInclusionRequest tourInclusionRequest)
        {
            var createInclusion = new TourInclusion()
            {
                TourId= tourInclusionRequest.TourId,
                InclusionText= tourInclusionRequest.InclusionText,
                DisplayOrder=tourInclusionRequest.DisplayOrder,

                IsActive = true,
                CreatedOn = DateTime.UtcNow

            };


            _applicationDbContext.TourInclusions.Add(createInclusion);
            await _applicationDbContext.SaveChangesAsync();
            return Ok("Tour Inclusions created successfully");
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateInclusions(int id, InclusionPatchRequest patchrequest)
        {
            var updateInclusions = await _applicationDbContext.TourInclusions.FirstOrDefaultAsync(x => x.InclusionId == id);
            if (updateInclusions == null)
            {
                return NotFound("Inclusion with this ID not found");
            }
            if (patchrequest.TourId.HasValue)
            {
                updateInclusions.TourId = patchrequest.TourId.Value;
            }
            if (!string.IsNullOrWhiteSpace(patchrequest.InclusionText))
            {
                updateInclusions.InclusionText = patchrequest.InclusionText;
            }
            if (patchrequest.DisplayOrder.HasValue)
            {
                updateInclusions.DisplayOrder = patchrequest.DisplayOrder.Value;
            }
            await _applicationDbContext.SaveChangesAsync();
            return Ok(updateInclusions);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteInclusion(int id)
        {
            var deleteInclusion= await _applicationDbContext.TourInclusions.FirstOrDefaultAsync(x => x.InclusionId == id);

            if (deleteInclusion == null)
            {
                return NotFound("Gallery of that ID not found");
            }
            _applicationDbContext.TourInclusions.Remove(deleteInclusion);
            await _applicationDbContext.SaveChangesAsync();

            return Ok("Inclusions Deleted Scuccessfully");

        }
    }
}
