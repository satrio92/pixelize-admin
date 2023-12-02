import {server} from "./aplication/server.js";

const PORT = 3500;

server.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
