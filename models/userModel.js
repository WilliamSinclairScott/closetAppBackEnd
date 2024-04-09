import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    validate: {
      validator: async function(email) {
        const user = await this.constructor.findOne({ email });
        if(user) {
          if(this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: props => 'The specified email address is already in use.'
    },
    required: [true, 'User email required']
  },
  closetItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'closetItem'
  }]
})

export default userSchema;