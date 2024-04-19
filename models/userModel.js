import mongoose from "mongoose";
import bycrypt from "bcrypt";
import closetItem from "./closetItemModel.js";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: [5, 'Username must include a minimum of 6 characters'],
    maxlength: [30, 'Usename must contain a maximum of 30 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
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

    //Ensure password meets req
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (this.isModified('password')) {
    if (!regex.test(this.password)) {
      next(new Error('Password must be at least 8 characters long, and have at least one upper case letter, lower case letter, number, and symbol'))
    }
    try {
      this.password = await bcrypt.hash(this.password, 8)
      next();
    } catch (error) {
      next(error)
    }
  }
    next();
  }catch (error) {
    next(error);
  }
})

const UserSchema = mongoose.model('user', userSchema);

export default UserSchema;