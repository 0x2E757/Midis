using Microsoft.EntityFrameworkCore;
using Midis.Models;
using System;

namespace Midis.Helpers
{
    public class MidisContext : DbContext
    {
        public MidisContext(DbContextOptions<MidisContext> options)
            : base(options)
        {
        }

        public DbSet<UserModel> Users { get; set; }
        public DbSet<SettingModel> Settings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().ToTable("Users");
            modelBuilder.Entity<SettingModel>().ToTable("Settings");

            modelBuilder.Entity<UserModel>()
                .Property(entity => entity.Roles)
                .HasConversion(
                    value => string.Join(',', value),
                    value => value.Split(',', StringSplitOptions.RemoveEmptyEntries)
                );
        }
    }
}
