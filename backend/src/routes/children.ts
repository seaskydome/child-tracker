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

// patch request is used whenever you want to update a resource
router.patch("/:childId", ChildrenController.updateChild);

// delete request, pretty self explanatory
router.delete("/:childId", ChildrenController.deleteChild);

export default router;