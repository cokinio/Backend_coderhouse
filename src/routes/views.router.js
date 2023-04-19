import {Router} from "express";
import { productManager1 } from "./products.router.js";
const router = Router();

router.get('/', async (req, res)=>{
    let { limit,page } = req.query;
    page = parseInt(req.query.page);
	let products = await productManager1.getProducts(limit,page);
    console.log(products)
    let docs=products.docs;
    res.render('home', products)
})

router.get('/realtimeproducts', async (req, res)=>{
    let { limit,page } = req.query;
    page = parseInt(req.query.page);
    let products = await productManager1.getProducts(limit,page);
    res.render('realTimeProducts',products)
})

router.get('/chat', async (req, res)=>{
    res.render('chat');
});


export default router;