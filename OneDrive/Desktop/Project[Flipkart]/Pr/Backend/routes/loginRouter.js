import express from 'express'
import { loginController, getUsers } from '../controllers/login.controller.js'
const loginRouter=express.Router()
loginRouter.post('/postUsers',loginController);
loginRouter.get('/getUsers',getUsers);

export default loginRouter