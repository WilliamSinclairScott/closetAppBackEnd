import itemTagModel from '../models/itemTagModel.js';

export const getAllItemTags = async (req, res) => {
  try {
    const itemTags = await itemTagModel.find().populate('closetItems');
    res.json(itemTags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getItemTag = async (req, res) => {
  try {
    const { id } = req.params;
    const itemTag = await itemTagModel.findById(id).populate('closetItems');
    if (itemTag) {
      res.json(itemTag);
    } else {
      res.status(404).json({ message: 'ItemTag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getItemTagByName = async (req, res) => {
  try {
    const { name } = req.params;
    const itemTag = await itemTagModel.findOne({ name }).populate('closetItems');
    if (itemTag) {
      res.json(itemTag);
    } else {
      res.status(404).json({ message: 'ItemTag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


//TODO: If it exsists, add the itemTag to the user's associatedTags if it isn't there already
export const createItemTag = async (req, res) => {
  const { name } = req.body;
  try {
    const existingItemTag = await itemTagModel.findOne({ name });
    if (existingItemTag) {
      res.status(400).json({ message: 'ItemTag with the same name already exists' });
      //: Add the itemTag to the user's associatedTags if it isn't there already
      res.status(200).json(existingItemTag);
    } else {
      const newItemTag = new itemTagModel(req.body);
      const createdItemTag = await newItemTag.save();
      res.status(201).json(createdItemTag);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//!!: This should never be done as a user, but as an admin 
export const updateItemTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { closetItems } = req.body;
    const updatedItemTag = await itemTagModel.findByIdAndUpdate(
      id,
      { $addToSet: { closetItems: closetItems} },
      { new: true, runValidators: true }
      ).populate('closetItems')
    if (updatedItemTag) {
      res.json(updatedItemTag);
    } else {
      res.status(404).json({ message: 'ItemTag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


//TODO: If an admin, delete the itemTag from all users associatedTags, if user, remove it from associatedTags
export const deleteItemTag = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItemTag = await itemTagModel.findByIdAndDelete(id);
    if (deletedItemTag) {
      res.json({ message: 'ItemTag deleted' });
    } else {
      res.status(404).json({ message: 'ItemTag not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

