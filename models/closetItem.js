const mongoose = require('mongoose');

const closetItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  itemsTag: {
    type: [String],
    required: true
  },
  picture: {
    type: String,
    required: true
  }
});

const ClosetItem = mongoose.model('ClosetItem', closetItemSchema);

export default ClosetItem;