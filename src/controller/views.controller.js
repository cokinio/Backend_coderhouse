import { productManager1 } from "../services/products.service.js";
import {cartManager1} from "../services/carts.service.js";
import {TicketManager1} from "../services/tickets.service.js"
import UserDTO from "../services/dto/user.dto.js";

export const productsView = async (req, res)=>{
    let { limit,page,category,stockMin,sort } = req.query;
    page = parseInt(req.query.page);
    let products = await productManager1.getProducts(limit,page,category,stockMin,sort);
    res.render('home', {products:products,user:req.user})
}

export const cartView = async (req, res)=>{
    let {cid} = req.query;
    let cart = await cartManager1.getCartById(cid);
    console.log(JSON.stringify(cart, null, "\t"));
    res.render('cart', cart)
}

export const ticketView = async (req, res)=>{
    let {tid} = req.query;
    let ticket = await TicketManager1.getById(tid);
    console.log(JSON.stringify(ticket, null, "\t"));
    res.render('ticket', ticket)
}

export const realTimeProducts =async (req, res)=>{
    let { limit,page } = req.query;
    page = parseInt(req.query.page);
    let products = await productManager1.getProducts(limit,page);
    res.render('realTimeProducts',products)
}

export const chatView =async (req, res)=>{
    res.render('chat', {user:req.user});
}

export const loginView = async (req, res)=>{
    res.render("login");
}

export const registerView = (req, res)=>{
    res.render("register");
}

export const profileView= (req, res)=>{
    let userFromDto= new UserDTO(req.user)
    //console.log(userFromDto)
    res.render("profile",{userFromDto})
}