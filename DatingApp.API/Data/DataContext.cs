using System.Reflection.Emit;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Like>().HasKey(x => new { x.LikeeId, x.LikerId });
            builder.Entity<Like>().
                 HasOne(x => x.Liker)
                .WithMany(x => x.Likees)
                .HasForeignKey(x => x.LikerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Like>()
                .HasOne(x => x.Likee)
                .WithMany(x => x.Likers)
                .HasForeignKey(x => x.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>().HasOne(x => x.Sender)
                .WithMany(u => u.MessagesSent).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Message>().HasOne(x => x.Recipient)
                .WithMany(u => u.MessagesRecieved).OnDelete(DeleteBehavior.Restrict);
        }
    }
}