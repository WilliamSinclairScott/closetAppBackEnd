import Express from "express";

import {
  getAllusers,
  getuser,
  createuser,
  updateuser,
  deleteuser
} from "../controllers/userController.js"

const userRouter = Express.Router();

userRouter.get("/", getAllusers);
userRouter.get("/:id", getuser);
userRouter.post("/", createuser);
userRouter.put("/:id", updateuser);
userRouter.delete("/:id", deleteuser);

export default userRouter;