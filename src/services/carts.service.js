//import CartManager from "../dao/cartsManager.js";
import CartManager from "../dao/cartsManagerMongo.js";

export let cartManager1 = new CartManager("./");

export const getCart = async (cartIdNumber) => {
    let cartById = await cartManager1.getCartById(cartIdNumber);
	return cartById
}

export const postNewCart = async (products) =>{
    let wasCartAddedSuccesfully = await cartManager1.NewCart(products);
    return wasCartAddedSuccesfully
}

export const addProductInCart= async (cartId,productId,productQuantityIncreaseBy) =>{
    let wasProductAddedSuccesfully = await cartManager1.addProductToCart(cartId,productId,productQuantityIncreaseBy);
    return wasProductAddedSuccesfully
}

export const deleteCartById = async (cartId) =>{
    let wasProductsDeleted = await cartManager1.deleteCartProducts(cartId);
    return wasProductsDeleted
}

export const deleteProductFromCart = async (cartId,productId,productDecreaseBy) =>{
    let wasProductDeletedSuccesfully = await cartManager1.deleteProductfromCart(cartId,productId,productDecreaseBy);
    return  wasProductDeletedSuccesfully;
}

export const updateCartById = async (products,cartId) =>{
    let wasCartAddedSuccesfully = await cartManager1.NewCart(products,cartId);
    return wasCartAddedSuccesfully;
}

export const updateProductInCart = async (cartId,products,productCant) => {
    let wasProductUpdatedSuccesfully = await cartManager1.updateProductInCart(cartId,products,productCant);
    return wasProductUpdatedSuccesfully;
}