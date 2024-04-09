import itemTag from '../models/itemTag.js';

export const getAllItemTags = async (req, res) => {
  try {
    const itemTags = await itemTag.find().populate('closetItem');
    res.json(itemTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getItemTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const itemTag = await itemTag.findById(id).populate('closetItem');
    if (itemTag) {
      res.json(itemTag);
    } else {
      res.status(404).json({ message: 'ItemTag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createItemTag = async (req, res) => {
  const itemTag = new itemTag(req.body);
  try {
    const newItemTag = await itemTag.save();
    res.status(201).json(newItemTag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateItemTag = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItemTag = await itemTag.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedItemTag) {
      res.json(updatedItemTag);
    } else {
      res.status(404).json({ message: 'ItemTag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteItemTag = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItemTag = await itemTag.findByIdAndDelete(id);
    if (deletedItemTag) {
      res.json({ message: 'ItemTag deleted' });
    } else {
      res.status(404).json({ message: 'ItemTag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}