import mongoose from "mongoose";

const eleAppliancesSchema = mongoose.Schema({
    category : { type : String,required : true },
    item : {
        img : { type : String, required : true },
        title : { type : String, required : true },
        description : { type : String, required : true },
        price : { type : String, required : true },
        rating : { type : String, required: true },
    }
})

export const Electronics = mongoose.model("Electronics",eleAppliancesSchema);