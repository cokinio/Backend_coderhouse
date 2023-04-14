import {Router} from "express";
import { productManager1 } from "./products.router.js";
const router = Router();



router.get('/', async (req, res)=>{
    let products = await productManager1.getProducts();
    res.render('home', {
        products
    })
})

router.get('/realtimeproducts', async (req, res)=>{
    let products = await productManager1.getProducts();
    res.render('realTimeProducts', {
        products
    })
})


export default router;