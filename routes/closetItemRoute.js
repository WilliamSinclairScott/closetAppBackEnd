import Express from "express";

import {
  getAllClosetItems,
  getClosetItem,
  createClosetItem,
  updateClosetItem,
  deleteClosetItem
} from "../controllers/closetItemController.js"

const closetItemRouter = Express.Router();

closetItemRouter.get("/", getAllClosetItems);
closetItemRouter.get("/:id", getClosetItem);
closetItemRouter.post("/", createClosetItem);
closetItemRouter.put("/:id", updateClosetItem);
closetItemRouter.delete("/:id", deleteClosetItem);

export default closetItemRouter;