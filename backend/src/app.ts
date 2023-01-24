// this folder contains setting up the express app
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import childrenRoutes from "./routes/children";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

// sets up express so that we can send json to the server
app.use(express.json());

// routes with this
app.use("/api/children", childrenRoutes)

// these app.use or app.get things are called middleware,
// they handle events for us. u can read more about it on
// the express documentation

// we get to this middleware  when we access an endpoint we havent set up
app.use((req, res, next) => {
  // this create httperror takes a status code and message
  next(createHttpError(404, "Endpoint not found"));
});

// express error handler, has to be at the bottom
// error handler MUST take EXACTLY these four args
// basically this handles errors so we dont need to type out at every catch
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
      statusCode = error.status;
      errorMessage = error.message;
    }
    // set status to 500 (server error) and send message to frontend!
    res.status(statusCode).json({ error: errorMessage });
  }
);

export default app;