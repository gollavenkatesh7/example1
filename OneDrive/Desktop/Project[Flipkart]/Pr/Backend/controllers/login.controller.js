import { Login } from "../models/login.model.js";

export const loginController=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const exist=await Login.findOne({ email })
        if(exist){
            res.status(200).json({
                message:"User Already Exists",
                data:exist
            })
        }
        else{
            const newItem=new Login({
                email,
                password
            })
            await newItem.save();
            res.status(200).json({
                success:true,
                message:"User Added SuccessFully",
                data:newItem,
            })
        }
    }
    catch(err){
        console.log('Error occured',err);
        res.status(400).json({
            success:false,
            message:'Error in Posting the Data'
        })
    }
}


export const getUsers=async (req,res)=>{
    try{
        const data=await Login.find({})

        res.status(200).json({
            success:true,
            message:"User Added SuccessFully",
            data:data
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err
        }) 
    }
}

