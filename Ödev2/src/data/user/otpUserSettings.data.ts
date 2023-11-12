import { randomUUID } from "crypto";
import mongoose from "mongoose";


const Schema = mongoose.Schema;

const OtpUserSettingsSchema = new Schema(
    {
        username:{
            type: String,
            required:true
        },
        otp:{
            type:String,
            required:true
        },
        expritaionTime:{
            type:String,
            required:true
        },
    }
)
const OtpUserSettingsModel = mongoose.model('Otp',OtpUserSettingsSchema)

export default OtpUserSettingsModel;