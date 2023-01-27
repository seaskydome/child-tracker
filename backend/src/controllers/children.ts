import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import ChildModel from "../models/child";
import { assertIsDefined } from "../util/assertIsDefined";

// this file contains controllers for each route. basically
// what happens when u get to a route
export const getChildren: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    // this is all typescript needs to know that the var is defined!
    assertIsDefined(authenticatedUserId);
    // execute the find operation, and return a promise.
    // basically get the data from the ChildModel
    const children = await ChildModel.find({
      userId: authenticatedUserId,
    }).exec();
    // set the status to 200 (OK) then send a JSON to the frontend
    res.status(200).json(children);
  } catch (error) {
    next(error); // forward to error handler function
  }
};

export const getChild: RequestHandler = async (req, res, next) => {
  // params are the variables we put in the URL
  const childId = req.params.childId;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    // check if id is valid
    if (!mongoose.isValidObjectId(childId))
      throw createHttpError(400, "Invalid child id");

    const child = await ChildModel.findById(childId).exec();
    // throw error if there is nothing at the id
    if (!child) throw createHttpError(404, "Child not found");

    // throw error of child's userId doesnt match auth id
    if (!child.userId.equals(authenticatedUserId)) 
      throw createHttpError(401, "You cannot access this child")
    

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
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);
    // 400 is bad request (when an argument is missing)
    if (!name) throw createHttpError(400, "Child must have a name");

    const newChild = await ChildModel.create({
      userId: authenticatedUserId,
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

interface UpdateChildParams {
  childId: string;
}

interface UpdateChildBody {
  name?: string;
  gender?: string;
  age?: number;
}

export const updateChild: RequestHandler<
  UpdateChildParams,
  unknown,
  UpdateChildBody,
  unknown
> = async (req, res, next) => {
  const childId = req.params.childId;

  const newName = req.body.name;
  const newGender = req.body.gender;
  const newAge = req.body.age;

  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);
    // check if id is valid
    if (!mongoose.isValidObjectId(childId))
      throw createHttpError(400, "Invalid child id");

    if (!newName) throw createHttpError(400, "Child must have a name");

    const child = await ChildModel.findById(childId).exec();

    if (!child) throw createHttpError(404, "Child not found");

    if (!child.userId.equals(authenticatedUserId)) 
      throw createHttpError(401, "You cannot access this child")

    child.name = newName;
    child.gender = newGender;
    child.age = newAge;

    // child.save() saves the chagnes we made to the object
    const updatedChild = await child.save();

    res.status(200).json(updatedChild);
  } catch (error) {
    next(error);
  }
};

export const deleteChild: RequestHandler = async (req, res, next) => {
  const childId = req.params.childId;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(childId))
      throw createHttpError(400, "Invalid child id");

    const child = await ChildModel.findById(childId).exec();

    if (!child) throw createHttpError(404, "Child not found");
    
    if (!child.userId.equals(authenticatedUserId)) 
      throw createHttpError(401, "You cannot access this child")

    await child.remove();

    // 204 deletion successful. we use sendStatus because we dont
    // need to send any data back, we are just sending the status
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
