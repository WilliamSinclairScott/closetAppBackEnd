import Express from "express";

import {
  getAllItemTags,
  getItemTagById,
  getItemTagByName,
  createItemTag,
  updateItemTag,
  deleteItemTag
} from "../controllers/itemTagController.js"
import { isUserLoggedIn } from "../utils/auth.js"

const itemTagRouter = Express.Router();

// Define your routes here
itemTagRouter.get('/', getAllItemTags);
itemTagRouter.get('/:id', getItemTagById);
itemTagRouter.get('/name/:name', getItemTagByName);
itemTagRouter.post('/', isUserLoggedIn, createItemTag);
itemTagRouter.patch('/:id', isUserLoggedIn, updateItemTag);
itemTagRouter.delete('/:id', isUserLoggedIn, deleteItemTag);

export default itemTagRouter;