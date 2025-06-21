import express, { Request, Response } from 'express';
import cors from 'cors';
import waitlistRoutes from './routes/waitlistRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'https://studyintel.app' }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Backend running successfully.');
});

app.use('/waitlist', waitlistRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
