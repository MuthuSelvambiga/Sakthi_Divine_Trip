CREATE TABLE ContactInfo
(
    ContactId INT IDENTITY(1,1)
        CONSTRAINT PK_ContactInfo PRIMARY KEY,

    CompanyName NVARCHAR(200) NOT NULL,

    Address NVARCHAR(500) NOT NULL,

    City NVARCHAR(100) NOT NULL,

    State NVARCHAR(100) NOT NULL,

    Pincode NVARCHAR(10) NOT NULL,

    MobileNumber NVARCHAR(20) NOT NULL,

    WhatsAppNumber NVARCHAR(20) NULL,

    Email NVARCHAR(150) NOT NULL,

    GoogleMapUrl NVARCHAR(1000) NULL,

    FacebookUrl NVARCHAR(500) NULL,

    InstagramUrl NVARCHAR(500) NULL,

    YouTubeUrl NVARCHAR(500) NULL,

    CreatedOn DATETIME2 NOT NULL
        CONSTRAINT DF_ContactInfo_CreatedOn
        DEFAULT SYSDATETIME(),

    UpdatedOn DATETIME2 NULL
);


INSERT INTO ContactInfo
(
    CompanyName,
    Address,
    City,
    State,
    Pincode,
    MobileNumber,
    WhatsAppNumber,
    Email,
    GoogleMapUrl,
    FacebookUrl,
    InstagramUrl,
    YouTubeUrl
)
VALUES
(
    'Shakthi Divine Trip',
    '10, Umapathy Nagar, Vinayakapuram, Madhavaram',
    'Chennai',
    'Tamil Nadu',
    '600099',
    '+91 95660 09530',
    '+91 95660 09530',
    null,
    null,
    Null,
    NULL,
    NULL
);