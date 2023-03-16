import CartManager from "../classes/cartsManager.js";
import {Router} from "express";
const router = Router();

let cartManager1 = new CartManager("./");

router.post("/",async (req,res)=>{
    let products=req.body;
    console.log(products)
    let wasCartAddedSuccesfully = await cartManager1.NewCart(products);
    if (wasCartAddedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Productos agregados con exito al carrito con ID:${wasCartAddedSuccesfully[1]}`});
    } else{
        res.status(400).send({ status: "Error", message: wasCartAddedSuccesfully[1] });
    }
})




export default router;