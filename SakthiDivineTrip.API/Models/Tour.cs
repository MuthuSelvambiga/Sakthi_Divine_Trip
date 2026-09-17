using System;
using System.Collections.Generic;

namespace SakthiDivineTrip.API.Models;

public partial class Tour
{
    public int TourId { get; set; }

    public int CategoryId { get; set; }

    public string TourName { get; set; } = null!;

    public string Location { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public int DurationDays { get; set; }

    public decimal Price { get; set; }

    public int AvailableSeats { get; set; }

    public string? CoverImage { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public decimal? EarlyBirdPrice { get; set; }

    public int? EarlyBirdLimit { get; set; }

    public int? EarlyBirdRemaining { get; set; }

    public bool IsEarlyBirdActive { get; set; }

    public virtual TourCategory Category { get; set; } = null!;

    public virtual ICollection<CustomerExperience> CustomerExperiences { get; set; } = new List<CustomerExperience>();

    public virtual ICollection<TourGallery> TourGalleries { get; set; } = new List<TourGallery>();

    public virtual ICollection<TourInclusion> TourInclusions { get; set; } = new List<TourInclusion>();

    public virtual ICollection<TourItinerary> TourItineraries { get; set; } = new List<TourItinerary>();
}
