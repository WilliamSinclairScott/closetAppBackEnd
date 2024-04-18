import Express from "express";

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js"

const userRouter = Express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:_id", getUser);
userRouter.post("/", createUser);
userRouter.patch("/:_id", updateUser);
userRouter.delete("/:_id", deleteUser);

export default userRouter;