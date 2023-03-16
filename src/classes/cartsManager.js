import * as fs from "fs";
const fileName = "carritos.json";

export default class CartManager {
	static cuentaGlobal = 0;

	constructor(path) {
		this.path = path;
	}

	//Metodos
	async NewCart(products1) {
		if (products1 !== undefined) {
			let cart1 = {id:null, products:[]};
			cart1.products.push(products1);

			// check if the file is already created

			if (!fs.existsSync(fileName)) {
				console.error(
					"The file doesnt exists, we will create one for you"
				);
				let initialData = JSON.stringify([]);
				await fs.promises.writeFile(fileName, initialData);
			}

			// read fileName in order to search if the cart is stored in the file
			let jsonString = await fs.promises.readFile(fileName, "utf-8");
			let carts = JSON.parse(jsonString);

			CartManager.cuentaGlobal++;
			cart1.id = CartManager.cuentaGlobal;
			carts.push(cart1);
			//write products in the file
			let data = JSON.stringify(carts);
			await fs.promises.writeFile(fileName, data);
			console.log("cart succesfully added");
			return [true, cart1.id];
		} else {
			console.log("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	async getCartById(idBuscado) {
		let jsonString = await fs.promises.readFile(fileName, "utf-8");
		let products = JSON.parse(jsonString);
		let busqueda = products.filter((e) => e.id == idBuscado);
		if (busqueda.length > 0) {
			console.log("the cart searched is the following:");
			console.log(busqueda);
			return busqueda;
		} else {
			console.log("product not found");
			return undefined;
		}
	}

}
	
let testing= async ()=> {
	let cartManager1 = new CartManager("./");
	await cartManager1.NewCart([{pid:5,quant:2},{pid:12,quant:4}]);
	await cartManager1.NewCart([{pid:8,quant:3},{pid:9,quant:5}]);
	await cartManager1.getCartById(2);
}	
		

testing()