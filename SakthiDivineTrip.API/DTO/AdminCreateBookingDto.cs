namespace SakthiDivineTrip.API.DTO
{
    public class AdminCreateBookingDto
    {

        public int TourId { get; set; }
        public string CustomerName { get; set; } = null!;
        public string CustomerPhone { get; set; } = null!;
        public int NumberOfSeats { get; set; }
    }
}
