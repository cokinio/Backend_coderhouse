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

router.get("/:cid", async (req,res)=>{
    console.log(req.params.cid);
	let cartById = await cartManager1.getCartById(req.params.cid);
	if (cartById != null) {
		res.send(cartById);
	} else {
		res.send(`el cart con ID ${req.params.cid} no existe`);
	}
})


router.post("/:cid/product/:pid",async (req,res)=>{
    let products=req.body;
    console.log(products);
    let wasProductAddedSuccesfully = await cartManager1.addProductToCart(req.params.cid,req.params.pid,1);
    if (wasProductAddedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Productos agregados con exito al carrito`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductAddedSuccesfully[1] });
    }
})

export default router;