import express from 'express';
import {publicRoute} from "../routes/public_api.js";
import {errorMiddleware} from "../middleware/error_middleware.js";

export const server = express();

server.use(express.json());
server.use(publicRoute);
server.use(errorMiddleware)

