CREATE TABLE CustomerExperiences
(
    ExperienceId INT IDENTITY(1,1)
        CONSTRAINT PK_CustomerExperiences PRIMARY KEY,

    TourId INT NULL,

    CustomerName NVARCHAR(150) NOT NULL,

    ExperienceTitle NVARCHAR(200) NULL,

    ExperienceText NVARCHAR(MAX) NOT NULL,

    Rating TINYINT NOT NULL
        CONSTRAINT CK_CustomerExperiences_Rating
        CHECK (Rating BETWEEN 1 AND 5),

    ExperienceDate DATE NULL,

    PhotoPath NVARCHAR(500) NULL,

    VideoPath NVARCHAR(500) NULL,

    IsPublishedWithPermission BIT NOT NULL
        CONSTRAINT DF_CustomerExperiences_IsPublishedWithPermission
        DEFAULT 0,

    IsFeatured BIT NOT NULL
        CONSTRAINT DF_CustomerExperiences_IsFeatured
        DEFAULT 0,

    DisplayOrder INT NOT NULL
        CONSTRAINT DF_CustomerExperiences_DisplayOrder
        DEFAULT 1,

    IsActive BIT NOT NULL
        CONSTRAINT DF_CustomerExperiences_IsActive
        DEFAULT 1,

    CreatedOn DATETIME2 NOT NULL
        CONSTRAINT DF_CustomerExperiences_CreatedOn
        DEFAULT SYSDATETIME(),

    UpdatedOn DATETIME2 NULL,

    CONSTRAINT FK_CustomerExperiences_Tours
        FOREIGN KEY (TourId)
        REFERENCES Tours(TourId)
);