import express from "express";
import userRouter from "./routes/user.router";
import stockItemRouter from "./routes/stockItem.router";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

// app.get('/', (req: any, res: any) => {
//   res.send("hello to smart stocking");
// });

// Middlewares
app.use(express.json());

// Routes
app.use("/api", userRouter);
app.use("/api", stockItemRouter);

// Error Handling Middleware
app.use(errorHandler);

export default app;
