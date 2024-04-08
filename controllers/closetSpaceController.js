// Import necessary modules or dependencies
import ClosetSpace from '../models/closetSpaceModel';
// Controller function to get all closet spaces
export const getAllClosetSpaces = async (req, res) => {
  try {
    const closetSpaces = await ClosetSpace.find();
    res.json(closetSpaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a single closet space
export const getClosetSpace = async (req, res) => {
  try {
    const { id } = req.params;
    const closetSpace = await ClosetSpace.findById(id);
    if (closetSpace) {
      res.json(closetSpace);
    } else {
      res.status(404).json({ message: 'ClosetSpace not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to create a new closet space
export const createClosetSpace = async (req, res) => {
  const closetSpace = new ClosetSpace(req.body);
  try {
    const newClosetSpace = await closetSpace.save();
    res.status(201).json(newClosetSpace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to update a closet space
export const updateClosetSpace = async (req, res) => {
  try{
    const closetSpace = await closetSpace.findByIdAndUpdate(req.params.id, req.body, { new: true})
    if (closetSpace){
        res.json(closetSpace)
    } else {
        res.status(404).json({ message: 'closetSpace not found' });
    }
}catch(error){
    res.status(500).json({ message: error.message})
}
};

// Controller function to delete a closet space
export const deleteClosetSpace = async (req, res) => {
  try {
    const { id } = req.params;
    const closetSpace = await ClosetSpace.findByIdAndDelete(id);
    if (closetSpace) {
      res.json({ message: 'ClosetSpace deleted successfully' });
    } else {
      res.status(404).json({ message: 'ClosetSpace not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
