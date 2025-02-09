import mongoose from "mongoose";

const clothSchema = new mongoose.Schema({
    category : { type : String, required : true },
    subcat : { type : String, required : true },
    item : {
        img : { type : String, required : true },
        title : { type : String, required : true },
        description : { type : String, required : true },
        price : { type : String, required : true },
        rating : { type : String, required: true },
    },
});

export const Cloth = mongoose.model("Cloth",clothSchema);
