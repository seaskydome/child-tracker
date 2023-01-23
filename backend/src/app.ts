// this folder contains setting up the express app
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import ChildModel from "./models/child";

const app = express();

// these app.use or app.get things are called middleware,
// they handle events for us. u can read more about it on
// the express documentation

// server endpoint
// get request, get data from the server i guess.
app.get("/", async (req, res, next) => {
  try {
    // throw Error("BAZINGFA!");

    // execute the find operation, and return a promise.
    // basically get the data from the ChildModel
    const children = await ChildModel.find().exec();
    // set the status to 200 (OK) then send a JSON to the frontend
    res.status(200).json(children);
  } catch (error) {
    next(error); // forward to error handler function
  }
});

// we get to this middleware  when we access an endpoint we havent set up
app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

// express error handler, has to be at the bottom
// error handler MUST take EXACTLY these four args
// basically this handles errors so we dont need to type out at every catch
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    // set status to 500 (server error) and send message to frontend!
    res.status(500).json({ error: errorMessage });
  }
);

export default app;
