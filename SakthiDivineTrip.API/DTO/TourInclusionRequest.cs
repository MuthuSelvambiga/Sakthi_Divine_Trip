namespace SakthiDivineTrip.API.DTO
{
    public class TourInclusionRequest
    {
        public int TourId { get; set; }

        public string InclusionText { get; set; } = string.Empty;

        public int DisplayOrder { get; set; }

    }
}
