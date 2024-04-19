import Express from "express";

import {
  getAllClosetItems,
  getClosetItem,
  createClosetItem,
  updateClosetItem,
  deleteClosetItem
} from "../controllers/closetItemController.js"

import { isUserLoggedIn } from "../utils/auth.js"
const closetItemRouter = Express.Router();

closetItemRouter.get("/", getAllClosetItems);
closetItemRouter.get("/:id", getClosetItem);
closetItemRouter.post("/", isUserLoggedIn, createClosetItem);
closetItemRouter.patch("/:id", isUserLoggedIn, updateClosetItem);
closetItemRouter.delete("/:id", isUserLoggedIn, deleteClosetItem);

export default closetItemRouter;