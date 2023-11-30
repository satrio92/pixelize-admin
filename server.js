const express = require('express');
const server = express();
const mongoose= require('mongoose');

const PORT = 3500;

mongoose.connect('mongodb+srv://kukuh_satrio:kukuhsatrio123@cluster0.jf4gbun.mongodb.net/pixelize');

const userModel = mongoose.model('Users',
  {
            nama : String,
            password : String
          },
)

const user1 = new userModel({
  nama: "Kukuh Satrio2",
  password: 'kukuh123'
})

user1.save().then(
  () => {
    console.log("data berhasil ditambahkan")
  }
)

server.get('/', (req, res) => {
  res.send("Hello world")
})

server.listen(PORT, () => {
  console.log("server running in port 3500")
})