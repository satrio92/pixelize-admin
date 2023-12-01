import express from 'express';
import mongoose from 'mongoose';
const app = express();

const PORT = 3500;

// mongoose.connect('mongodb+srv://kukuh_satrio:kukuhsatrio123@cluster0.jf4gbun.mongodb.net/pixelize');
//
// const userModel = mongoose.model('Users',
//   {
//             nama : String,
//             password : String
//           },
// )
//
// const user1 = new userModel({
//   nama: "Kukuh Satrio2",
//   password: 'kukuh123'
// })
//
// user1.save().then(
//   () => {
//     console.log("data berhasil ditambahkan")
//   }
// )

app.get('/', (req, res) => {
  res.send("Hello world")
})

app.listen(PORT, () => {
  console.log("app running in port 3500")
})