import {Router} from "express";
import { productManager1 } from "./products.router.js";
const router = Router();

let products = await productManager1.getProducts();

router.get('/', (req, res)=>{
    res.render('home', {
        products
    })
})

router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts', {
        products
    })
})


export default router;