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
    public class TourItenaryController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public TourItenaryController (ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetItenaries()
        {
            var itenaries = await _applicationDbContext.TourItineraries.ToListAsync();
            return Ok(itenaries);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetItenaryById(int id)
        {
            var ItenarybyID = await _applicationDbContext.TourItineraries.FirstOrDefaultAsync(x => x.ItineraryId == id);
            if (ItenarybyID == null)
            {
                return NotFound("ItenaryId not found");
            }
       
             return Ok(ItenarybyID);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateItenaries(ItenaryRequest itenaryRequest)
        {
            var createItenaries = new TourItinerary
            {
                TourId = itenaryRequest.TourId,
                SequenceNo = itenaryRequest.SequenceNo,
                EventTime = itenaryRequest.EventTime,
                ActivityType = itenaryRequest.ActivityType,
                Title = itenaryRequest.Title,
                Description = itenaryRequest.Description,
                CreatedOn = DateTime.UtcNow,
                DisplayOnWebsite = true

            };

             _applicationDbContext.Add(createItenaries);
            await _applicationDbContext.SaveChangesAsync();
            return Ok("Itenary created successfully");
        }

        [HttpPatch("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult>UpdateTourItenaries(ItenaryUpdateRequest itenaryUpdateRequest,int id)
        {
            var updateItenaries = await _applicationDbContext.TourItineraries.FirstOrDefaultAsync(x => x.ItineraryId == id);
            if (updateItenaries == null)
            {
                return BadRequest("Itenary not found");
            }
            if (itenaryUpdateRequest.TourId.HasValue)
            {
                updateItenaries.TourId = itenaryUpdateRequest.TourId.Value;
            }
            if(itenaryUpdateRequest.SequenceNo.HasValue)
            {
                updateItenaries.SequenceNo = itenaryUpdateRequest.SequenceNo.Value;
            }
            if(itenaryUpdateRequest.EventTime.HasValue)
            {
                updateItenaries.EventTime=itenaryUpdateRequest.EventTime.Value;
            }
            if (!string.IsNullOrWhiteSpace(itenaryUpdateRequest.ActivityType))
            {
                updateItenaries.ActivityType = itenaryUpdateRequest.ActivityType;
            }
            if (!string.IsNullOrWhiteSpace(itenaryUpdateRequest.Title))
            {
                updateItenaries.Title = itenaryUpdateRequest.Title;
            }
            if (!string.IsNullOrWhiteSpace(itenaryUpdateRequest.Description))
            {
                updateItenaries.Description = itenaryUpdateRequest.Description;
            }

            await _applicationDbContext.SaveChangesAsync();
            return Ok(updateItenaries);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteItenary(int id)
        {
            var deleteItenary = await _applicationDbContext.TourItineraries.FirstOrDefaultAsync(x => x.ItineraryId == id);

            if (deleteItenary == null)
            {
                return NotFound("Itenary Not Found");
            }
            _applicationDbContext.TourItineraries.Remove(deleteItenary);
            await _applicationDbContext.SaveChangesAsync();

            return Ok("Itenary Deleted Scuccessfully");

        }
    }
}
