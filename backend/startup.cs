using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using backend.DataAccess;
using Microsoft.EntityFrameworkCore.SqlServer;


namespace backend
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<EmployeeContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Server=(localdb)\\mssqllocaldb;Database=mytimeoff_db;Trusted_Connection=True;MultipleActiveResultSets=True")));
            
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
        }
    }
}