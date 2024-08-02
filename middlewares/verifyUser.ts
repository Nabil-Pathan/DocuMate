import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../models/userSchema"
import { Request , Response , NextFunction } from "express"

export const verifyToken =async (req : Request | any , res : Response , next : NextFunction)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1]
        
        // console.log("Headers Authorization : ",req.headers.authorization );
        

        // console.log("token : ", token);
        

        if(!token){
            return res.status(401).json({error :"Unauthorized"})
        }

        const decodedToken = await jwt.verify(token,process.env.JWT_SECRET!) as JwtPayload

        const user = await User.findById(decodedToken.id)

        if(!user){
            return res.status(401).json({error :"Unauthorized"})
        }

        req.user = user

        // console.log("Inside Middleware setted user in req.user",req.user);
        
        next()
    } catch (error) {
        console.log("Error Inside Middleware",error);
        return res.status(500).json({error : "Internal Server Error"})
    }
}