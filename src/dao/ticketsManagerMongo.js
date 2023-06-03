import {cartManager1} from "../services/carts.service.js"
import {productManager1} from "../services/products.service.js"
import { ticketsModel } from "../models/ticket.model.js";

export default class TicketManager {
	static cuentaGlobal = 0;

	constructor(path) {
		this.path = path;
	}

	getAll = async () => {
        let orders = await ticketsModel.find();
        return orders.map(order => order.toObject());
    }
    async save (cartId, purchaser) {
		TicketManager.cuentaGlobal++;
		// verifico que este la cantidad de cada uno de los productos productos en stock y armo un array 
		//del ticket y los resto del stock 
		let resultado=await this.TicketProductsList(cartId);
		let products= resultado[0];
		let nonBougthProducts= resultado[1];
		let total= resultado[2];
		 //let products= await this.TicketProductsList(cartId);
		// calculo el precio total del ticket
		
		let order={
			code:Math.ceil(Math.random()*10000),
			purchase_datetime:Date.now(),
			amount: total,
			purchaser: purchaser,
			products: products
		}
        let result = await ticketsModel.create(order);
        return result;
    }

    getById = async (id) => {
        const result = await ticketsModel.findOne({ _id: id });
        return result;
    }

	async TicketProductsList (cartId){
		let cart= await cartManager1.getCartById(cartId);
		let bougthProducts=[];
		let nonBougthProducts=[];
		let total=0;
		let productos=cart.products;
		console.log(typeof(productos))
		 productos.forEach(element => {
			console.log(element);
			console.log(element.quant)
			console.log(element.pid.stock)
			console.log("---------------------");
		
			if (element.quant<=element.pid.stock){
				//tengo suficiente stock y agrego al ticket
				//resto stock del producto
				let newStock=element.pid.stock-element.quant;
				let productToUpdate={
					stock:newStock
				}
				let result= productManager1.updateProduct(element.pid._id,productToUpdate);
			
				// agrego producto al ticket
				bougthProducts.push(element);
				total=total+element.quant*element.pid.price;
				console.log(total)

				//saco los productos del carrito
				let idProduct= element.pid._id.toString();
				console.log(idProduct)
				cartManager1.deleteProductfromCart(cartId, idProduct, element.quant)
			}else{
				//no tengo suficiente stock
				nonBougthProducts.push(element);
			}
		});
		return [bougthProducts, nonBougthProducts, total]
		//return bougthProducts
	}

}