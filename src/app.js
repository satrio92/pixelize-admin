import {server} from "./aplication/server.js";

import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => {
    console.info('mongoose connect')
  });

const PORT = 3500;
server.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
