import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
// import inputrouter from "./routes/inputRouter.js";
import router from "./routes/emailRouter.js";
import cors from "cors";
import itemrouter from "./routes/itemRouter.js";
import cartRouter from "./routes/CartRouter.js";
import loginRouter from "./routes/loginRouter.js";
dotenv.config();  
const app = express();
app.use(express.json());

const url = process.env.MONGO_URL;
if (!url) {
  console.error("MONGO_URL is missing in .env file!");
  process.exit(1);
}

// console.log("MongoDB URL:", url);

mongoose.connect(url).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
app.use(cors());
// app.use(inputrouter);
app.use(router);
app.use(itemrouter);
app.use(cartRouter);
app.use(loginRouter)
app.use(express.static('public'));
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
