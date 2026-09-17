namespace SakthiDivineTrip.API.DTO
{
    public class TourRequest
    {
        public int CategoryId { get; set; }

        public string TourName { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateOnly StartDate { get; set; }

        public DateOnly? EndDate { get; set; }

        public int DurationDays { get; set; }

        public decimal Price { get; set; }

        public int AvailableSeats { get; set; }

        public string? CoverImage { get; set; }

        public decimal? EarlyBirdPrice { get; set; }

        public int? EarlyBirdLimit { get; set; }

        public bool IsEarlyBirdActive { get; set; }
    }
}
