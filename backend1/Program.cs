using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore.Migrations;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add configuration
builder.Configuration.AddJsonFile("appsettings.json");

var connectionString = "Server=127.0.0.1;Port=3306;Database=vacation_db;Uid=root;Pwd=;";

// Register services
builder.Services.AddDbContext<VacationDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 26))));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
// Build the host
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<VacationDbContext>();
    // Perform any database initialization or seeding here
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();