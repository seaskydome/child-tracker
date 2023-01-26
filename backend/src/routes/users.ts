import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

// get a user from the session ( ifthere is one!)
router.get("/", UserController.getAuthenticatedUser);

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