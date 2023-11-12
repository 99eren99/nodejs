import nodemailer, { SentMessageInfo } from "nodemailer"
import { Response } from "express"
import dotenv from "dotenv"
dotenv.config()

export const emailSend = (to:string, subject:string, text:string, res:Response) =>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASSWORD
        }
    });
    var mailOptions = {
        from:process.env.ADMIN_EMAIL,
        to:to,
        subject:subject,
        text:text
    }
    transporter.sendMail(mailOptions,(err:Error | null,info:SentMessageInfo)=>{
        if(err){
            console.log(err)
            res.sendStatus(500)
        }else{
            console.log("Email is sent to " + info)
            res.sendStatus(200)
        }
    })
}