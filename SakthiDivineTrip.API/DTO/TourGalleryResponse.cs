namespace SakthiDivineTrip.API.DTO
{
    public class TourGalleryResponse
    {
        public int GalleryId { get; set; }

        public string? ImageTitle { get; set; }

        public string ImagePath { get; set; } = string.Empty;

        public int DisplayOrder { get; set; }

        public bool IsCoverImage { get; set; }
    }
}
