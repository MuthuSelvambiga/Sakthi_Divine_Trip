using System;
using System.Collections.Generic;

namespace SakthiDivineTrip.API.Models;

public partial class TourItinerary
{
    public int ItineraryId { get; set; }

    public int TourId { get; set; }

    public int SequenceNo { get; set; }

    public TimeOnly? EventTime { get; set; }

    public string ActivityType { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime CreatedOn { get; set; }

    public bool DisplayOnWebsite { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public virtual Tour Tour { get; set; } = null!;
}
