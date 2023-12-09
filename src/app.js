import {server} from "./aplication/server.js";
import  { connection } from './config/mongoose_config.js'
connection();

const PORT = 3500;
server.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
