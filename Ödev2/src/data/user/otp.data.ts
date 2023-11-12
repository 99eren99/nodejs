import mongoose from "mongoose";


const Schema = mongoose.Schema;

const OtpSchema = new Schema(
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
const OtpModel = mongoose.model('Otp',OtpSchema)

export default OtpModel;