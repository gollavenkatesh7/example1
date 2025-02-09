// import { Items } from "../models/home.model.js"

// export const enterData = async(req,res)=>{
//     try{
//         const { item, category , categoryType } = req.body;

//         if(!item || !category || !categoryType){
//             res.status(400).json({
//                 message : "Please Enter the Data",
//             });
//         }

//         if (!["Cloth", "Electronics"].includes(categoryType)) {
//             return res.status(400).json({ error: "Invalid category type" });
//         }

//         const newUser = Items({
//             item,
//             category,
//             categoryType,
//         });

//         await newUser.save();
        
//         if(newUser){
//             res.status(200).json({
//                 message : "Data Entered Successfully",
//                 status : 1,
//             })
//         }
//     }catch(err){
//         res.status(200).json({
//             message : "Internal Server Error",
//             status : 0,
//         });
//     }
// }

// export const getItems = async (req, res) => {
//     try {
//         const items = await Items.find().populate("category"); 

//         res.status(200).json(items);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };