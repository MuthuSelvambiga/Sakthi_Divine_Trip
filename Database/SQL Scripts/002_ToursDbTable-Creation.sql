CREATE TABLE Tours
(
    TourId INT IDENTITY(1,1)
        CONSTRAINT PK_Tours PRIMARY KEY,

    TourCode NVARCHAR(20) NOT NULL
        CONSTRAINT UQ_Tours_TourCode UNIQUE,

    CategoryId INT NOT NULL,

    TourName NVARCHAR(200) NOT NULL,

    Description NVARCHAR(MAX) NOT NULL,

    StartDate DATE NOT NULL,

    EndDate DATE NULL,

    DurationDays INT NOT NULL
        CONSTRAINT CK_Tours_Duration CHECK (DurationDays > 0),

    Price DECIMAL(10,2) NOT NULL
        CONSTRAINT CK_Tours_Price CHECK (Price >= 0),

    AvailableSeats INT NOT NULL
        CONSTRAINT CK_Tours_AvailableSeats CHECK (AvailableSeats >= 0),

    CoverImage NVARCHAR(255) NULL,

    IsActive BIT NOT NULL
        CONSTRAINT DF_Tours_IsActive DEFAULT 1,

    CreatedOn DATETIME2 NOT NULL
        CONSTRAINT DF_Tours_CreatedOn DEFAULT SYSDATETIME(),

    UpdatedOn DATETIME2 NULL,

    CONSTRAINT FK_Tours_TourCategories
        FOREIGN KEY (CategoryId)
        REFERENCES TourCategories(CategoryId)
);