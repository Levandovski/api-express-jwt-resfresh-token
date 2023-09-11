import "express-async-errors";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
      status: "Error",
      message: error.message,
    });
  }
);

app.listen(process.env.PORT_SYSTEM, () =>
  console.log(`Server is running ${process.env.PORT_SYSTEM}`)
);
