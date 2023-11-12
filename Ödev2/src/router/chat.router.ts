import express from "express"
import * as chatController from "../controller/chat.controller"
import { authtenticateForUser } from "../middleware/authentication.middleware"
const chatRouter = express.Router()


chatRouter.post("/create/group",[authtenticateForUser],chatController.createGroup)
chatRouter.post("/addUser",[authtenticateForUser],chatController.addUser)
chatRouter.post("/leaveGroup",[authtenticateForUser],chatController.leaveGroup)

export default chatRouter;