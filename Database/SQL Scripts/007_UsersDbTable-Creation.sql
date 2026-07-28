CREATE TABLE Users
(
    UserId INT IDENTITY(1,1)
        CONSTRAINT PK_Users PRIMARY KEY,

    FullName NVARCHAR(150) NOT NULL,

    Username NVARCHAR(50) NOT NULL
        CONSTRAINT UQ_Users_Username UNIQUE,

    Email NVARCHAR(150) NOT NULL
        CONSTRAINT UQ_Users_Email UNIQUE,

    PasswordHash NVARCHAR(500) NOT NULL,

    Role NVARCHAR(20) NOT NULL
        CONSTRAINT CK_Users_Role
        CHECK (Role IN ('Admin','Staff')),

    IsActive BIT NOT NULL
        CONSTRAINT DF_Users_IsActive DEFAULT 1,

    LastLogin DATETIME2 NULL,

    CreatedOn DATETIME2 NOT NULL
        CONSTRAINT DF_Users_CreatedOn DEFAULT SYSDATETIME(),

    UpdatedOn DATETIME2 NULL
);