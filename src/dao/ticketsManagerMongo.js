import cartManager1 from "../services/carts.service.js"
import { ticketsModel } from "../models/tickets.models.js";

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
		let products=TicketProductsList(cartId);
		// calculo el precio total del ticket
		let total;
		
		let order={
			code:TicketManager.cuentaGlobal,
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

	async #TicketProductsList (cartId){
		let cart= cartManager1.getCart(cartId);
		cart.products.forEach(element => {
			if (element.quant<=element.pid.stock){
				//tengo suficiente stock y agrego al ticket
			}else{
				//no tengo suficiente stock
			}
		});
	}
}