import express from 'express';
import cors from 'cors';
import roomRouter from './Routers/RoomRouter.js'


const app = express();
const PORT = 4000;
app.use(express.json())
app.use(cors());

// Rooms Routes :
app.use('/api',roomRouter)



// Default Route :
 app.get('/', (req,res) => {
    res.status(200).send("Hall Booking API running successfully!!!")
 })

app.listen(PORT, () => {
    console.log("Hall booking App is running successfully!!!")
})