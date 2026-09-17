using System;
using System.Collections.Generic;

namespace SakthiDivineTrip.API.Models;

public partial class Booking
{
    public int BookingId { get; set; }

    public int TourId { get; set; }

    public string CustomerName { get; set; } = null!;

    public string CustomerPhone { get; set; } = null!;

    public int NumberOfSeats { get; set; }

    public decimal PricePerPerson { get; set; }

    public decimal TotalAmount { get; set; }

    public int EarlyBirdSeats { get; set; }
    public int RegularSeats { get; set; }

    public DateTime BookingDate { get; set; }

    public string BookingStatus { get; set; } = null!;

    public DateTime? CancelledOn { get; set; }

    public string? CancellationReason { get; set; }

    public decimal? RefundAmount { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? UpdatedOn { get; set; }
}