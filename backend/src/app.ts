import express from 'express';
import jokeRoutes from './routes/jokeRoutes';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
// import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jokes', jokeRoutes);
app.use('/api/users', userRoutes);

// Global error handler (should be after routes)
// app.use(errorHandler);

export default app;
