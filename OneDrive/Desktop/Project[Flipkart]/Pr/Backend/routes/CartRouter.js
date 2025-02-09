import express from 'express'
import { cartController, getcartData, removeItems } from '../controllers/cart.controller.js'
const cartRouter=express.Router()
cartRouter.get('/getcartItems',getcartData)
cartRouter.post('/cartItems',cartController)
cartRouter.delete('/removeItems/:id',removeItems)
export default cartRouter;