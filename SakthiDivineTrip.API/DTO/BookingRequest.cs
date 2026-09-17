namespace SakthiDivineTrip.API.DTO
{
    public class BookingRequest
    {
        public int TourId { get; set; }

        public int NumberOfSeats { get; set; }
        public string CustomerName { get; set; } = null!;
        public string CustomerPhone { get; set; } = null!;
    }
}
