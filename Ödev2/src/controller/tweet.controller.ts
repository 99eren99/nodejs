import { Request, Response, NextFunction} from "express"
import TweetModel from "../data/tweet/tweet.data"
import { generateToken,verifyToken } from "../utils/jwt.utils"
import { UUID } from "crypto"

//TODO Save tweet
export const postTweet = (req:Request,res:Response,next:NextFunction)=>{
    try{
        const jwtToken = req.headers["authorization"] as string
        const verifyTokenResult = verifyToken(jwtToken)
        const userName=verifyTokenResult.username;
        TweetModel.create({userName:userName,content:req.body.content})
            .then((result)=>{
                if(result){
                    res.sendStatus(200)
                }
            })
            .catch((exception)=>{
                console.error(exception);
                res.sendStatus(500)
            })
    }catch(error){
        console.error(error);
        res.sendStatus(500)
    }
}

//TODO Update tweet - Only the user call (Middleware)
export const updateTweet = (req:Request,res:Response,next:NextFunction)=>{
    try{
        const jwtToken = req.headers["authorization"] as string
        const verifyTokenResult = verifyToken(jwtToken)
        const userName=verifyTokenResult.username;
        
        TweetModel.findOne({id:req.body.id})
            .then((result)=>{
                if (result?.userName==userName){
                    TweetModel.updateOne({id:req.body.id,content:req.body.content})
                        .then((result)=>{
                            if(result){
                                res.sendStatus(200)
                            }})}
                else{
                    console.error("Tweet does not exist");
                    res.sendStatus(404)}
            })
    }catch(error){
        console.error(error);
        res.sendStatus(500)
    }
}


//TODO Delete (Soft delete) tweet - Only the user call (Middleware)
export const deleteTweet = (req:Request,res:Response,next:NextFunction)=>{
    try{
        const jwtToken = req.headers["authorization"] as string
        const verifyTokenResult = verifyToken(jwtToken)
        const userName=verifyTokenResult.username;
        
        TweetModel.findOne({id:req.body.id})
            .then((result)=>{
                if (result?.userName==userName && result!=undefined){
                    TweetModel.updateOne({id:req.body.id,isDeleted:true})
                        .then((result)=>{
                            if(result){
                                res.sendStatus(200)
                            }})}
                else if (result?.userName!=userName){
                    console.error("Not your tweet");
                    res.sendStatus(401)}
                else if (result==undefined){
                    console.error("Tweet does not exist");
                    res.sendStatus(404)}
            })
            .catch((error)=>{
                console.error(error);
                res.sendStatus(500)}
            )
    }catch(error){
        console.error(error);
        res.sendStatus(500)
    }
}

//TODO Get All tweet
export const getAllTweets = (req:Request,res:Response,next:NextFunction)=>{
    TweetModel.find({isDeleted:false})
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((error)=>{
            console.error(error);
            res.sendStatus(500)})
}

//TODO Get User's tweet - Only the user call (Middleware)
//use path parameter
export const getUserTweets = (req:Request,res:Response,next:NextFunction)=>{
    const targetUser = req.params.userName;
    TweetModel.find({userName:targetUser,isDeleted:false})
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((error)=>{
            console.error(error);
            res.sendStatus(500)})
}

//TODO Like tweet tweet - Except from user (Middleware)
export const likeTweet = (req:Request,res:Response,next:NextFunction)=>{
    try{const jwtToken = req.headers["authorization"] as string
        const verifyTokenResult = verifyToken(jwtToken)
        const userName=verifyTokenResult.username;
        const tweetId = req.body.id as UUID;
        
        TweetModel.findOne({id:tweetId ,isDeleted:false})
            .then((result)=>{
                if (result?.userName==userName || !result?.likedBy.includes({userName:userName})){
                    throw Error;//user cant like his own tweets and like a tweet twice
                }
                TweetModel.updateOne({id:tweetId ,isDeleted:false},{ $push: { likedBy: {userName:userName }}})
                    .then((result)=> {res.sendStatus(200);})
            })
            .catch((error)=>{
                console.error(error);
                res.sendStatus(403)});
    }
    catch(error){
        console.error(error);
        res.sendStatus(500)
    }
    
}

//TODO Comment tweet - Except from user (Middleware)
export const comment = async (req:Request,res:Response,next:NextFunction)=>{
    try{const jwtToken = req.headers["authorization"] as string
        const verifyTokenResult = verifyToken(jwtToken)
        const userName=verifyTokenResult.username;
        const comment= req.body.comment;
        const tweetId = req.body.id as UUID;
        
        TweetModel.findOne({id:tweetId ,isDeleted:false})
            .then((result)=>{
                if (result?.userName==userName || !result?.likedBy.includes({userName:userName})){
                    throw Error;//user cant like his own tweets and like a tweet twice
                }
                TweetModel.updateOne({id:tweetId ,isDeleted:false},{ $push: { comments: {userName:userName, comment:comment}}})
                    .then((result)=> {res.sendStatus(200);})
            })
            .catch((error)=>{
                console.error(error);
                res.sendStatus(403)});
    }
    catch(error){
        console.error(error);
        res.sendStatus(500)
    }
}

export const retweet = async (req:Request,res:Response,next:NextFunction)=>{
    try{const jwtToken = req.headers["authorization"] as string
        const verifyTokenResult = verifyToken(jwtToken)
        const userName=verifyTokenResult.username;
        const content= req.body.content;
        const parentTweetId = req.body.id as UUID;
        TweetModel.create({userName:userName,content:content,parentTweetID:parentTweetId }).then((result)=>{
            if(result){
                res.sendStatus(200)
            }
        })
        .catch((exception)=>{
            console.error(exception);
            res.sendStatus(500)
        })
    }
    catch(error){
        console.error(error);
        res.sendStatus(500)
    }
    
}