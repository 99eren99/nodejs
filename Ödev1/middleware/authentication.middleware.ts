import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../src/utils/jwt.utils"


export const authtenticateForAdmin = (req:Request, res:Response, next:NextFunction) =>{
    const jwtToken = req.headers["authorization"] as string
    const verifyTokenResult = verifyToken(jwtToken)
    if(verifyTokenResult.isAdmin){
        next()
    }else{
        res.sendStatus(403)
    }
}

export const authtenticateForUser = (req:Request, res:Response, next:NextFunction) =>{
    const jwtToken = req.headers["authorization"] as string
    const verifyTokenResult = verifyToken(jwtToken)
    if(!verifyTokenResult.isAdmin){
        next()
    }else{
        res.sendStatus(403)
    }
}

export const authtenticateForAll = (req:Request, res:Response, next:NextFunction) =>{
    const jwtToken = req.headers["authorization"] as string
    const verifyTokenResult = verifyToken(jwtToken)
    if(verifyTokenResult){
        next()
    }else{
        res.sendStatus(403)
    }
}