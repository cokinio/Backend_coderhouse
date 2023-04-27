import {Router} from "express";
import { productManager1 } from "./products.router.js";
import {cartManager1} from "./carts.router.js";

const router = Router();

router.get('/products', async (req, res)=>{
    let { limit,page,category,stockMin,sort } = req.query;
    page = parseInt(req.query.page);
	let products = await productManager1.getProducts(limit,page,category,stockMin,sort);
    //console.log(products)
    let docs=products.docs;
    res.render('home', products)
})

router.get('/cart', async (req, res)=>{
    let {cid} = req.query;
    let cart = await cartManager1.getCartById(cid);
    console.log(JSON.stringify(cart, null, "\t"));
    res.render('cart', cart)
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

router.get('/', (req, res)=>{
    res.render("login");
})

router.get('/register', (req, res)=>{
    res.render("register");
})

router.get('/', (req, res)=>{
    res.render("profile", {
        user: req.session.user
    });
})

export default router;