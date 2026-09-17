using System;
using System.Collections.Generic;

namespace SakthiDivineTrip.API.Models;

public partial class CustomerExperience
{
    public int ExperienceId { get; set; }

    public int? TourId { get; set; }

    public string CustomerName { get; set; } = null!;

    public string? ExperienceTitle { get; set; }

    public string ExperienceText { get; set; } = null!;

    public byte Rating { get; set; }

    public DateOnly? ExperienceDate { get; set; }

    public string? PhotoPath { get; set; }

    public string? VideoPath { get; set; }

    public bool IsPublishedWithPermission { get; set; }

    public bool IsFeatured { get; set; }

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public virtual Tour? Tour { get; set; }
}
