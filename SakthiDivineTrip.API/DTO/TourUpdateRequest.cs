namespace SakthiDivineTrip.API.DTO
{
    public class TourUpdateRequest
    {
        public int? CategoryId { get; set; }
        public string? TourName { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public int? DurationDays { get; set; }
        public decimal? Price { get; set; }
        public int? AvailableSeats { get; set; }
        public string? CoverImage { get; set; }
        public decimal? EarlyBirdPrice { get; set; }
        public int? EarlyBirdLimit { get; set; }
        public bool? IsEarlyBirdActive { get; set; }
    }
}
