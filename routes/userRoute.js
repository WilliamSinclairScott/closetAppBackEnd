import Express from "express";

import {
  getAllUsers,
  getUser,
  //createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js"

import { isUserLoggedIn } from "../utils/auth.js"
const userRouter = Express.Router();

//Get routes
userRouter.get("/", getAllUsers);
userRouter.get("/:_id", isUserLoggedIn,getUser);
//userRouter.post("/", createUser);


//Update and delete routes
userRouter.patch("/:_id",isUserLoggedIn, updateUser);
userRouter.delete("/:_id", isUserLoggedIn, deleteUser);

export default userRouter;