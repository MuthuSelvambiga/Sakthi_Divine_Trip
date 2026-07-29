CREATE TABLE WebsiteSettings
(
    SettingId INT IDENTITY(1,1)
        CONSTRAINT PK_WebsiteSettings PRIMARY KEY,

    WebsiteName NVARCHAR(200) NOT NULL,

    Tagline NVARCHAR(250) NULL,

    LogoPath NVARCHAR(500) NULL,

    FaviconPath NVARCHAR(500) NULL,

    HomeBannerTitle NVARCHAR(250) NULL,

    HomeBannerSubtitle NVARCHAR(500) NULL,

    MetaTitle NVARCHAR(250) NULL,

    MetaDescription NVARCHAR(500) NULL,

    FooterText NVARCHAR(500) NULL,

    CopyrightText NVARCHAR(250) NULL,

    CreatedOn DATETIME2 NOT NULL
        CONSTRAINT DF_WebsiteSettings_CreatedOn
        DEFAULT SYSDATETIME(),

    UpdatedOn DATETIME2 NULL
);