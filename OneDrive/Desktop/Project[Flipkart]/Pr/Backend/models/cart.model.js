import mongoose from "mongoose";

const cart=mongoose.Schema({
    title : {type:String,required: true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    image:{type:String, required:true},
})
export const Cart=mongoose.model("Cart",cart);