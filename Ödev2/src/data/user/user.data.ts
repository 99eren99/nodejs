import mongoose from "mongoose";
import {randomUUID} from "crypto"

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        id:{
            type: 'UUID',
            default: () => randomUUID()
        },
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default: false
        }, 
        email:{
            type:String,
            required:true
        },
        birthday:{
            type:Date,
            default:Date.now()
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
        //TODO user settings for email,notification....
    }
)
const UserModel = mongoose.model('User',UserSchema)

export default UserModel;