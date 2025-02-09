import { products } from "../data.js"
import { Items1 } from "../models/item.model.js";

export const itemController=async (req,res)=>{
    try{
        await Items1.insertMany(products)
        res.status(200).send({message:"Success",data:products});
    }
    catch(err){
        console.log("Error")
    }
}

