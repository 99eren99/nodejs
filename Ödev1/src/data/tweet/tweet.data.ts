import mongoose from "mongoose";
import {randomUUID} from "crypto"

const Schema = mongoose.Schema;


const TweetSchema = new Schema(
    {
        id:{
            type: "UUID",
            default: () => randomUUID().toString()
        },
        userName:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required: true
        },
        likedBy:[{userName:{type:String}}],
        parentTweetID: {type:"UUID"} ,
        postDate:{
            type:Date,
            default:Date.now()
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    }
)
const TweetModel = mongoose.model('Tweet',TweetSchema)

export default TweetModel;