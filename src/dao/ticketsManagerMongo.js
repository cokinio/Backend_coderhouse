import { cartManager1 } from "../services/carts.service.js";
import { productManager1 } from "../services/products.service.js";
import { ticketsModel } from "../models/ticket.model.js";

export default class TicketManager {
	static cuentaGlobal = 0;

	constructor(path) {
		this.path = path;
	}

	getAll = async () => {
		let orders = await ticketsModel.find();
		return orders.map((order) => order.toObject());
	};

	save = async (cartId, purchaser) =>{
		let codigo= await ticketsModel.find().count();
		// verifico que este la cantidad de cada uno de los productos productos en stock y armo un array
		//del ticket y los resto del stock
		let resultado = await this.TicketProductsList(cartId);
		let products = resultado[0];
		let nonBougthProducts = resultado[1];
		let total = resultado[2];
		//actualizo el cart con nonBougthProducts
		let cartUpdate= await cartManager1.updateCart(nonBougthProducts,cartId)
		//let products= await this.TicketProductsList(cartId);
		// calculo el precio total del ticket

		let order = {
			code:codigo,
			purchase_datetime: Date.now(),
			amount: total,
			purchaser: purchaser.email,
			products: products,
		};
		let result = await ticketsModel.create(order);
		return result;
	}

	getById = async (id) => {
		const result = await ticketsModel.findOne({ _id: id }).lean();
		return result;
	};

	TicketProductsList = async (cartId) => {
		let cart = await cartManager1.getCartById(cartId);
		let bougthProducts = [];
		let nonBougthProducts = [];
		let total = 0;
		let productos = cart.products;
		let reversedProductos= productos.map(item => item).reverse();
		Promise.all(reversedProductos.map(async (element) => {

			if (element.quant <= element.pid.stock) {

				//tengo suficiente stock y agrego al ticket
				console.log(`entre if ${element.pid.title} con if ${element.pid._id}` )
				
					// agrego producto al ticket
					bougthProducts.push(element);
					total = total + element.quant * element.pid.price;
					//console.log(total);

					// //saco los productos del carrito
					// let idProduct = element.pid._id.toString();
					// let update = await cartManager1.deleteProductfromCart(
					// 	cartId,
					// 	idProduct,
					// 	element.quant
					// );

					//resto stock del producto
					let newStock = element.pid.stock - element.quant;
					let productToUpdate = {
						stock: newStock,
					};
					 let result = await productManager1.updateProduct(
						element.pid._id,
						productToUpdate
					);

			} else {
				//no tengo suficiente stock
				nonBougthProducts.push(element);
			}
		}));
		return [bougthProducts, nonBougthProducts, total];
		//return bougthProducts
	}

}
