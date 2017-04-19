using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace TF.Shortener.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }

        public virtual ICollection<ShortLink> UserLinks { get; set; }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<ShortLink> ShortLinks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ShortLink>()
                .HasMany(e => e.Users)
                .WithMany(e => e.UserLinks)
                .Map(cfg =>
                {
                    cfg.MapLeftKey(@"UserId");
                    cfg.MapRightKey(@"LinkId");
                    cfg.ToTable("UsersLinks");
                });
        }
    }

    public class ShortLink
    {
        [Index]
        [Key]
        public String ShortPath { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        [Required]
        public Int64 Count { get; set; }

        [Required]
        public String Uri { get; set; }

        public ICollection<ApplicationUser> Users { get; set; }
    }

    public static class ModelExtensions
    {
        public static ShortLinkViewModel ToViewModel(this ShortLink link)
        {
            return new ShortLinkViewModel()
            {
                ShortPath = link.ShortPath,
                Uri = new Uri(link.Uri),
                Count = link.Count,
                CreateDate = link.CreateDate
            };
        }
    }
}