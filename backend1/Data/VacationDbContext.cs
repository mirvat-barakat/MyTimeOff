using Microsoft.EntityFrameworkCore;
using backend1.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Migrations;

public class VacationDbContext : DbContext
{
    public DbSet<Employee> Employees {get; set;}
    public DbSet<Vacation> Vacations {get; set;}

       public VacationDbContext(DbContextOptions<VacationDbContext> options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Employee>().ToTable("Employees");
    modelBuilder.Entity<Vacation>().ToTable("Vacations");

    modelBuilder.Entity<Vacation>()
    .HasOne(v => v.Employee)
    .WithMany(e => e.Vacations)
    .HasForeignKey(v => v.EmployeeId);
}
}