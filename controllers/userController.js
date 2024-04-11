import userModel from '../models/userModel.js'

export const getAllusers = async (req, res) => {
  try {
    const users = await userModel.find().populate('closetItems')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getuser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userModel.findById(id).populate('closetItems')
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'user not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findOne({ userID }).populate('closetItems');
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

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const updateUserByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const updatedUser = await userModel.findOneAndUpdate(
      { name: userID },
      { $addToSet: { closetItems: req.body.closetItems } },
      { new: true }
      ).populate('closetItems')
      
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

