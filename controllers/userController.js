import userModel from '../models/userModel.js'

//Do not implement this function, for testing purposes only
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate('closetItems').populate('associatedTags');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const user = await userModel.findById(id).populate('closetItems').populate('associatedTags');
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
    let { closetItems, associatedTags } = req.body;
    closetItems ? closetItems : [];
    associatedTags ? associatedTags : [];
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: _id },
      {
        $addToSet: {
          closetItems: closetItems,
          associatedTags: associatedTags
        }
      },
      { new: true, runValidators: true }
    ).populate('closetItems').populate('associatedTags');

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

