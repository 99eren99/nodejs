import { Request, Response, NextFunction} from "express"
import UserModel from "../data/user/user.data"
import { generateToken } from "../utils/jwt.utils"

export const register = (req:Request,res:Response,next:NextFunction)=>{
    try{
        UserModel.create({username:req.body.username,password:req.body.password})
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

export const login = (req:Request,res:Response,next:NextFunction)=>{
    UserModel.findOne({username:req.body.username,password:req.body.password,isDeleted:false})
        .then((value)=>{
            if(value){
                return generateToken({username:req.body.username,isAdmin:value.isAdmin})
            }
        })
        .then((jwtToken)=>{
            res.json({token:jwtToken})
        })
        .catch((exception)=>{
            console.error(exception);
            res.sendStatus(500)
        })
}

export const deleteUser = (req:Request,res:Response,next:NextFunction)=>{
    UserModel.updateOne({username:req.body.username},{isDeleted:true})
        .then((result)=>{
            console.log(result);
            
            if(result){
                res.sendStatus(200)
            }else{
                res.sendStatus(500)
            }
        })
        .catch((exception)=>{
            console.error(exception);
            res.sendStatus(500)
        })
}

//TODO Update user - not restirected to give all attributes (Middleware)
export const updateUser = (req:Request,res:Response,next:NextFunction)=>{
    UserModel.updateOne({username:req.body.username},{username:req.body.username, password:req.body.password, isAdmin:req.body.isAdmin,
                        birthday:req.body.birthday, isDeleted:req.body.isDeleted, id:req.body.id})
        .then((result)=>{
            console.log(result);
            
            if(result){
                res.sendStatus(200)
            }else{
                res.sendStatus(500)
            }
        })
        .catch((exception)=>{
            console.error(exception);
            res.sendStatus(500)
        })
}

export const getUsers = (req:Request,res:Response,next:NextFunction) =>{
    try{
        const pageIndex = parseInt(req.query.pageIndex as string)
        const pageSize = parseInt(req.query.pageSize as string)
        UserModel.find().skip(pageIndex * pageSize).limit(pageSize)
            .then((response)=>{
                const nextPage = "http://localhost:8000/user/getUsers?pageIndex="+(pageIndex+1)+"&pageSize="+pageSize
                res.setHeader("_link",nextPage).json({data:response})
            })
            .catch((err)=>{
                console.log(err);
                res.sendStatus(500)
            })
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
    
}