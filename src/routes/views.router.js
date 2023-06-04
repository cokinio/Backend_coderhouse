import {Router} from "express";
import { productManager1 } from "../services/products.service.js";
import {cartManager1} from "../services/carts.service.js";
import {authToken} from '../../utils.js';
import { passportCall, authorization } from "../../utils.js";
import {TicketManager1} from "../services/tickets.service.js"

const router = Router();

// router.get('/products', async (req, res)=>{
//     let { limit,page,category,stockMin,sort } = req.query;
//     page = parseInt(req.query.page);
// 	let products = await productManager1.getProducts(limit,page,category,stockMin,sort);
//     res.render('home', {products:products,user:req.session.user})
// })

router.get("/products",
    // authToken,
    passportCall('jwt'), //-> Usando JWT por Cookie usando customCall
    authorization('user'),
    async (req, res)=>{
        let { limit,page,category,stockMin,sort } = req.query;
        page = parseInt(req.query.page);
        let products = await productManager1.getProducts(limit,page,category,stockMin,sort);
        res.render('home', {products:products,user:req.user})
    }
)

router.get('/cart', async (req, res)=>{
    let {cid} = req.query;
    let cart = await cartManager1.getCartById(cid);
    console.log(JSON.stringify(cart, null, "\t"));
    res.render('cart', cart)
})

router.get('/ticket', async (req, res)=>{
    let {tid} = req.query;
    let ticket = await TicketManager1.getById(tid);
    console.log(JSON.stringify(ticket, null, "\t"));
    res.render('ticket', ticket)
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

// router.get('/profile', auth, (req, res)=>{
//     res.render("profile", {
//         user: req.user
//     });})
router.get("/profile",
    // authToken,
    passportCall('jwt'), //-> Usando JWT por Cookie usando customCall
    authorization('user'),
    (req, res)=>{
        res.render("profile",{user: req.user})
    }
)

// Auth middleware
// function auth(req, res,next){
//     if(req.session.user){
//         return next();
//     }else{
//         return res.status(403).send('Usuario no autorizado, para ingresar al recurso')
//     }
// }

export default router;