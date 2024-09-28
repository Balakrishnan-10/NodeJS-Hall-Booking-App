import { format } from "date-fns";

// create a local object for rooms :

const rooms = [
    {
      Room_Id: "1",
      RoomName : "Single room",
      Room_status: "Available",
      SeatsAvailable: 5,
      Amenities: "TV,Heater,AC",
      PricePerHour: 700,
    },
    {
       Room_Id: "2",
       RoomName : "Delux room", 
       Room_status: "Available",
      SeatsAvailable: 4, 
      Amenities: "TV,AC",
       PricePerHour: 1000, 
      },
    {
      Room_Id: "3",
      RoomName : "Junior suite room",
      Room_status: "Available",
      SeatsAvailable: 2,
      Amenities: "Heater,AC",
      PricePerHour: 1200,
    }
  ];

const Bookings = [];

// 1. GET method , View all room details :
export const roomDetails = (req,res) => {
    res.status(200).json({ message: "All Room Details",Data:rooms});
}

// 2. POST method , Create a room function :

export const CreateRoom = (req, res) => {
    const {RoomName,Room_status, SeatsAvailable, Amenities, PricePerHour } = req.body;
    const NewRoom = {
      Room_Id: rooms.length + 1,
      RoomName:RoomName,
      Room_status:Room_status,
      SeatsAvailable:SeatsAvailable,
      Amenities:Amenities,
      PricePerHour:PricePerHour
    };
    rooms.push(NewRoom);
    res.status(200).json({ message: "Room Created Successfully", Data: NewRoom });
  };

// 3. POST method , Booking a room :

export const bookRoom = (req,res) => {
  let {Customer_Name,Starting_Time,Ending_time,Room_Id} = req.body;
  // console.log(req.body);
  let date = format(new Date(), "dd-MM-yyyy");
  let room = rooms.filter((e) => e.Room_status === "Available" && e.Room_Id === Room_Id);
  if (!room) {
    res.status(400).json({message:"Room  is not Availble"});
    return;
  } else {
    let booking = {
      Customer_Name,Starting_Time,Ending_time,Room_Id,
      Date : date,
      Booking_id : Bookings.length + 1,
      Booking_date : new Date(),
      Status : "Booked"
    };
    Bookings.push(booking);
    res.status(200).json({message:"Room booked Successfully",BookingRoom:Bookings})
  }
};

// 4. GET method , List all rooms with booked data :

export const bookedRoom = (req,res) => {
  let roomList = rooms.map((room) => {
    let booking = Bookings.find((book1) => book1.Room_Id === room.Room_Id)
    return {
      RoomName : room.RoomName,
      BookedStatus : booking ? "Booked" : "Available",
      Customer_Name : booking ? booking.Customer_Name : null,
      Date :booking ? booking.Date : null,
      Starting_Time :  booking ? booking.Starting_Time : null,
      Ending_time :  booking ? booking.Ending_time : null,
    }
  })
  res.status(200).json({message:"List all rooms with booked data",roomList})
}

// 5. GET method , List all customer with booked data :

export const customerData = (req,res) => {
  const customerList = Bookings.map((booking) =>{
    const room = rooms.find((e) => e.Room_Id === booking.Room_Id);
    return {
      Customer_Name : booking.Customer_Name,
      RoomName : room ? room.RoomName : null,
      Date : booking.Date,
      Starting_Time : booking.Starting_Time,
      Ending_time : booking.Ending_time 
    }
  })
  res.status(200).json({message : "List all customer with booked data",customerList })
}
 
// 6. GET method , No.of times booking a room :

export const bookCount = (req,res) => {
  const {Customer_Name} = req.body;
  const customerBooking = Bookings.filter((e) => {
   // console.log("Booking Customer Name :", e.Customer_Name);
    return e.Customer_Name === Customer_Name;
  })
  //console.log("Customer Booking :", customerBooking);
  res.status(200).json({message:"Successfully fetched",Customer_Name,
    Booking_Count:Bookings.length,
    bookings:Bookings
  })
}
 





















