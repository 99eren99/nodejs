import express from "express"
import * as tweetController from "../controller/tweet.controller"
import { authtenticateForAdmin, authtenticateForAll, authtenticateForUser } from "../middleware/authentication.middleware"
const tweetRouter = express.Router()

tweetRouter.post("/postTweet",[authtenticateForAll],tweetController.postTweet)
tweetRouter.post("/updateTweet",[authtenticateForUser],tweetController.updateTweet)
tweetRouter.post("/deleteTweet",[authtenticateForUser],tweetController.deleteTweet)
tweetRouter.get("/getAllTweets",tweetController.getAllTweets)
tweetRouter.get("/getUserTweets/:userName",[authtenticateForUser],tweetController.getUserTweets)
tweetRouter.post("/likeTweet",[authtenticateForUser],tweetController.likeTweet)
tweetRouter.post("/comment",[authtenticateForUser],tweetController.comment)
tweetRouter.post("/retweet",[authtenticateForUser],tweetController.retweet)

export default tweetRouter;