import mongoose from "mongoose";
import closetItem from "./closetItemModel.js";
import itemTag from "./itemTagModel.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required : true,
  },
  closetItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'closetItem',
    strictPopulate: false
  }],
  associatedTags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'itemTag',
    strictPopulate: false
  }]
})

userSchema.pre('save', async function(next) {
  try {
    // Ensure all closetItems are up to date
    const closetItems = await closetItem.find({ _id: { $in: this.userSchemas } }).select('_id');
    this.userSchemas = closetItems.map(tag => tag._id);

    const associatedTags = await itemTag.find({ _id: { $in: this.associatedTags } }).select('_id');
    this.associatedTags = associatedTags.map(tag => tag._id);
    next();
  } catch (error) {
    next(error);
  }
});

const UserSchema = mongoose.model('user', userSchema);

export default UserSchema;