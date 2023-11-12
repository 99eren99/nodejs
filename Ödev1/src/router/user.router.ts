import express from "express"
import * as userController from "../controller/user.controller"
import { authtenticateForAdmin, authtenticateForUser } from "../../middleware/authentication.middleware"
const userRouter = express.Router()


userRouter.post("/register",userController.register)
userRouter.post("/login",userController.login)
userRouter.post("/delete",[authtenticateForAdmin],userController.deleteUser)
userRouter.post("/update",[authtenticateForAdmin],userController.updateUser)

export default userRouter;