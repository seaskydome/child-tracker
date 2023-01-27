import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

// get a user from the session ( ifthere is one!)
// this syntax is so cool it checks if u have auth
// first then continues on to the endpoint
router.get("/", requiresAuth, UserController.getAuthenticatedUser);

// post to create user
router.post("/signup", UserController.signUp);

// post to login
router.post("/login", UserController.login);

// post to logout 
// we arent sending anything but post is probably
// more appropriate cuz we are changing things in
// the backend
router.post("/logout", UserController.logout);


export default router;