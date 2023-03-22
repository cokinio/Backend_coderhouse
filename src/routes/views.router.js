import {Router} from "express";
import { productManager1 } from "./products.router.js";
const router = Router();

let products = await productManager1.getProducts();

router.get('/products', (req, res)=>{
    res.render('index', {
        products
    })
})


export default router;