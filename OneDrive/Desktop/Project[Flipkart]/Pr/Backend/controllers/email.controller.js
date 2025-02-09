import bcrypt from "bcrypt";
import { User } from "../models/email.model.js";

export const postData = async(req,res)=>{
    
    try{ 
        const {username,email,password,name} = req.body;

        
        const user = await User.findOne("email");
        if(user){
            res.status(200).json({
                message : "User already exists",
                status : 0,
            })
        };
        const hashedPassword = await bcrypt.hash(password,10);
        
        const newUser = new User({
            name : name,
            username : username,
            email : email,
            password : hashedPassword,
        })

        await newUser.save();

        res.status(200).json({
            message : "User Registered Successfully",
            status : "1",
        })

    }catch(err){
        res.status(200).json({
            message : "Error"
        })
    }

}