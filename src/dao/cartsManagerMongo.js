import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.models.js";
import { miLogger } from "../config/logger.js";

export default class CartManager {
	static cuentaGlobal = 0;

	constructor(path) {
		this.path = path;
	}

	//Metodos
	async NewCart(products1, cartId) {
		miLogger.info(cartId);
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
			miLogger.info(thereAreNonExistingProducts);
			if (thereAreNonExistingProducts.includes(false)) {
				let indice = thereAreNonExistingProducts.indexOf(false);
				let id = products1[indice].pid;
				miLogger.info(`Product ${id} does not exists`);
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
				miLogger.info(JSON.stringify(carrito, null, "\t"));
				return [true, idCart];
			}
		} else {
			miLogger.info("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	async getCartById(idBuscado) {
		try {
			let cart = await cartsModel.findOne({ _id: idBuscado });
			cart = cart.toObject();
			return cart;
		} catch (error) {
			miLogger.info(
				`No se pudo obtener el cart ${idBuscado} con moongose: ` + error
			);
			return false;
		}
	}

	async addProductToCart(cart1, product1, quantity1,user) {
		let searchedIndex = 0;
		let searchedCart = [];
		if (
			product1 !== undefined &&
			cart1 !== undefined &&
			quantity1 !== undefined
		) {
			//check if the productId is valid
			let productExists = await this.getProductById(product1);
			miLogger.info(productExists);
			if (productExists === false) {
				miLogger.info("Non existent product");
				return [false, "Non existent product"];
			}
			let product = await productsModel.findOne({ _id: product1});
			product = product.toObject();
			miLogger.info(product)
			miLogger.info(user.email)
			miLogger.info(user.role)
			if (product.owner===user.email && user.role==='premium'){
				return [false, "un usuario premium no puede agregar un producto suyo"];
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
					let updated = await cartsModel.updateOne(
						{ _id: cart1 },
						result
					);
					miLogger.info(updated);
					return [true, cart1];
				} else {
					//i have to add push the product to the array of prodcuts in cart
					miLogger.info("entre aca");
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
				miLogger.info("Non existent cart");
				return [false, "Non existent cart"];
			}
		} else {
			miLogger.info("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	//lo uso para buscar si el producto existe
	async getProductById(idBuscado) {
		try {
			let product = await productsModel.findOne({ _id: idBuscado });
			product = product.toObject();
			if (product !== {}) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			miLogger.info(
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
			miLogger.info(`el producto ${product1} esta en el cart ${productExists}`);
			if (productExists === false) {
				miLogger.info("Non existent product");
				return [false, "Non existent product"];
			}
			//search if the cart exists
			let searchedCart = await this.getCartById(cart1);
			if (searchedCart != false) {
				//search if the product is already in the cart
				let productAlreadyIncreasedInCart = await this.addProductInCart(
					searchedCart,
					product1,
					quantity1,
					2
				);
				let result = productAlreadyIncreasedInCart;
				if (result !== false) {
					//I already have quant decreased by one
					miLogger.info(Object.keys(result))
					miLogger.info(`El carrito quedo la siguiente forma`);
					miLogger.info(result.products)
					let updated = await cartsModel.updateOne(
						{ _id: cart1 },
						result
					);
					miLogger.info(updated);
					miLogger.info("-------------------------------")
					miLogger.info(`actualice el cart`)
					return [true, cart1];
				} else {
				}
			} else {
				miLogger.info("Non existent cart");
				return [false, "Non existent cart"];
			}
		} else {
			miLogger.info("missing input parameters");
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
					miLogger.info(cart1);
					return [true, cart1];
				} else {
					miLogger.info("Non existent cart");
					return [false, "Non existent cart"];
				}
			} else {
				miLogger.info("missing input parameters");
				return [false, "missing input parameters"];
			}
		} catch (error) {
			miLogger.info(
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
		let productExists = await this.getProductById(product1);
		if (productExists === false) {
			miLogger.info("Non existent product");
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
				miLogger.info(result);
				let updated = await cartsModel.updateOne(
					{ _id: cart1 },
					result
				);
				miLogger.info(updated);
				return [true, cart1];
			} else {
				return [false, "product not in cart"];
			}
		} else {
			miLogger.info("Non existent cart");
			return [false, "Non existent cart"];
		}
	} else {
		miLogger.info("missing input parameters");
		return [false, "missing input parameters"];
	}
}


async addProductInCart(cart, productID, quantity, operacion) {
		try {
			miLogger.info(`el cart pasado a addProductInCart es: `);
			miLogger.info(cart)
			miLogger.info(typeof cart);
			miLogger.info(Object.keys(cart));
			let products = cart.products;
			let resultado = await products.findIndex((producto) => {
				return producto.pid._id.toString() === productID;
			});
			miLogger.info(`El producto ${productID} se encuentra en la posicion ${resultado} del carrito`);
			if (resultado !== -1) {
				// operacion 1 =sumar
				// operacion 2 = restar
				// operacion 3 = actualizar cantidad
				if (operacion===1) {
					cart.products[resultado].quant =
						cart.products[resultado].quant + quantity;
						miLogger.info(typeof cart);
					return cart;
				} else if (operacion===2) {
					//estoy restando
					miLogger.info("entre operacion 2 ")
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
							miLogger.info(`borro el producto de la posicon ${resultado} del cart`)
							miLogger.info(cart.products)
						}
						return cart;
					} else {
						miLogger.info("entre splice");
						cart.products.splice(resultado, 1);
						return cart;
					}
				}else if (operacion===3) {
					miLogger.info("entre en operacion 3")
					cart.products[resultado].quant = quantity;
					return cart;
				}else{
					miLogger.info(
						`la operacion solitada no existe`
					);
					return false;
				}
			} else {
				miLogger.info(
					`the product searched not is contained in the cart`
				);
				return false;
			}
		} catch (error) {
			miLogger.info(
				`No se pudo obtener el producto ${productID} con moongose: ` +
					error
			);
			return false;
		}
	}



	async updateCart(products1, cartId) {
		miLogger.info(products1);
		miLogger.info(cartId);
		let thereAreNonExistingProducts = 0;
		let NonExistentProduct;
		let cart = {};
		miLogger.info(products1.length)
		if (products1.length !== 0) {
			//check if all the products exists
			let thereAreNonExistingProducts = await Promise.all(
				products1.map(async (e) => {
					let productExists = await this.getProductById(e.pid);
					return productExists;
				})
			);
			miLogger.info(thereAreNonExistingProducts);
			if (thereAreNonExistingProducts.includes(false)) {
				let indice = thereAreNonExistingProducts.indexOf(false);
				let id = products1[indice].pid;
				miLogger.info(`Product ${id} does not exists`);
				return [false, `Product ${id} does not exists`];
			} else {
				//create a cart
				let idCart = cartId;

				//write products in the file
				cart.products = products1;
				let result = await cartsModel.updateOne({ _id: idCart }, cart);
				let carrito = await cartsModel
					.find({ _id: cart._id })
					.populate("products.pid");
				//let carrito = await cartsModel.find({ _id: cart._id });
				miLogger.info(JSON.stringify(carrito, null, "\t"));
				return [true, idCart];
			}
		} else {
			//write products in the file
			cart.products = products1;
			let result = await cartsModel.updateOne({ _id: cartId }, cart);
			let carrito = await cartsModel
				.find({ _id: cart._id })
				.populate("products.pid");
			//let carrito = await cartsModel.find({ _id: cart._id });
			miLogger.info(JSON.stringify(carrito, null, "\t"));
			return [true];
		}
	}

}

