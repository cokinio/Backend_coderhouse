import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.models.js";
import mongoose from "mongoose";

export default class CartManager {
	static cuentaGlobal = 0;

	constructor(path) {
		this.path = path;
	}

	//Metodos
	async NewCart(products1, cartId) {
		//console.log(products1);
		console.log(cartId);
		let thereAreNonExistingProducts = 0;
		let NonExistentProduct;
		let cart = {};
		if (products1 !== undefined) {
			//check if all the products exists
			let thereAreNonExistingProducts = await Promise.all(
				products1.map(async (e) => {
					let productExists = await this.getProductById(e.pid);
					return productExists;
				})
			);
			console.log(thereAreNonExistingProducts);
			if (thereAreNonExistingProducts.includes(false)) {
				let indice = thereAreNonExistingProducts.indexOf(false);
				let id = products1[indice].pid;
				console.log(`Product ${id} does not exists`);
				return [false, `Product ${id} does not exists`];
			} else {
				//create a cart
				let idCart = cartId;
				if (cartId === undefined) {
					cart = await cartsModel.create({});
					idCart = cart._id;
				}

				//write products in the file
				cart.products = products1;
				let result = await cartsModel.updateOne({ _id: idCart }, cart);
				let carrito = await cartsModel
					.find({ _id: cart._id })
					.populate("products.pid");
				//let carrito = await cartsModel.find({ _id: cart._id });
				console.log(JSON.stringify(carrito, null, "\t"));
				return [true, idCart];
			}
		} else {
			console.log("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	async getCartById(idBuscado) {
		try {
			let cart = await cartsModel.findOne({ _id: idBuscado });
			//let cart =await cartsModel.findOne({_id:idBuscado}).populate('products.pid')
			//console.log(`the cart searched is the following: ${cart}`);
			cart = cart.toObject();
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
			console.log(productExists);
			if (productExists === false) {
				console.log("Non existent product");
				return [false, "Non existent product"];
			}
			//search if the cart exists
			let searchedCart = await this.getCartById(cart1);
			if (searchedCart != false) {
				//search if the product is already in the cart
				let productAlreadyIncreasedInCart = this.addProductInCart(
					searchedCart,
					product1,
					quantity1,
					1
				);
				let result = await productAlreadyIncreasedInCart;
				if (result !== false) {
					//I already have quant increased by one
					console.log(result);
					let updated = await cartsModel.updateOne(
						{ _id: cart1 },
						result
					);
					console.log(updated);
					return [true, cart1];
				} else {
					//i have to add push the product to the array of prodcuts in cart
					console.log("entre aca");
					let objectCart = searchedCart;
					objectCart.products.push({
						pid: product1,
						quant: quantity1,
					});
					let result = await cartsModel.updateOne(
						{ _id: cart1 },
						objectCart
					);
					return [true, cart1];
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
			let product = await productsModel.findOne({ _id: idBuscado });
			product = product.toObject();
			//console.log(`the product searched is the following: ${product}`);
			if (product !== {}) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log(
				`No se pudo obtener el producto ${idBuscado} con moongose: ` +
					error
			);
			return false;
		}
	}

	async deleteProductfromCart(cart1, product1, quantity1) {
		let searchedIndex = 0;
		let searchedCart = [];
		if (
			product1 !== undefined &&
			cart1 !== undefined &&
			quantity1 !== undefined
		) {
			//check if the productId is valid
			let productExists = await this.getProductById(product1);
			console.log(productExists);
			if (productExists === false) {
				console.log("Non existent product");
				return [false, "Non existent product"];
			}
			//search if the cart exists
			let searchedCart = await this.getCartById(cart1);
			if (searchedCart != false) {
				//search if the product is already in the cart
				let productAlreadyIncreasedInCart = this.addProductInCart(
					searchedCart,
					product1,
					quantity1,
					2
				);
				let result = await productAlreadyIncreasedInCart;
				if (result !== false) {
					//I already have quant decreased by one
					console.log(result);
					let updated = await cartsModel.updateOne(
						{ _id: cart1 },
						result
					);
					console.log(updated);
					return [true, cart1];
				} else {
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

	async deleteCartProducts(cart1) {
		let searchedIndex = 0;
		let searchedCart = [];
		try {
			if (cart1 !== undefined) {
				//search if the cart exists
				let searchedCart = await this.getCartById(cart1);
				if (searchedCart != false) {
					searchedCart.products = [];
					let updated = await cartsModel.updateOne(
						{ _id: cart1 },
						searchedCart
					);
					console.log(cart1);
					return [true, cart1];
				} else {
					console.log("Non existent cart");
					return [false, "Non existent cart"];
				}
			} else {
				console.log("missing input parameters");
				return [false, "missing input parameters"];
			}
		} catch (error) {
			console.log(
				`No se pudo obtener el carrito ${cart1} con moongose: ` +
					error
			);
			return false;
		}
	}


async updateProductInCart(cart1, product1, quantity1) {
	let searchedIndex = 0;
	let searchedCart = [];
	if (
		product1 !== undefined &&
		cart1 !== undefined &&
		quantity1 !== undefined
	) {
		//check if the productId is valid
		console.log(product1)
		typeof(product1)
		let productExists = await this.getProductById(product1);
		console.log(productExists);
		if (productExists === false) {
			console.log("Non existent product");
			return [false, "Non existent product"];
		}
		//search if the cart exists
		let searchedCart = await this.getCartById(cart1);
		if (searchedCart != false) {
			//search if the product is already in the cart
			let productAlreadyUpdatedInCart = this.addProductInCart(
				searchedCart,
				product1,
				parseInt(quantity1),
				3
			);
			let result = await productAlreadyUpdatedInCart;
			if (result !== false) {
				//I already have quant decreased by one
				console.log(result);
				let updated = await cartsModel.updateOne(
					{ _id: cart1 },
					result
				);
				console.log(updated);
				return [true, cart1];
			} else {
				return [false, "product not in cart"];
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


async addProductInCart(cart, productID, quantity, operacion) {
		try {
			console.log(`el cart pasado a addProductInCart es: ${cart}`);
			console.log(typeof cart);
			console.log(Object.keys(cart));
			let products = cart.products;
			//console.log(products);
			let resultado = products.findIndex((producto) => {
				//console.log(Object.keys(producto));
				console.log(producto.pid._id.toString() === productID);
				return producto.pid._id.toString() === productID;
			});
			console.log(resultado);
			if (resultado !== -1) {
				// operacion 1 =sumar
				// operacion 2 = restar
				// operacion 3 = actualizar cantidad
				if (operacion===1) {
					cart.products[resultado].quant =
						cart.products[resultado].quant + quantity;
					console.log(typeof cart);
					return cart;
				} else if (operacion===2) {
					//estoy restando
					if (cart.products[resultado].quant > 0) {
						cart.products[resultado].quant =
							cart.products[resultado].quant - quantity;
						//si me quedo un numero negativo hago que sea cero
						cart.products[resultado].quant < 0
							? (cart.products[resultado].quant = 0)
							: (cart.products[resultado].quant =
									cart.products[resultado].quant);
						//si es cero la cantidad borro el producto del arreglo
						if (cart.products[resultado].quant === 0) {
							cart.products.splice(resultado, 1);
						}
						return cart;
					} else {
						console.log("entre splice");
						cart.products.splice(resultado, 1);
						return cart;
					}
				}else if (operacion===3) {
					console.log("entre en operacion 3")
					cart.products[resultado].quant = quantity;
					return cart;
				}else{
					console.log(
						`la operacion solitada no existe`
					);
					return false;
				}
			} else {
				console.log(
					`the product searched not is contained in the cart`
				);
				return false;
			}
		} catch (error) {
			console.log(
				`No se pudo obtener el producto ${productID} con moongose: ` +
					error
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
