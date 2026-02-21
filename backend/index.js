import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import router from './routes/authRoutes.js';
import protect from './middleware/authMiddleware.js';
import songRouter from './routes/songRoutes.js';

dotenv.config('.env');
const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());

// connect your database
connectDB();

app.use(
  cors({
    // '*' for access to all
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use('/api/songs', songRouter);
app.use('/api/auth', router);

app.listen(PORT, () => console.log(`Server is runnign on Port ${PORT}`));
