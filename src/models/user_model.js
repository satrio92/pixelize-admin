import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: () => mongoose.Types.ObjectId().toString()
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date
  }
})

export default mongoose.model('User', UserSchema)