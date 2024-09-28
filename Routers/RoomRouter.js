import express from 'express';
import {  bookCount, bookedRoom, bookRoom, CreateRoom, customerData, roomDetails } from '../Controllers/RoomController.js';


const router = express.Router();

// 1. GET method , Get all rooms detail API :

router.get('/roomdetails',roomDetails);

// 2. POST method , Create a room function :

router.post('/createroom', CreateRoom);

// 3. POST method , Booking a room :

router.post('/createbooking',bookRoom);

// 4. GET method , List all rooms with booked data :

router.get('/bookedroom', bookedRoom);

// 5. GET method , List all customer with booked data :

router.get('/allcustomerdata',customerData)

// 6. GET method , No.of times booking a room :

router.get('/countcustomer',bookCount)
export default router;
