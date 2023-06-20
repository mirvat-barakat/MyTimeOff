using Microsoft.AspNetCore.Mvc;
using backend1.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backend1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly VacationDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public AuthenticationController(VacationDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel model)
        {
            // Find the user by email
            var user = await _dbContext.Employees.FirstOrDefaultAsync(e => e.Email == model.Email);
            if (user == null)
            {
                // Invalid email or password
                return Unauthorized();
            }

            // Create token
            var token = GenerateJwtToken(user);

            // Return response with token
            var response = new
            {
                status = "success",
                employee = user,
                token = token
            };

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestModel model)
        {
            // Check if email already exists
            if (await _dbContext.Employees.AnyAsync(e => e.Email == model.Email))
            {
                return Conflict("Email already exists");
            }

            // Create new user
            var user = new Employee
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password
            };

            // Add user to database
            _dbContext.Employees.Add(user);
            await _dbContext.SaveChangesAsync();

            // Return response
            var response = new
            {
                status = "success",
                employee = user
            };

            return CreatedAtAction(nameof(Login), response);
        }

        private string GenerateJwtToken(Employee user)
        {

            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
    
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.Name)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
// Login request model
public class LoginRequestModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}

// Register request model
public class RegisterRequestModel
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}