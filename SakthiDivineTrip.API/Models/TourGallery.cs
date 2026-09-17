using System;
using System.Collections.Generic;

namespace SakthiDivineTrip.API.Models;

public partial class TourGallery
{
    public int GalleryId { get; set; }

    public int TourId { get; set; }

    public string? ImageTitle { get; set; }

    public string ImagePath { get; set; } = null!;

    public int DisplayOrder { get; set; }

    public bool IsCoverImage { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public virtual Tour Tour { get; set; } = null!;
}
