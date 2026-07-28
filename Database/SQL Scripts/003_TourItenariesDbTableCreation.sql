CREATE TABLE TourItineraries
(
    ItineraryId INT IDENTITY(1,1)
        CONSTRAINT PK_TourItineraries PRIMARY KEY,

    TourId INT NOT NULL,

    SequenceNo INT NOT NULL
        CONSTRAINT CK_TourItineraries_SequenceNo
        CHECK (SequenceNo > 0),

    EventTime TIME NULL,

    ActivityType NVARCHAR(50) NOT NULL,

    Title NVARCHAR(150) NOT NULL,

    Description NVARCHAR(500) NULL,

    CreatedOn DATETIME2 NOT NULL
        CONSTRAINT DF_TourItineraries_CreatedOn
        DEFAULT SYSDATETIME(),

    CONSTRAINT FK_TourItineraries_Tours
        FOREIGN KEY (TourId)
        REFERENCES Tours(TourId)
);