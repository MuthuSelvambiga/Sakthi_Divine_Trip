namespace SakthiDivineTrip.API.DTO
{
    public class InclusionPatchRequest
    {
        public int? TourId { get; set; }

        public string? InclusionText { get; set; } = string.Empty;

        public int? DisplayOrder { get; set; }
    }
}
