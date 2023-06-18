using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace backend.DataAccess
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions options) : base(options) { }
        public DbSet<Employee> Employee { get; set;}
        public DbSet<Vacation> Vacation { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=mytimeoff_db;Trusted_Connection=True;MultipleActiveResultSets=True");
            }
        }
    }
}