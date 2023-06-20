using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore.Migrations;

var builder = WebApplication.CreateBuilder(args);

// Add configuration
builder.Configuration.AddJsonFile("appsettings.json");

// Register services
builder.Services.AddDbContext<VacationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Server=localhost;Port=3306;Database=vacation_db;Uid=root;Pwd=;")));

// Build the host
var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<VacationDbContext>();
}

app.Run();