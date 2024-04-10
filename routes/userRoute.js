import Express from "express";

import {
  getAllusers,
  getuser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js"

const userRouter = Express.Router();

userRouter.get("/", getAllusers);
userRouter.get("/:id", getuser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;