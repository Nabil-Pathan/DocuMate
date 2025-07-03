import { Request , Response } from "express"
import User from "../models/userSchema"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const SignupController = async (req : Request , res : Response)=>{
    try {
        const { name ,email ,password ,pic } = req.body

        if(!name || !email  || !password ){
            return res.json({message : "Please Provide All the Details"}).status(400)
        }

        const user = await User.findOne({email})

        if(user){
            console.log(user);
            
            return res.json({message : "User Already Exist"}).status(400)
        }

        const hashedPassword = await bcryptjs.hash(password,10)

        const newUser = await User.create({name ,email,password: hashedPassword,pic})

        const token = await jwt.sign({id : newUser._id}, process.env.JWT_SECRET!)

        return res.json({message : "Registration Successful", user : newUser, token}).status(201)
        
    } catch (error: any) {
        console.log(error.message);     
        return res.json({message : "Internal Sever Error"}).status(500)
    }
}

export const LoginController = async (req : Request , res : Response)=>{
    try {
        const { email ,password  } = req.body

        if( !email  || !password ){
            return res.json({message : "Please Provide All the Details"}).status(400)
        }

        const user = await User.findOne({email})

        if(!user){
            return res.json({message : "User does not Exist"}).status(400)
        }

        const comparePassword = await bcryptjs.compare(password,user.password)

        if(!comparePassword){
            return res.json({message : "Invalid Credentials"}).status(400)

        }

        const token = await jwt.sign({id : user._id}, process.env.JWT_SECRET!)

        return res.json({message : "Login Successful", user, token}).status(201)
        
    } catch (error: any) {
        console.log(error.message);     
        return res.json({message : "Internal Sever Error"}).status(500)
    }
}

export const GoogleAuthController = async (req: Request ,res  : Response)=>{
    try {
        const result = req.body

        const user = await User.findOne({email : result.email})


        if(user){
            // Login User
            const token = jwt.sign({id : user._id }, process.env.JWT_SECRET!)
            return res.json({message :"Login Successful", user , token})
        }

        else{
            // Register User

            const generatePassword = Math.random().toString(36).slice(-8)

            const hashedPassword = await bcryptjs.hash(generatePassword,10)

            const newUser = await new User({name : result.displayName.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email : result.email , password: hashedPassword , pic : result.photoURL})
            await newUser.save()
            
            const token = jwt.sign({id : newUser._id }, process.env.JWT_SECRET!)
            return res.json({message :"Registration Successful", user : newUser, token})
        }

    } catch (error : any) {
        console.log(error.message);     
        return res.json({message : "Internal Sever Error"}).status(500)
    }
}