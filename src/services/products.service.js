//import ProductManager from "../dao/productManager.js";
import ProductManager from "../dao/productManagerMongo.js";

export let productManager1 = new ProductManager("./");

export const getAllProducts = async (limit,page,category,disp,sort) => {
    let products = await productManager1.getProducts(limit,page,category,disp,sort);
    return products;
}

export const getProductUsingId = async (productId) => {
    let productById = await productManager1.getProductById(productId);
    return productById;
}

export const postNewProduct = async (title, description, price, thumbnail, code, stock,category,status,owner) => {
    let wasProductAddedSuccesfully = await productManager1.addProduct(title, description, price, thumbnail, code, stock,category,status,owner);
    return wasProductAddedSuccesfully;
}
export const deleteProduct = async (pid,user) => {
    let wasProductDeletedSuccesfully= await productManager1.deleteProduct(pid,user);
    return wasProductDeletedSuccesfully;
}
export const UpdateProductUsingId = async (pid,product) => {
    let wasProductUpdatedSuccesfully = await productManager1.updateProduct(pid,product);
    return wasProductUpdatedSuccesfully;
}