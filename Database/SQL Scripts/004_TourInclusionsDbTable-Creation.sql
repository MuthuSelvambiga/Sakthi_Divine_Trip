CREATE TABLE TourInclusions
(
    InclusionId INT IDENTITY(1,1)
        CONSTRAINT PK_TourInclusions PRIMARY KEY,

    TourId INT NOT NULL,

    InclusionText NVARCHAR(300) NOT NULL,

    DisplayOrder INT NOT NULL
        CONSTRAINT DF_TourInclusions_DisplayOrder DEFAULT 1,

    IsActive BIT NOT NULL
        CONSTRAINT DF_TourInclusions_IsActive DEFAULT 1,

    CreatedOn DATETIME2 NOT NULL
        CONSTRAINT DF_TourInclusions_CreatedOn DEFAULT SYSDATETIME(),

    UpdatedOn DATETIME2 NULL,

    CONSTRAINT FK_TourInclusions_Tours
        FOREIGN KEY (TourId)
        REFERENCES Tours(TourId)
);