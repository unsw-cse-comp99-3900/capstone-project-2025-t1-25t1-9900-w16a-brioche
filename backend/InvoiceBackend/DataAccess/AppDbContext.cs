using InvoiceBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace InvoiceBackend.DataAccess
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        public DbSet<ReckonToken> ReckonTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ReckonToken>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.SessionId).IsRequired().HasMaxLength(100);
                entity.HasIndex(e => e.SessionId).IsUnique();

                entity.HasData(
                    new ReckonToken
                    {
                        Id = 1,
                        SessionId = "888",
                        AccessToken = "bfdf433c15482b40aa1940d865a999ec",
                        RefreshToken = "32f262f7c1cc60767bc9da0f15c2a3e6",
                        TokenType = "Bearer",
                        ExpiryTime = DateTime.Parse("2025-04-10 16:47:37.2766302"),
                        CreatedAt = DateTime.Parse("2025-04-10 13:47:37.2771703"),
                        UpdatedAt = DateTime.Parse("2025-04-10 13:47:37.2771951")
                    }
                );
            });
        }
    }
}
