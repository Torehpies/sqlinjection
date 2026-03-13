import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors({
	origin: [
		'http://localhost:5173'
	],
	methods: ['GET', 'POST'],
}));
app.use(json());
import authRoutes from './routes/auth';
app.use('/login', authRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
