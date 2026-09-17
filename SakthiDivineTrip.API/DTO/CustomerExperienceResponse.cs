namespace SakthiDivineTrip.API.DTO
{
    public class CustomerExperienceResponse
    {
        public int ExperienceId { get; set; }

        public string CustomerName { get; set; } = string.Empty;

        public string? ExperienceTitle { get; set; }

        public string ExperienceText { get; set; } = string.Empty;

        public byte Rating { get; set; }

        public DateOnly? ExperienceDate { get; set; }

        public string? PhotoPath { get; set; }

        public string? VideoPath { get; set; }
    }
}
