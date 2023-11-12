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
        birthday:{
            type:Date,
            default:Date.now()
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    }
)
const UserModel = mongoose.model('User',UserSchema)

export default UserModel;