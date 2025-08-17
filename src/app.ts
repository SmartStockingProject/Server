import express from 'express';
import userRouter from './routes/user.ruoter';

const app = express();

// app.get('/', (req: any, res: any) => {
//   res.send("hello to smart stocking");
// });

// Middlewares
app.use(express.json());

// Routes
app.use('/api', userRouter);

// // Error Handling Middleware
// app.use(errorHandler);

export default app;