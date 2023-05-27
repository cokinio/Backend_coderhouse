import {getCart,postNewCart,addProductInCart, deleteCartById,deleteProductFromCart,updateCartById,updateProductInCart} from "../services/carts.service.js"

export const getCartById =async (req,res)=>{
    console.log(req.params.cid);
	let cartById = await getCart(req.params.cid)
    if (cartById != null) {
		res.send(cartById);
	} else {
		res.send({ status: "Error", message:`el cart con ID ${cartIdNumber} no existe`});
	}
}

export const postCart = async (req,res)=>{ 
    let products=req.body;
    console.log(products)
    let wasCartAddedSuccesfully = await postNewCart(products);
    if (wasCartAddedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Productos agregados con exito al carrito con ID:${wasCartAddedSuccesfully[1]}`});
    } else{
        res.send({ status: "Error", message: wasCartAddedSuccesfully[1] });
    }
}

export const postProductInCart = async (req,res)=>{
    let productId=req.params.pid;
    let cartId= req.params.cid;
    let productQuantityIncreaseBy=1;
    let wasProductAddedSuccesfully = await addProductInCart(cartId,productId,productQuantityIncreaseBy);
    if (wasProductAddedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Productos agregados con exito al carrito`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductAddedSuccesfully[1] });
    } }

export const deleteCart = async (req,res)=>{
    let cart=req.params.cid;
    let wasProductsDeleted = await deleteCartById(cart) ;
    if ( wasProductsDeleted[0]===true) {
        res.send({ status: "Success", message: `Productos eliminados con exito del carrito con ID:${wasProductsDeleted[1]}`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductsDeleted[1] });
    }
 }

export const deleteProductInCart = async (req,res)=>{
    let products=req.body;
    console.log(products);
    let cartId=req.params.cid;
    let productId=req.params.pid;
    let productDecreaseBy=1;
    let wasProductDeletedSuccesfully = await deleteProductFromCart(cartId,productId,productDecreaseBy);
    if (wasProductDeletedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Productos borrados con exito al carrito`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductDeletedSuccesfully[1] });
    }
 }

export const putCartById = async (req,res)=>{
    let cartId=req.params.cid;
    let products=req.body;
    console.log(products)
    let wasCartAddedSuccesfully = await updateCartById(products,cartId);
    if (wasCartAddedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Productos actualizados con exito al carrito con ID:${wasCartAddedSuccesfully[1]}`});
    } else{
        res.status(400).send({ status: "Error", message: wasCartAddedSuccesfully[1] });
    }
 }

export const putProductInCart = async (req,res)=>{
    let productCant=req.body[0].quant;
    console.log(productCant);
    let cartId=req.params.cid;
    let products=req.body;
    let wasProductUpdatedSuccesfully = updateProductInCart(cartId,products,productCant);
    if (wasProductUpdatedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Producto actualizado con exito al carrito`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductUpdatedSuccesfully[1] });
    }
 }