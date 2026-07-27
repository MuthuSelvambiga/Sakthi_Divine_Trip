create table TourPickupPoints
(
PickupPointId int identity(1,1) constraint PK_TourPickupPoints Primary key,
TourId int not null,
PickupLocation nvarchar(150) not null,
PickupTime Time Not null,
DisplayOrder int not null constraint DF_TourPickupPoints_DisplayOrder Default 1,
CreatedOn Datetime2 not null constraint DF_TourPickupPoints_CreatedOn default sysdatetime(),
constraint FK_TourPickupPoints_Tours Foreign key(TourId) references Tours(TourId)
);

select * from TourPickupPoints;

insert into TourPickupPoints(TourId,PickupLocation,PickupTime,DisplayOrder)
values
(1,'Koyambedu Omni Bus Stand','06:00',1),
(1,'Vadapalani','06:20',2),
(1,'Guindy','06:40',3);