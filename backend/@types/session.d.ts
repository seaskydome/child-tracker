// type definition file to help TS recognize variables
import mongoose from "mongoose";

// we are adding the userId type to our session
declare module "express-session" {
  interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}