//import CartManager from "../dao/cartsManager.js";
import CartManager from "../dao/cartsManagerMongo.js";
import {Router} from "express";
const router = Router();

export let cartManager1 = new CartManager("./");

router.get("/:cid", async (req,res)=>{
    console.log(req.params.cid);
	let cartById = await cartManager1.getCartById(req.params.cid);
	if (cartById != null) {
		res.send(cartById);
	} else {
		res.send(`el cart con ID ${req.params.cid} no existe`);
	}
})

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

router.post("/:cid/product/:pid",async (req,res)=>{
    // let products=req.body;
    // console.log(products);
    let wasProductAddedSuccesfully = await cartManager1.addProductToCart(req.params.cid,req.params.pid,1);
    if (wasProductAddedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Productos agregados con exito al carrito`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductAddedSuccesfully[1] });
    }
})

router.delete("/:cid",async (req,res)=>{
    let cart=req.params.cid;
    let wasProductsDeleted = await cartManager1.deleteCartProducts(cart);
    if ( wasProductsDeleted[0]===true) {
        res.send({ status: "Success", message: `Productos eliminados con exito del carrito con ID:${wasProductsDeleted[1]}`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductsDeleted[1] });
    }
})

router.delete("/:cid/product/:pid",async (req,res)=>{
    let products=req.body;
    console.log(products);
    let wasProductDeletedSuccesfully = await cartManager1.deleteProductfromCart(req.params.cid,req.params.pid,1);
    if (wasProductDeletedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Productos borrados con exito al carrito`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductDeletedSuccesfully[1] });
    }
})

router.put("/:cid",async (req,res)=>{
    let cart=req.params.cid;
    let products=req.body;
    console.log(products)
    let wasCartAddedSuccesfully = await cartManager1.NewCart(products,cart);
    if (wasCartAddedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Productos actualizados con exito al carrito con ID:${wasCartAddedSuccesfully[1]}`});
    } else{
        res.status(400).send({ status: "Error", message: wasCartAddedSuccesfully[1] });
    }
})

router.put("/:cid/product/:pid",async (req,res)=>{
    let productCant=req.body[0].quant;
    console.log(productCant);
    let wasProductUpdatedSuccesfully = await cartManager1.updateProductInCart(req.params.cid,req.params.pid,productCant);
    if (wasProductUpdatedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Producto actualizado con exito al carrito`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductUpdatedSuccesfully[1] });
    }
})


export default router;