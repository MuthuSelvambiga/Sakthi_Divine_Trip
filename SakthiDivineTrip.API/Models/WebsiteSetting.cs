using System;
using System.Collections.Generic;

namespace SakthiDivineTrip.API.Models;

public partial class WebsiteSetting
{
    public int SettingId { get; set; }

    public string WebsiteName { get; set; } = null!;

    public string? Tagline { get; set; }

    public string? LogoPath { get; set; }

    public string? FaviconPath { get; set; }

    public string? HomeBannerTitle { get; set; }

    public string? HomeBannerSubtitle { get; set; }

    public string? MetaTitle { get; set; }

    public string? MetaDescription { get; set; }

    public string? FooterText { get; set; }

    public string? CopyrightText { get; set; }

    public DateTime CreatedOn { get; set; }

    public DateTime? UpdatedOn { get; set; }
}
