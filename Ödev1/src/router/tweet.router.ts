import express from "express"
import * as tweetController from "../controller/tweet.controller"
import { authtenticateForAdmin, authtenticateForAll, authtenticateForUser } from "../../middleware/authentication.middleware"
const tweetRouter = express.Router()

tweetRouter.post("/post",[authtenticateForAll],tweetController.postTweet)
tweetRouter.post("/update",[authtenticateForUser],tweetController.updateTweet)
tweetRouter.post("/delete",[authtenticateForUser],tweetController.deleteTweet)
tweetRouter.get("/getAllTweets",tweetController.getAllTweets)
tweetRouter.get("/getUserTweets/:userName",[authtenticateForUser],tweetController.getUserTweets)
tweetRouter.post("/likeTweet",[authtenticateForUser],tweetController.likeTweet)
tweetRouter.post("/tweetTweet",[authtenticateForUser],tweetController.tweetTweet)

export default tweetRouter;