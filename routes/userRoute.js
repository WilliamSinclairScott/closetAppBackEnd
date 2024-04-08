import Express from "express";

const userRouter = Express.Router();

import {
  getAllusers,
  getuser,
  createuser,
  updateuser,
  deleteuser
} from "../controllers/userController.js"

userRouter.get("/", getAllusers);
userRouter.get("/:id", getuser);
userRouter.post("/", createuser);
userRouter.put("/:id", updateuser);
userRouter.delete("/:id", deleteuser);

export default userRouter;