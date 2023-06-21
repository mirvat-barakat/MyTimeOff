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

            

             var response = new
            {
                status = "success",
                vacations = vacations
            };

            return Ok( response);
        }

        // API to add a new vacation
        [HttpPost("{employeeId}")]
        public async Task<IActionResult> AddVacation(int employeeId, [FromBody] AddVacationRequestModel model)
        {
            var employee = await _dbContext.Employees.FindAsync(employeeId);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            var vacation = new Vacation
            {
                Description = model.Description,
                StartDate = model.StartDate,
                EndDate = model.EndDate,
                Duration = model.Duration,
                Employee = employee
            };

            _dbContext.Vacations.Add(vacation);

            _dbContext.SaveChangesAsync();

            var response = new
            {
                status = "success",
                vacation = vacation
            };

            return Ok( response);
        }

        // API to delete a vacation
        [HttpDelete("{id}")]
        public IActionResult DeleteVacation(int id)
        {
            var vacation = _dbContext.Vacations.FirstOrDefault(v => v.Id == id);

            if (vacation == null)
            {
                return NotFound(); 
            }

            _dbContext.Vacations.Remove(vacation);
            _dbContext.SaveChanges();

            var response = new
            {
                status = "success",
            };

            return Ok( response);
        }

        // API to update a vacation
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVacation(int id, [FromBody] UpdateVacationRequestModel model)
        {
            var vacation = await _dbContext.Vacations.FindAsync(id);

            if (vacation == null)
            {
                return NotFound("Vacation not found");
            }

            vacation.Description = model.Description;
            vacation.StartDate = model.StartDate;
            vacation.EndDate = model.EndDate;
            vacation.Duration = model.Duration;

            _dbContext.Vacations.Update(vacation);
            await _dbContext.SaveChangesAsync();

            var response = new
            {
                status = "success",
                vacation = vacation
            };

            return Ok(response);
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

public class UpdateVacationRequestModel
{
    public string Description { get; set; }
    
    public DateTime StartDate { get; set; }
    
    public DateTime EndDate { get; set; }
    
    public string Duration { get; set; }
}