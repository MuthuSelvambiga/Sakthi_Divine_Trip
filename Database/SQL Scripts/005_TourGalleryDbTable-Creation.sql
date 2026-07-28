CREATE TABLE TourGallery
(
    GalleryId INT IDENTITY(1,1)
        CONSTRAINT PK_TourGallery PRIMARY KEY,

    TourId INT NOT NULL,

    ImageTitle NVARCHAR(200) NULL,

    ImagePath NVARCHAR(500) NOT NULL,

    DisplayOrder INT NOT NULL
        CONSTRAINT DF_TourGallery_DisplayOrder DEFAULT 1,

    IsCoverImage BIT NOT NULL
        CONSTRAINT DF_TourGallery_IsCoverImage DEFAULT 0,

    IsActive BIT NOT NULL
        CONSTRAINT DF_TourGallery_IsActive DEFAULT 1,

    CreatedOn DATETIME2 NOT NULL
        CONSTRAINT DF_TourGallery_CreatedOn DEFAULT SYSDATETIME(),

    UpdatedOn DATETIME2 NULL,

    CONSTRAINT FK_TourGallery_Tours
        FOREIGN KEY (TourId)
        REFERENCES Tours(TourId)
);