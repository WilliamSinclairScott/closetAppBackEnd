import mongoose from "mongoose";
import closetItem from "./closetItemModel.js";

const itemTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  closetItems: [{
    type: mongoose.Types.ObjectId,
    ref: 'closetItem',
    strictPopulate: false
  }]
});

itemTagSchema.pre('save', async function(next) {
  try {
    // Ensure all itemTags are up to date
    const closetItems = await closetItem.find({ _id: { $in: this.itemsTags } }).select('_id');
    this.itemsTags = closetItems.map(tag => tag._id);
    next();
  } catch (error) {
    next(error);
  }
});


const ItemTag = mongoose.model('itemTag', itemTagSchema);

export default ItemTag;