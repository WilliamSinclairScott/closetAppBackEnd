import mongoose from "mongoose";

const closetSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  TypesTag: {
    type: [String]
  },
  itemsTag: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'closetItem'
  }]
});

const ClosetSpace = mongoose.model('closetSpace', closetSpaceSchema);

export default ClosetSpace;