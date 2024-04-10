// Import necessary modules or dependencies
import closetItem from '../models/closetItemModel.js';
// Controller function to get all closet items
export const getAllClosetItems = async (req, res) => {
  try {

    const closetItems = await closetItem.find().populate('itemTags');
    res.json(closetItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller function to get a single closet item
export const getClosetItem = async (req, res) => {
  try {
    const { id } = req.params;
    const closetItem = await closetItem.findById(id).populate('itemTags');
    if (closetItem) {
      res.json(closetItem);
    } else {
      res.status(404).json({ message: 'ClosetItem not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to create a new closet item
export const createClosetItem = async (req, res) => {
  const { name } = req.body;
  try {
    // Check if the item already exists by name
    const existingItem = await closetItem.findOne({ name });
    if (existingItem) {
      return res.status(400).json({ message: 'Item already exists' });
    }
    
    const ClosetItem = new closetItem(req.body);
    const newClosetItem = await ClosetItem.save();
    res.status(201).json(newClosetItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a closet item
export const updateClosetItem = async (req, res) => {
  try{
    const closetItem = await closetItem.findByIdAndUpdate(req.params.id, req.body, { new: true})
    if (closetItem){
        res.json(closetItem)
    } else {
        res.status(404).json({ message: 'closetItem not found' });
    }
}catch(error){
    res.status(500).json({ message: error.message})
}
};

// Controller function to delete a closet item
export const deleteClosetItem = async (req, res) => {
  try {
    const { id } = req.params;
    const closetItem = await closetItem.findByIdAndDelete(id);
    if (closetItem) {
      res.json({ message: 'closetItem deleted successfully' });
    } else {
      res.status(404).json({ message: 'closetItem not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
