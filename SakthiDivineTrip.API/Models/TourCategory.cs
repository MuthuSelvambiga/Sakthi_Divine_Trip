using System;
using System.Collections.Generic;

namespace SakthiDivineTrip.API.Models;

public partial class TourCategory
{
    public int CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public virtual ICollection<Tour> Tours { get; set; } = new List<Tour>();
}
