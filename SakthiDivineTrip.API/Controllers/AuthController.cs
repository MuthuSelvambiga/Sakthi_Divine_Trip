using Azure.Messaging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SakthiDivineTrip.API.DTO;
using SakthiDivineTrip.API.Models;
using SakthiDivineTrip.API.Services;

namespace SakthiDivineTrip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController:ControllerBase
    {

        //  1. Responsibility of controller
        //login
        //logout

        //forgot password
        //refresh token
        //change password

        // what is needed
        //- ApplicationDbContext
        //- JWTService


        //Endpoints:
        //- POST /api/auth/login

        private readonly ApplicationDbContext _applicationDbContext;
        private readonly JWTService _jwtService;

        public AuthController(ApplicationDbContext applicationDbContext, JWTService jwtService)
        {
            _applicationDbContext = applicationDbContext;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult>Register(RegisterRequest registerRequest)
        {
            var existingUser = await _applicationDbContext.Users.FirstOrDefaultAsync(x => x.Username == registerRequest.UserName);
          if (existingUser != null)
            {
                return Conflict("Username already exists");
            }

          //creating password hasher here
            var passwordHasher = new PasswordHasher<User>();
            string passwordHash = passwordHasher.HashPassword(
                new User(), registerRequest.Password );

            var user = new User
            {
                FullName = registerRequest.FullName,
                Username = registerRequest.UserName,
                Email = registerRequest.Email,
                PasswordHash = passwordHash,
                Role = "Admin",
            };
            _applicationDbContext.Users.Add(user);
                await _applicationDbContext.SaveChangesAsync();
            return Ok("User registered successfully");

         }

        [HttpPost("login")]
        public async Task<IActionResult>Login(LoginRequest loginRequest)
        {
            var user=await _applicationDbContext.Users.FirstOrDefaultAsync(x=>x.Username == loginRequest.UserName);
            if (user == null || !user.IsActive)
            {
                return Unauthorized(new LoginResponse
                {
                    Success = false,
                    Message = "Invalid username or password.",
                });
            }
            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginRequest.Password);

            if(result==PasswordVerificationResult.Failed)
            {
                return Unauthorized(new LoginResponse
                {
                    Success=false,
                    Message= "Invalid username or password."
                });
            }
            user.LastLogin = DateTime.UtcNow;

            await _applicationDbContext.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user.Username,user.Role);
            return Ok(new LoginResponse
            {
                Success=true,
                Message="Login successful.",
                Token=token
            });
        }
    }
}
