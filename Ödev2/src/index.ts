import express from "express"
import http from 'http';
import socketIo from 'socket.io';

const app = express()
app.use(express.json())
const server = http.createServer(app);
const io = new socketIo.Server(server);

//keep socket namespaces in a global map data structure as (endpoint,socketNamespace pairs)
var socketMap= new Map<string, socketIo.Namespace>();
export { socketMap, io }; 

import userRouter from "./router/user.router"
import tweetRouter from "./router/tweet.router"
import chatRouter from "./router/chat.router"

app.use("/user",userRouter)
app.use("/tweet",tweetRouter)
app.use("/chat",chatRouter)

export default server
