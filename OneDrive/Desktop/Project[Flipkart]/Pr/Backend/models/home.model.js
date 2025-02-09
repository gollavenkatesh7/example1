import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    item: { type: String, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "categoryType"  
    },
    categoryType: {  
        type: String,
        required: true,
        enum: ["Cloth", "Electronics"]
    }
});

export const Items = mongoose.model("Items", itemSchema);
