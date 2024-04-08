import Express from "express";

const closetItemRouter = Express.Router();

import {
  getAllClosetItems,
  getClosetItem,
  createClosetItem,
  updateClosetItem,
  deleteClosetItem
} from "../controllers/closetItemController.js"

closetItemRouter.get("/", getAllClosetItems);
closetItemRouter.get("/:id", getClosetItem);
closetItemRouter.post("/", createClosetItem);
closetItemRouter.put("/:id", updateClosetItem);
closetItemRouter.delete("/:id", deleteClosetItem);

export default closetItemRouter;