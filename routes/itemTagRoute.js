import Express from "express";

import {
  getAllItemTags,
  getItemTagById,
  createItemTag,
  updateItemTag,
  deleteItemTag
} from "../controllers/itemTagController.js"

const itemTagRouter = Express.Router();

// Define your routes here
itemTagRouter.get('/', getAllItemTags);
itemTagRouter.get('/:id', getItemTagById);
itemTagRouter.post('/', createItemTag);
itemTagRouter.put('/:id', updateItemTag);
itemTagRouter.delete('/:id', deleteItemTag);

export default itemTagRouter;