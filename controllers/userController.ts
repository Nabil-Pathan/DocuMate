import bcryptjs from "bcryptjs"
import User from "../models/userSchema"
import { Request , Response } from "express"

export const updateProfile = async (req : Request | any ,res : Response)=>{
    try {
        let { name , email , password , pic } = req.body

        const userId = req.user._id

        const user = await User.findById(userId)

        if(!user){
            return res.status(400).json({error : "User not found"})
        }
        if (password !== "") {
            password = await bcryptjs.hash(password, 10);
          } else {
            // If password is not provided, remove it from the update object
            password = undefined;
          }

          const updateObject: { name: string; email: string; pic: string; password?: string } = { name, email, pic };

          if(password !== undefined){
            updateObject.password = password
          }

        const updatedUser = await User.findByIdAndUpdate(userId , {
           $set : updateObject
        }, { new : true})

        updatedUser?.save()

        res.status(200).json({ message: "User Updated", user : updatedUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : "Internal Server Error"})
    }
}