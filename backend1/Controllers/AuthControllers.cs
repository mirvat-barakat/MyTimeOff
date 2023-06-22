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
 
        // API to login
        /*In this API we performs a database query to find the user by email. Usually to calculate time complexity we look for the worst case scenario,
         here it is that there are N employees in the database, the method needs to iterate through all the employees to find a match for the provided email.
          For that, the time complexity of login is O(N), where N is the number of employees in the database.*/
          /*In both API's, the space complexity is O(1) because the amount of additional memory used by the program remains constant,
           regardless of the number of employees or the size of the input. The memory usage is not proportional to the input size.*/
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel model)
        {
            var user = await _dbContext.Employees.FirstOrDefaultAsync(e => e.Email == model.Email);
            if (user == null)
            {
                return Unauthorized();
            }

            var token = GenerateJwtToken(user);

            var response = new
            {
                status = "success",
                employee = user,
                token = token
            };

            return Ok(response);
        }

        // API to register
        /*In this API we performs a database query to check if the provided email already exists in the database.
          Again, in the worst case scenario, where there are N employees in the database, the method needs to iterate through all the employees to check if any of them have the same email.
          For that, the time complexity of the register is O(N), where N is the number of employees in the database.*/
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestModel model)
        {
            if (await _dbContext.Employees.AnyAsync(e => e.Email == model.Email))
            {
                return Conflict("Email already exists");
            }

            var user = new Employee
            {
                Name = model.Name,
                Email = model.Email,
                Password = model.Password
            };

            _dbContext.Employees.Add(user);
            await _dbContext.SaveChangesAsync();

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