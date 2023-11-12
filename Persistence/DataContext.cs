using System.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        // database table name: Activities
        public DbSet<Activity> Activities { get; set; }
    }
}

