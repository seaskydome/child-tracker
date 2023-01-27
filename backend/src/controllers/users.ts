import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

// this is how we get the currently logged in user from the session
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.session.userId).select("+email").exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// everything is optional because we don't actually know
// if the user sent this data, so we have to be safe
interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

// signup endpoint
export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  // for security reasons, we should never
  // store the password in plain text
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw)
      throw createHttpError(400, "Parameters missing");

    // we are searching if a username exists already in the database (no dupes)
    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();
    if (existingUsername)
      throw createHttpError(
        409,
        "Username already taken, Please choose a different one or log in instead."
      );
    // same here with email
    const existingEmail = await UserModel.findOne({ email: email }).exec();
    if (existingEmail)
      throw createHttpError(
        409,
        "A user with this email already exists. Please log in instead."
      );

    // this is how we hash the password
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    // this is storing the userId in the session i guess
    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters Missing");
    }

    const user = await UserModel.findOne({ username: username })
    // the select that we appened allows us to get this data
    // (cuz we dont by default remember)
      .select("+password +email")
      .exec();

    if(!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    // bcrypt compares the hashed and unhashed passwords
    // and can tell us if they match
    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  // will attempt to destroy the session, returns an
  // error in the callback if something goes wrong
  req.session.destroy(error => {
    if(error){
      next(error);
    } else {
      res.sendStatus(200);
    }
  })
}
