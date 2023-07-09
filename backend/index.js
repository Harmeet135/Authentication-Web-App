import express from "express";
import connectDB from "./config/db.js";
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from './routes/UserRoutes.js';


dotenv.config();

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());

connectDB(DATABASE_URL);

app.use(express.json());

app.use('/api/user', UserRoutes);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
    }
);