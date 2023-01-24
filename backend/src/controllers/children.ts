import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import ChildModel from "../models/child";

// this file contains controllers for each route. basically
// what happens when u get to a route
export const getChildren: RequestHandler = async (req, res, next) => {
  try {
    // execute the find operation, and return a promise.
    // basically get the data from the ChildModel
    const children = await ChildModel.find().exec();
    // set the status to 200 (OK) then send a JSON to the frontend
    res.status(200).json(children);
  } catch (error) {
    next(error); // forward to error handler function
  }
};

export const getChild: RequestHandler = async (req, res, next) => {
  // params are the variables we put in the URL
  const childId = req.params.childId;

  try {
    // check if id is valid
    if (!mongoose.isValidObjectId(childId)) throw createHttpError(400, "Invalid child id")

    const child = await ChildModel.findById(childId).exec();
    // throw error if there is nothing at the id
    if(!child) throw createHttpError(404, "Child not found")

    res.status(200).json(child);
  } catch (error) {
    next(error);
  }
};

interface CreateChildBody {
  name?: string;
  gender?: string;
  age?: number;
}

// have to give types for each thing, so we give unkown
// for the ones we dont want to change so we just pass the body
export const createChild: RequestHandler<
  unknown,
  unknown,
  CreateChildBody,
  unknown
> = async (req, res, next) => {
  // data to be sent, comes from the request
  const { name, gender, age } = req.body;

  try {
    // 400 is bad request (when an argument is missing)
    if(!name) throw createHttpError(400, "Child must have a name");

    const newChild = await ChildModel.create({
      name: name,
      gender: gender,
      age: age,
    });

    // 201 (new resource created) send newChild back aswell
    res.status(201).json(newChild);
  } catch (error) {
    next(error); // forward to error handler function
  }
};
