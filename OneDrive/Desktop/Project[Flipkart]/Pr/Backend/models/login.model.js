import mongoose, { Types } from "mongoose";

const login=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
})

export const Login=mongoose.model("Login",login)