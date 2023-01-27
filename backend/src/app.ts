// this folder contains setting up the express app
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import childrenRoutes from "./routes/children";
import userRoutes from "./routes/users"
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

const app = express();

app.use(morgan("dev"));

// sets up express so that we can send json to the server
app.use(express.json());

app.use(session({
  // key to identify the user session, stored in the browser
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // the real cookei that will be stored
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
  // as long as the user is using the site the cookie will 
  // refresh automagically
  rolling: true,
  // basically this is where we store the sessions.
  // if we dont declare anything then it will be stored in the server
  // and everyone will be logged out when the server restarts!
  // so instead we store it in the mongo store!!
  store: MongoStore.create({
    mongoUrl: env.MONGO_CONNECTION_STRING
  })
}))

// routes to children // you need to be logged in to access!
app.use("/api/children", requiresAuth, childrenRoutes)
// routes to users
app.use("/api/users", userRoutes);

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