import Express from "express";

import {
  getAllItemTags,
  getItemTag,
  createItemTag,
  updateItemTag,
  deleteItemTag
} from "../controllers/itemTagController.js"
import { isUserLoggedIn } from "../utils/auth.js"

const itemTagRouter = Express.Router();

// Define your routes here
itemTagRouter.get('/', getAllItemTags);
itemTagRouter.get('/:id', getItemTag);
itemTagRouter.post('/', isUserLoggedIn, createItemTag);
itemTagRouter.patch('/:id', isUserLoggedIn, updateItemTag);
itemTagRouter.delete('/:id', isUserLoggedIn, deleteItemTag);

export default itemTagRouter;