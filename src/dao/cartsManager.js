import * as fs from "fs";
import { miLogger } from '../config/logger.js';

const fileName = "carritos.json";
const existingProducts = "productos.json";

export default class CartManager {
	static cuentaGlobal = 0;

	constructor(path) {
		this.path = path;
	}

	//Metodos
	async NewCart(products1) {
		let thereAreNonExistingProducts=false;
		let NonExistentProduct=-1;
		
		if (products1 !== undefined) {
			let cart1 = {id:null, products:[]};

			//check if all the products exists

			await products1.reduce(async (e) => {
				miLogger.info(e.pid)
				let productExists= await this.getProductById(e.pid);
				if (productExists===false){
					console.error(`Product ${e.pid} does not exists`);
					thereAreNonExistingProducts=true;
					NonExistentProduct=e.pid;

				}
			});

			
			if (thereAreNonExistingProducts===true){
				return [false, `Product ${NonExistentProduct} does not exists`];
			}

			cart1.products=products1;
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
			let cartsLength=carts.length;
			if (cartsLength>0){
				let lastCart=carts[cartsLength-1];
				let lastId=lastCart.id;
				CartManager.cuentaGlobal=lastId
				CartManager.cuentaGlobal++;
			}else{
				CartManager.cuentaGlobal++;
			}
			cart1.id = CartManager.cuentaGlobal;
			carts.push(cart1);
			//write products in the file
			let data = JSON.stringify(carts);
			await fs.promises.writeFile(fileName, data);
			miLogger.info("cart succesfully added");
			return [true, cart1.id];
		} else {
			miLogger.info("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	async getCartById(idBuscado) {
		let jsonString = await fs.promises.readFile(fileName, "utf-8");
		let products = JSON.parse(jsonString);
		let busqueda = products.filter((e) => e.id == parseInt(idBuscado));
		if (busqueda.length > 0) {
			miLogger.info("the cart searched is the following:");
			miLogger.info(busqueda)
			return busqueda;
		} else {
			miLogger.info("cart not found");
			return null;
		}
	}

	async addProductToCart(cart1,product1, quantity1) {
		let searchedIndex=0;
		let searchedCart=[];
		if (product1 !== undefined && cart1!== undefined && quantity1!== undefined) {
			//check if the productId is valid
			let productExists= await this.getProductById(product1);
			if (productExists===false){
				miLogger.info("Non existent product");
				return [false, "Non existent product"];
			}

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
			let cartsLength=carts.length;
			if (cartsLength>0){
				
				//search for the index of the cart id
				searchedIndex = carts.findIndex((e) => e.id == cart1);
				searchedCart=carts[searchedIndex];
				
				//search if the cart exists
				if (searchedIndex != -1){
					//search if the product is already in the cart
					let productsInCart=searchedCart.products;
					miLogger.info(productsInCart)
					let searchedProduct = productsInCart.findIndex((e) => e.pid ==product1 );
						//the product is already in the cart
						miLogger.info(searchedProduct)
						if (searchedProduct != -1){
							miLogger.info(productsInCart[searchedProduct])
							carts[searchedIndex].products[searchedProduct].quant++;
							miLogger.info(productsInCart[searchedProduct])
						}else{
						searchedCart.products.push({pid:parseInt(product1), quant:quantity1})
						}
					
				}else{
					miLogger.info("Non existent cart");
					return [false, "Non existent cart"];
				}
				
			}else{
				CartManager.cuentaGlobal++;
				searchedCart.id = CartManager.cuentaGlobal;
				searchedCart.products.push([{pid:product1, quant:quantity1}]);
			}
			
			carts[searchedIndex]=searchedCart;
			//write products in the file
			let data = JSON.stringify(carts);
			await fs.promises.writeFile(fileName, data);
			miLogger.info("product succesfully added");
			return [true, cart1.id];
		} else {
			miLogger.info("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	async getProductById(idBuscado) {
		let jsonString = await fs.promises.readFile(existingProducts, "utf-8");
		let products = JSON.parse(jsonString);
		let busqueda = products.filter((e) => e.id == idBuscado);
		if (busqueda.length > 0) {
			return true;
		} else {
			return false;
		}
	}
}
	
let testing= async ()=> {
	let cartManager1 = new CartManager("./");
	// await cartManager1.NewCart([{pid:1,quant:2},{pid:12,quant:4}]);
	// await cartManager1.NewCart([{pid:2,quant:2},{pid:12,quant:4}]);
	// await cartManager1.NewCart([{pid:2,quant:2},{pid:12,quant:4}]);
	// await cartManager1.NewCart([{pid:8,quant:3},{pid:9,quant:5}]);
	// await cartManager1.getCartById(2);
	await cartManager1.addProductToCart(3,5,1)
}	
		

//testing()