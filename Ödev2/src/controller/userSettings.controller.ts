import { Request, Response, NextFunction} from "express"
import UserModel from "../data/user/user.data"
import OtpUserSettingsModel from "../data/user/otpUserSettings.data"
import { emailSend } from "../email/email.sender"
import { otpGenerate } from "../email/otp.generator"
import { verifyToken } from "../utils/jwt.utils"

export const register = (req:Request,res:Response,next:NextFunction)=>{
    try{
        const jwtToken = req.headers["authorization"] as string
        const verifyTokenResult = verifyToken(jwtToken)
        const userName=verifyTokenResult.username;
        const otpData = otpGenerate()
        const emailText = userName + " has succesfully registered for user settings change. OTP code is " + otpData.otp;

        UserModel.findOne({username:userName})
            .then((user)=>{
                if (user){
                    OtpUserSettingsModel.create({username:userName,otp:otpData.otp,expritaionTime:otpData.expirationTime})
                        .then((resultForOtp)=>{
                            if(resultForOtp){
                                emailSend(user.email,"User Auth",emailText,res)
                            }
                        })
                        .catch((exception)=>{
                            console.error(exception);
                            res.sendStatus(500)
                        })}
            })
            .catch((exception)=>{
                console.error(exception);
                res.sendStatus(500);
            })
    }catch(error){
        console.error(error);
        res.sendStatus(500)
    }
}

export const update = (req:Request,res:Response,next:NextFunction)=>{
    let userName: String;
    let settings: any;
    try { 
        const jwtToken = req.headers["authorization"] as string
        const verifyTokenResult = verifyToken(jwtToken)
        userName=verifyTokenResult.username;
        settings=req.body;
    }
    catch(error){
        console.error(error);
        res.sendStatus(401)
    }
    
    OtpUserSettingsModel.find({username:userName})
        .then((value)=>{        
            if(value.length > 0){
                value.sort((a,b)=>Date.parse(a.expritaionTime)>Date.parse(b.expritaionTime) ? -1 : 1)
                console.log(value);
                if(req.body.otpCode == value[0].otp && Date.parse(value[0].expritaionTime) > new Date().getTime()){
                    OtpUserSettingsModel.deleteMany({username:req.body.username})
                        .then((responseOtpDelete)=>{
                            if(responseOtpDelete){
                                UserModel.findOne({username:userName})
                                    .then((user)=>{
                                        if (user){
                                            user.updateOne(settings);
                                            res.sendStatus(200);
                                        }
                                        else{res.sendStatus(401);}
                                    })
                            }else{
                                res.sendStatus(501)
                            }
                        })
                    
                }else{
                    res.sendStatus(500)
                }
            }else{
                res.sendStatus(500)
            }
            
        })
}
