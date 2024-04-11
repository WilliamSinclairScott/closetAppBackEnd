import Express from "express";

import {
  getAllItemTags,
  getItemTagById,
  getItemTagByName,
  createItemTag,
  updateItemTag,
  deleteItemTag
} from "../controllers/itemTagController.js"

const itemTagRouter = Express.Router();

// Define your routes here
itemTagRouter.get('/', getAllItemTags);
itemTagRouter.get('/:id', getItemTagById);
itemTagRouter.get('/name/:name', getItemTagByName);
itemTagRouter.post('/', createItemTag);
itemTagRouter.put('/:id', updateItemTag);
itemTagRouter.delete('/:id', deleteItemTag);

export default itemTagRouter;