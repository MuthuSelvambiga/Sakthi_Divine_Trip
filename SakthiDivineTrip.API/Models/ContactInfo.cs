using System;
using System.Collections.Generic;

namespace SakthiDivineTrip.API.Models;

public partial class ContactInfo
{
    public int ContactId { get; set; }

    public string CompanyName { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public string Pincode { get; set; } = null!;

    public string MobileNumber { get; set; } = null!;

    public string? WhatsAppNumber { get; set; }

    public string Email { get; set; } = null!;

    public string? GoogleMapUrl { get; set; }

    public string? FacebookUrl { get; set; }

    public string? InstagramUrl { get; set; }

    public string? YouTubeUrl { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? UpdatedOn { get; set; }
}
