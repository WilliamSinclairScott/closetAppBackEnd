const mongoose = require('mongoose');

const closetItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  itemsTags: [{
    type: Schema.Types.ObjectId,
    ref: 'itemTag'
  }],
  picture: {
    type: String,
    required: true
  }
});

const closetItem = mongoose.model('closetItem', closetItemSchema);

export default closetItem;