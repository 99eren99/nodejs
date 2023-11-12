import { Request,Response,NextFunction } from "express";
import ChatModel from "../data/chat/chat.data";
import UserModel from "../data/user/user.data";
import { socketMap, io } from "../index";
import { verifyToken } from "../utils/jwt.utils" 

export const createGroup = (req:Request, res:Response, next:NextFunction) =>{
    ChatModel.create({groupName:req.body.groupName,admin:req.body.username})
        .then((response)=>{
            if(response){
                const jwtToken = req.headers["authorization"] as string
                const verifyTokenResult = verifyToken(jwtToken)
                const userName=verifyTokenResult.username;
                let namespace=io.of("/"+(response._id.toString()));

                namespace.on('connection', function(socket){
                    socket.on("messageFromAdmin", (message)=>{
                        if (socket.handshake.headers.userName===userName){
                            socket.send(message);
                        }
                    })
                 });

                socketMap.set(response._id.toString(),namespace);
                res.json({chatID:response._id});
                
            }else{
                res.sendStatus(500)
            }
        })
}


export const addUser = (req:Request, res:Response, next:NextFunction) =>{
    try{
        const jwtToken = req.headers["authorization"] as string
        const verifyTokenResult = verifyToken(jwtToken)
        const clientUserName=verifyTokenResult.username;
        const userID=req.body.userID;
        ChatModel.findOne({groupName:req.body.groupName})
            .then((response)=>{
                if(response?.admin===clientUserName){
                    response.users.push(userID);
                    response.save();
                    res.sendStatus(200)
                }else{
                    res.sendStatus(500)
                }
            })
    }
    catch(error){
        console.error(error);
        res.sendStatus(500)
    }
    
}

export const leaveGroup = (req:Request, res:Response, next:NextFunction) =>{
    try{
        const jwtToken = req.headers["authorization"] as string
        const verifyTokenResult = verifyToken(jwtToken)
        const userName=verifyTokenResult.username;
        
        UserModel.findOne({username:userName})
            .then((response)=>{
                if (response){
                    let userID=response._id;
                    ChatModel.findOne({groupName:req.body.groupName})
                        .then((response)=>{
                            if(response?.admin===userName){
                                response.users=response.users.filter(id => id != userID);
                                response.save();
                                res.sendStatus(200)
                            }else{
                                res.sendStatus(500)
                            }
                        })
                }
            })
    }
    catch(error){
        console.error(error);
        res.sendStatus(500)
    }
    
}
