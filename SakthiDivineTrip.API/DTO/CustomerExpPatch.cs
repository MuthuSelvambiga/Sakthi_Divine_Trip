namespace SakthiDivineTrip.API.DTO
{
    public class CustomerExpPatch
    {
        public int? TourId { get; set; }

        public string? CustomerName { get; set; }

        public string? ExperienceTitle { get; set; }

        public string? ExperienceText { get; set; }

        public byte? Rating { get; set; }

        public DateOnly? ExperienceDate { get; set; }

        public string? PhotoPath { get; set; }

        public string? VideoPath { get; set; }
    }
}
