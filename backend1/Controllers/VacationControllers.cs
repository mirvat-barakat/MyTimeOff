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
    public class VacationController : ControllerBase
    {
        private readonly VacationDbContext _dbContext;

        public VacationController(VacationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // API to get all vacations for an employee
        [HttpGet("employee/{employeeId}")]
        public async Task<IActionResult> GetVacationsForEmployee(int employeeId)
        {
            var vacations = await _dbContext.Vacations
                .Where(v => v.EmployeeId == employeeId)
                .ToListAsync();

            return Ok(vacations);
        }

        // API to add a new vacation
        [HttpPost]
        public async Task<IActionResult> AddVacation([FromBody] AddVacationRequestModel model)
        {
            // Find the employee by ID
            var employee = await _dbContext.Employees.FindAsync(model.EmployeeId);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            // Create a new vacation
            var vacation = new Vacation
            {
                Description = model.Description,
                StartDate = model.StartDate,
                EndDate = model.EndDate,
                Duration = model.Duration,
                Employee = employee
            };

            // Add vacation to the employee's list of vacations
            employee.Vacations.Add(vacation);

            // Save changes to the database
            await _dbContext.SaveChangesAsync();

            // Return response
            var response = new
            {
                status = "success",
                vacation = vacation
            };

            return Ok( response);
        }
    }
}

public class AddVacationRequestModel
{
    public string Description { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public string Duration { get; set; }
    
    public int EmployeeId { get; set; }
}