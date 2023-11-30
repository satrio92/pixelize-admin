const express = require('express');
const app = express();

const PORT = 3500;

app.get('/', (req, res) => {
  res.send("Hello world")
})

app.listen(PORT, () => {
  console.log("server running in port 3500")
})