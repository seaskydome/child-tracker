import express from "express";
import * as ChildrenController from "../controllers/children";

// create endpoints on the router, then give the router to the app
const router = express.Router()

// server endpoint
// http get request, get data from the server i guess.
router.get("/", ChildrenController.getChildren);

// the :childId is like a variable, which means that whatever is put
// there will be read and returned
router.get("/:childId", ChildrenController.getChild)

// http post request, send data to the server
router.post("/", ChildrenController.createChild);

export default router;