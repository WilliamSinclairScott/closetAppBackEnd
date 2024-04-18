import mongoose from "mongoose";
import itemTag from "./itemTagModel.js";

const closetItemSchema = new mongoose.Schema({
  madeby: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  itemTags: [{
    type: mongoose.Types.ObjectId,
    ref: 'itemTag',
    strictPopulate: false
  }],
  picture: {
    type: String,
    required: true
  }
});

closetItemSchema.pre('save', async function(next) {
  try {
    // Ensure all itemTags are up to date
    const itemTags = await itemTag.find({ _id: { $in: this.closetItems } }).select('_id');
    this.closetItems = itemTags.map(tag => tag._id);
    next();
  } catch (error) {
    next(error);
  }
});

const closetItem = mongoose.model('closetItem', closetItemSchema);

export default closetItem;