import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.models.js";
import mongoose from 'mongoose';

export default class CartManager {
	static cuentaGlobal = 0;

	constructor(path) {
		this.path = path;
	}

	//Metodos
	async NewCart(products1) {
		let thereAreNonExistingProducts = false;
		let NonExistentProduct;

		if (products1 !== undefined) {
			//check if all the products exists

			await products1.reduce(async (e) => {
				console.log(e.pid);
				let productExists = await this.getProductById(e.pid);
				console.log(productExists);
				if (productExists !== true) {
					console.error(`Product ${e.pid} does not exists`);
					thereAreNonExistingProducts = true;
					NonExistentProduct = e.pid;
				}
			});

			if (thereAreNonExistingProducts === true) {
				return [false, `Product ${NonExistentProduct} does not exists`];
			}

			//create a cart
			let cart = await cartsModel.create({});
			//write products in the file
			cart.products = products1;
			//cart.products.push({"pid":"6439933231c5c1c7aa5f2516","quant":2})
			let result = await cartsModel.updateOne({ _id: cart._id }, cart);
			//let carrito= await cartsModel.find({_id:cart._id}).populate('products.pid');
			let carrito = await cartsModel.find({ _id: cart._id });
			console.log(JSON.stringify(carrito, null, "\t"));
			return [true, cart._id];
		} else {
			console.log("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	async getCartById(idBuscado) {
		try {
			let cart = await cartsModel.find({ _id: idBuscado });
			console.log(`the cart searched is the following: ${cart}`);
			return cart;
		} catch (error) {
			console.log(
				`No se pudo obtener el cart ${idBuscado} con moongose: ` + error
			);
			return false;
		}
	}

	async addProductToCart(cart1, product1, quantity1) {
		let searchedIndex = 0;
		let searchedCart = [];
		if (
			product1 !== undefined &&
			cart1 !== undefined &&
			quantity1 !== undefined
		) {
			//check if the productId is valid
			let productExists = await this.getProductById(product1);
			console.log(productExists)
			if (productExists === false) {
				console.log("Non existent product");
				return [false, "Non existent product"];
			}

			//search if the cart exists
			let searchedCart = await this.getCartById(cart1);
			if (searchedCart != false) {
				//search if the product is already in the cart
				//let searchedProduct = this.addProductInCart(searchedCart, product1);
				let product = await cartsModel.find({ _id: cart1, "products.pid":{_id: product1} });
				console.log(product)
				 if (product != false) {
				// 	console.log(productsInCart[searchedProduct]);
				// 	carts[searchedIndex].products[searchedProduct].quant++;
				// 	console.log(productsInCart[searchedProduct]);
				// } else {
				// 	searchedCart.products.push({
				// 		pid: parseInt(product1),
				// 		quant: quantity1,
				// 	});
				return [false, "Non existent cart"];
				}
			} else {
				console.log("Non existent cart");
				return [false, "Non existent cart"];
			}
		} else {
			console.log("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	//lo uso para buscar si el producto existe
	async getProductById(idBuscado) {
		try {
			let product = await productsModel.find({ _id: idBuscado });
			console.log(`the product searched is the following: ${product}`);
			if (product!=={}){
				return true;
			}else{
				return false;
			}
		} catch (error) {
			console.log(
				`No se pudo obtener el producto ${idBuscado} con moongose: ` + error
			);
			return false;
		}
	}

	async addProductInCart(cart, productID) {
		try {
			let product = cart.products.find((producto) => producto.pid === productID);
			console.log(product);
			if (product !== {}) {
				console.log(`the product searched is the following: ${product}`);
				return product;
			} else {
				console.log(`the product searched is contained in the cart`);
				return false;
			}
		}
		catch (error) {
			console.log(
				`No se pudo obtener el producto ${productID} con moongose: ` + error
			);
			return false;
		}
	}
}

let testing = async () => {
	let cartManager1 = new CartManager("./");
	// await cartManager1.NewCart([{pid:1,quant:2},{pid:12,quant:4}]);
	// await cartManager1.NewCart([{pid:2,quant:2},{pid:12,quant:4}]);
	// await cartManager1.NewCart([{pid:2,quant:2},{pid:12,quant:4}]);
	// await cartManager1.NewCart([{pid:8,quant:3},{pid:9,quant:5}]);
	// await cartManager1.getCartById(2);
	await cartManager1.addProductToCart(3, 5, 1);
};

//testing()
