import jsonwebtoken, { JwtPayload } from "jsonwebtoken"
const secretKey = "TechcareerNodeJSBootcamp"
export const generateToken = (payload:TokenPayload):string => {
    return jsonwebtoken.sign(payload,secretKey,{expiresIn:1800})
}

export const verifyToken = (token:string):TokenPayload => {
    return jsonwebtoken.verify(token,secretKey) as TokenPayload
}

export interface TokenPayload {
    username:string
    isAdmin:boolean
}