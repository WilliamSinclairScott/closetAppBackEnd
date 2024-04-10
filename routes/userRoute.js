import Express from "express";

import {
  getAllusers,
  getuser,
  getUserByUserID,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js"

const userRouter = Express.Router();

userRouter.get("/", getAllusers);
userRouter.get("/:id", getuser);
userRouter.get("/userID/:userID", getUserByUserID);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;