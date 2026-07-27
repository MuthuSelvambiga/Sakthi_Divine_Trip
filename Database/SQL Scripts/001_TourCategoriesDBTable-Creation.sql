CREATE TABLE Categories
(
    CategoryId INT IDENTITY(1,1)
        CONSTRAINT PK_Categories PRIMARY KEY,

    CategoryName NVARCHAR(100) NOT NULL
        CONSTRAINT UQ_Categories_CategoryName UNIQUE,

    DisplayOrder INT NOT NULL
        CONSTRAINT DF_Categories_DisplayOrder DEFAULT 1,

    IsActive BIT NOT NULL
        CONSTRAINT DF_Categories_IsActive DEFAULT 1,

    CreatedOn DATETIME2 NOT NULL
        CONSTRAINT DF_Categories_CreatedOn DEFAULT SYSDATETIME(),

    UpdatedOn DATETIME2 NULL
);