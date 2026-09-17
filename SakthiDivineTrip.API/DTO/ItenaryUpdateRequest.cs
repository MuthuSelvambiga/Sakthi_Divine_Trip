namespace SakthiDivineTrip.API.DTO
{
    public class ItenaryUpdateRequest
    {
        public int? TourId { get; set; }

        public int? SequenceNo { get; set; }

        public TimeOnly? EventTime { get; set; }

        public string? ActivityType { get; set; } = null!;

        public string? Title { get; set; } = null!;

        public string? Description { get; set; }
    }
}
