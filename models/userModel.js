import mongoose from "mongoose";
import closetItem from "./closetItemModel.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userID:{
    type: String,
    required : true,
  },
  closetItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'closetItem',
    strictPopulate: false
  }]
})

userSchema.pre('save', async function(next) {
  try {
    // Ensure all closetItems are up to date
    const closetItems = await closetItem.find({ _id: { $in: this.userSchemas } }).select('_id');
    this.userSchemas = closetItems.map(tag => tag._id);
    next();
  } catch (error) {
    next(error);
  }
});

const UserSchema = mongoose.model('user', userSchema);

export default UserSchema;