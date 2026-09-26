using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SakthiDivineTrip.API.Models;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ContactInfo> ContactInfos { get; set; }

    public virtual DbSet<CustomerExperience> CustomerExperiences { get; set; }

    public virtual DbSet<Tour> Tours { get; set; }

    public virtual DbSet<TourCategory> TourCategories { get; set; }

    public virtual DbSet<TourGallery> TourGalleries { get; set; }

    public virtual DbSet<TourInclusion> TourInclusions { get; set; }

    public virtual DbSet<TourItinerary> TourItineraries { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<WebsiteSetting> WebsiteSettings { get; set; } 

    public virtual DbSet<Booking> Bookings { get; set; }

  
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactInfo>(entity =>
        {
            entity.HasKey(e => e.ContactId);

            entity.ToTable("ContactInfo");

            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.CompanyName).HasMaxLength(200);
            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(sysdatetime())", "DF_ContactInfo_CreatedOn");
            entity.Property(e => e.Email).HasMaxLength(150);
            entity.Property(e => e.FacebookUrl).HasMaxLength(500);
            entity.Property(e => e.GoogleMapUrl).HasMaxLength(1000);
            entity.Property(e => e.InstagramUrl).HasMaxLength(500);
            entity.Property(e => e.MobileNumber).HasMaxLength(20);
            entity.Property(e => e.Pincode).HasMaxLength(10);
            entity.Property(e => e.State).HasMaxLength(100);
            entity.Property(e => e.WhatsAppNumber).HasMaxLength(20);
            entity.Property(e => e.YouTubeUrl).HasMaxLength(500);
        });

        modelBuilder.Entity<CustomerExperience>(entity =>
        {
            entity.HasKey(e => e.ExperienceId);

            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(sysdatetime())", "DF_CustomerExperiences_CreatedOn");
            entity.Property(e => e.CustomerName).HasMaxLength(150);
            entity.Property(e => e.DisplayOrder).HasDefaultValue(1, "DF_CustomerExperiences_DisplayOrder");
            entity.Property(e => e.ExperienceTitle).HasMaxLength(200);
            entity.Property(e => e.IsActive).HasDefaultValue(true, "DF_CustomerExperiences_IsActive");
            entity.Property(e => e.PhotoPath).HasMaxLength(500);
            entity.Property(e => e.VideoPath).HasMaxLength(500);

            entity.HasOne(d => d.Tour).WithMany(p => p.CustomerExperiences)
                .HasForeignKey(d => d.TourId)
                .HasConstraintName("FK_CustomerExperiences_Tours");
        });

        modelBuilder.Entity<Tour>(entity =>
        {
            entity.Property(e => e.CoverImage).HasMaxLength(255);
            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(sysdatetime())", "DF_Tours_CreatedOn");
            entity.Property(e => e.EarlyBirdPrice).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.IsActive).HasDefaultValue(true, "DF_Tours_IsActive");
            entity.Property(e => e.Location).HasMaxLength(150);
            entity.Property(e => e.Price).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.TourName).HasMaxLength(200);

            entity.HasOne(d => d.Category).WithMany(p => p.Tours)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Tours_TourCategories");
        });

        modelBuilder.Entity<TourCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK_Categories");

            entity.HasIndex(e => e.CategoryName, "UQ_Categories_CategoryName").IsUnique();

            entity.Property(e => e.CategoryName).HasMaxLength(100);
            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(sysdatetime())", "DF_Categories_CreatedOn");
            entity.Property(e => e.DisplayOrder).HasDefaultValue(1, "DF_Categories_DisplayOrder");
            entity.Property(e => e.IsActive).HasDefaultValue(true, "DF_Categories_IsActive");
        });

        modelBuilder.Entity<TourGallery>(entity =>
        {
            entity.HasKey(e => e.GalleryId);

            entity.ToTable("TourGallery");

            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(sysdatetime())", "DF_TourGallery_CreatedOn");
            entity.Property(e => e.DisplayOrder).HasDefaultValue(1, "DF_TourGallery_DisplayOrder");
            entity.Property(e => e.ImagePath).HasMaxLength(500);
            entity.Property(e => e.ImageTitle).HasMaxLength(200);
            entity.Property(e => e.IsActive).HasDefaultValue(true, "DF_TourGallery_IsActive");

            entity.HasOne(d => d.Tour).WithMany(p => p.TourGalleries)
                .HasForeignKey(d => d.TourId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TourGallery_Tours");
        });

        modelBuilder.Entity<TourInclusion>(entity =>
        {
            entity.HasKey(e => e.InclusionId);

            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(sysdatetime())", "DF_TourInclusions_CreatedOn");
            entity.Property(e => e.DisplayOrder).HasDefaultValue(1, "DF_TourInclusions_DisplayOrder");
            entity.Property(e => e.InclusionText).HasMaxLength(300);
            entity.Property(e => e.IsActive).HasDefaultValue(true, "DF_TourInclusions_IsActive");

            entity.HasOne(d => d.Tour).WithMany(p => p.TourInclusions)
                .HasForeignKey(d => d.TourId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TourInclusions_Tours");
        });

        modelBuilder.Entity<TourItinerary>(entity =>
        {
            entity.HasKey(e => e.ItineraryId);

            entity.Property(e => e.ActivityType).HasMaxLength(50);
            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(sysdatetime())", "DF_TourItineraries_CreatedOn");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.DisplayOnWebsite).HasDefaultValue(true, "DF_TourItineraries_DisplayOnWebsite");
            entity.Property(e => e.Title).HasMaxLength(150);

            entity.HasOne(d => d.Tour).WithMany(p => p.TourItineraries)
                .HasForeignKey(d => d.TourId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TourItineraries_Tours");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(e => e.Email, "UQ_Users_Email").IsUnique();

            entity.HasIndex(e => e.Username, "UQ_Users_Username").IsUnique();

            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(sysdatetime())", "DF_Users_CreatedOn");
            entity.Property(e => e.Email).HasMaxLength(150);
            entity.Property(e => e.FullName).HasMaxLength(150);
            entity.Property(e => e.IsActive).HasDefaultValue(true, "DF_Users_IsActive");
            entity.Property(e => e.PasswordHash).HasMaxLength(500);
            entity.Property(e => e.Role).HasMaxLength(20);
            entity.Property(e => e.Username).HasMaxLength(50);
        });

        modelBuilder.Entity<WebsiteSetting>(entity =>
        {
            entity.HasKey(e => e.SettingId);

            entity.Property(e => e.CopyrightText).HasMaxLength(250);
            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(sysdatetime())", "DF_WebsiteSettings_CreatedOn");
            entity.Property(e => e.FaviconPath).HasMaxLength(500);
            entity.Property(e => e.FooterText).HasMaxLength(500);
            entity.Property(e => e.HomeBannerSubtitle).HasMaxLength(500);
            entity.Property(e => e.HomeBannerTitle).HasMaxLength(250);
            entity.Property(e => e.LogoPath).HasMaxLength(500);
            entity.Property(e => e.MetaDescription).HasMaxLength(500);
            entity.Property(e => e.MetaTitle).HasMaxLength(250);
            entity.Property(e => e.Tagline).HasMaxLength(250);
            entity.Property(e => e.WebsiteName).HasMaxLength(200);
        });

        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.BookingId);

            entity.Property(e => e.CustomerName)
                .HasMaxLength(150);

            entity.Property(e => e.CustomerPhone)
                .HasMaxLength(20);

            entity.Property(e => e.PricePerPerson)
                .HasColumnType("decimal(10, 2)");

            entity.Property(e => e.TotalAmount)
                .HasColumnType("decimal(10, 2)");

            entity.Property(e => e.RefundAmount)
                .HasColumnType("decimal(10, 2)");

            entity.Property(e => e.BookingStatus)
                .HasMaxLength(50);

            entity.Property(e => e.CreatedOn)
                .HasDefaultValueSql("(sysdatetime())");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
