import userModel from '../models/userModel.js'

//Do not implement this function, for testing purposes only
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate('closetItems');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate('closetItems');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//new user creation, no need to populate closetItems or associatedTags
export const createUser = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//TODO: make sure that associatedTags get updated when new closetItem is added.
export const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const closetItems = req.body.closetItems
    console.log(closetItems)
    const closetItemTags = req.body.closetItemTags
    const updatedUser = await userModel.findOneAndUpdate(
      //find user by id
      { _id: _id },
      //add to set to avoid duplicates
      { $addToSet: { closetItems: closetItems} },
      //add to set to avoid duplicates
      { $addToSet: { associatedTags: closetItemTags}},
      { new: true, runValidators: true }
      ).populate('closetItems')
      //!!this might be wrong, check if it works
      .populate('associatedTags')
      console.log(updatedUser)
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//TODO: remove all closetItems that were made by the user.
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

