using System;
using System.Collections.Generic;

namespace SakthiDivineTrip.API.Models;

public partial class TourInclusion
{
    public int InclusionId { get; set; }

    public int TourId { get; set; }

    public string InclusionText { get; set; } = null!;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public virtual Tour Tour { get; set; } = null!;
}
