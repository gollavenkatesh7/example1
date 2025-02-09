import express from 'express'
import { itemController } from '../controllers/item.controller.js'
const itemrouter=express.Router()
itemrouter.get('/getItems',itemController)
export default itemrouter;


