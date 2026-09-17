namespace SakthiDivineTrip.API.DTO
{
    public class RegisterRequest
    {
        public string FullName { get; set; } = string.Empty; //identify the employee/admin

        public string UserName { get; set; } = string.Empty; // for login
        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty; // will be hashed by API before saving

        public string Role { get; set; } = "Admin"; // determines permissions
    }
}
