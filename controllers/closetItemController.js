// Import necessary modules or dependencies
import ClosetItem from '../models/closetItemModel.js';
// Controller function to get all closet items
export const getAllClosetItems = async (req, res) => {
  try {
    const closetItems = await ClosetItem.find();
    res.json(closetItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a single closet item
export const getClosetItem = async (req, res) => {
  try {
    const { id } = req.params;
    const closetItem = await ClosetItem.findById(id);
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
  const closetItem = new ClosetItem(req.body);
  try {
    const newClosetItem = await closetItem.save();
    res.status(201).json(newClosetItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    const closetItem = await ClosetItem.findByIdAndDelete(id);
    if (closetItem) {
      res.json({ message: 'ClosetItem deleted successfully' });
    } else {
      res.status(404).json({ message: 'ClosetItem not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
