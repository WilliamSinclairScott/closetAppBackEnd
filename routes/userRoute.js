import Express from "express";

import {
  getAllusers,
  getUserByUserID,
  createUser,
  updateUserByUserID,
  deleteUser
} from "../controllers/userController.js"

const userRouter = Express.Router();

userRouter.get("/", getAllusers);
userRouter.get("/:userID", getUserByUserID);
userRouter.post("/", createUser);
userRouter.patch("/:userID", updateUserByUserID);
userRouter.delete("/:id", deleteUser);

export default userRouter;