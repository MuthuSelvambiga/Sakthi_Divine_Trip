using Microsoft.AspNetCore.Http;

namespace SakthiDivineTrip.API.DTO
{
    public class CustomerExpRequest
    {
        public int? TourId { get; set; }

        public string CustomerName { get; set; } = string.Empty;

        public string? ExperienceTitle { get; set; }

        public string ExperienceText { get; set; } = string.Empty;

        public byte Rating { get; set; }

        public DateOnly? ExperienceDate { get; set; }

        // Optional customer photo
        public IFormFile? Photo { get; set; }
    }
}