import userModel from '../models/userModel.js'

export const getAllusers = async (req, res) => {
  try {
    const users = await userModel.find().populate('closetItems')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    console.log(typeof userID)
    const user = await userModel.findOne( { userID: userID } ).populate('closetItems');
    console.log(user)
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const createUser = async (req, res) => {
  const { name } = req.body;
  try {
    const existingUser = await userModel.findOne({ name });
    if (existingUser) {
      res.status(400).json({ message: 'User with the same name already exists' });
    } else {
      const newUser = new userModel(req.body);
      const createdUser = await newUser.save();
      res.status(201).json(createdUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateUserByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const closetItems = req.body.closetItems
    console.log(closetItems)
    const updatedUser = await userModel.findOneAndUpdate(
      { userID: userID },
      { $addToSet: { closetItems: closetItems} },
      { new: true, runValidators: true }
      ).populate('closetItems')
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

