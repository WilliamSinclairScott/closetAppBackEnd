import Express from "express";

import {
  getAllUsers,
  getUser,
  //createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js"
import {signup, login, logout } from "../controllers/authController.js"
import { isUserLoggedIn } from "../utils/auth.js"
const userRouter = Express.Router();

//Get routes
userRouter.get("/",isUserLoggedIn ,getAllUsers);
userRouter.get("/:_id", isUserLoggedIn,getUser);
//userRouter.post("/", createUser);

//Auth routes
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

//Update and delete routes
userRouter.patch("/:_id",isUserLoggedIn, updateUser);
userRouter.delete("/:_id", isUserLoggedIn, deleteUser);

export default userRouter;