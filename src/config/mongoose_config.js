import mongoose from "mongoose";
export const connection = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.info('mongoose connect')
    });
}

