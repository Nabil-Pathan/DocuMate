import mongoose from "mongoose"
import { Document } from "mongoose"

interface UserDocument extends Document {
    name : string
    email : string
    password : string
    pic : string
}

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    pic :{
        type : String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
})

const User = mongoose.model<UserDocument>("User", userSchema)

export default User