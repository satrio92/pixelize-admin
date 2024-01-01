import mongoose from "mongoose";

const BlacklistedTokenSchema = new mongoose.Schema ({
  token: {
    type: String,
    unique: true
  }
})

export default mongoose.model('BlacklistedToken', BlacklistedTokenSchema)