// this folder is for middleware
// middleware is basically just request handlers

import { RequestHandler } from "express";
import createHttpError from "http-errors";

// we use this to protect all endpoints
// where we need the user to be authed
export const requiresAuth: RequestHandler = (req, res, next) => {
  if(req.session.userId) {
    // if ur logged in, forward the req and the res 
    // to the next middleware
    next();
  } else {
    next(createHttpError(401, "User not authenticated"));
  }
}