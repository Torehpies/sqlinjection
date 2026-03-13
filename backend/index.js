import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const origins = process.env.CORS_ORIGINS.split(',');
app.use(cors({
	origin: origins,
	methods: ['GET', 'POST', 'OPTIONS'],
}));
app.use(json());
import authRoutes from './routes/auth.js';
app.use('/login', authRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
