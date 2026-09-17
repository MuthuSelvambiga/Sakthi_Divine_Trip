namespace SakthiDivineTrip.API.DTO
{
    public class TourItenaryResponse
    {
        public int ItineraryId { get; set; }

        public int SequenceNo { get; set; }

        public TimeOnly? EventTime { get; set; }

        public string ActivityType { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }
    }
}
