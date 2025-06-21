import express from 'express';
import cors from 'cors';
import waitlistRoutes from './routes/waitlistRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/waitlist', waitlistRoutes);
