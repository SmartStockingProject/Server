import express from "express";
import userRouter from "./routes/user.router";
import stockItemRouter from "./routes/stockItem.router";
import { errorHandler } from "./middlewares/errorHandler";
import inventoryReportRouter from './routes/inventoryReport.router';

const app = express();

// app.get('/', (req: any, res: any) => {
//   res.send("hello to smart stocking");
// });

// Middlewares
app.use(express.json());

// Routes
app.use("/api", userRouter);
app.use("/api", stockItemRouter);
app.use('/api', inventoryReportRouter);
// Error Handling Middleware
app.use(errorHandler);

export default app;
