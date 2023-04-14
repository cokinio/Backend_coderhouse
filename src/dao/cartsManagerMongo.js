import {cartsModel} from "../models/carts.model.js"
import {productsModel} from "../models/products.models.js";

export default class CartManager {
	static cuentaGlobal = 0;

	constructor(path) {
		this.path = path;
	}

	//Metodos
	async NewCart(products1) {
	
		let thereAreNonExistingProducts=false;

		if (products1 !== undefined) {
			
			//check if all the products exists

			await products1.reduce(async (e) => {
				console.log(e.pid)
				let productExists= await this.getProductById(e.pid);
				console.log(productExists)
				if (productExists!== true ){
					console.error(`Product ${e.pid} does not exists`);
					thereAreNonExistingProducts=true;
					NonExistentProduct=e.pid;

				}
			});

			
			if (thereAreNonExistingProducts===true){
				return [false, `Product ${NonExistentProduct} does not exists`];
			}

			//create a cart
			let cart= await cartsModel.create({});
			console.log(cart)
			//write products in the file
			cart.products.push({products1});
			let result = cartsModel.updateOne({_id:cart._id,cart})
			return [true, cart._id];
		} else {
			console.log("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	async getCartById(idBuscado) {
		let jsonString = await fs.promises.readFile(fileName, "utf-8");
		let products = JSON.parse(jsonString);
		let busqueda = products.filter((e) => e.id == parseInt(idBuscado));
		if (busqueda.length > 0) {
			console.log("the cart searched is the following:");
			console.log(busqueda)
			return busqueda;
		} else {
			console.log("cart not found");
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
				console.log("Non existent product");
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
					console.log(productsInCart)
					let searchedProduct = productsInCart.findIndex((e) => e.pid ==product1 );
						//the product is already in the cart
						console.log(searchedProduct)
						if (searchedProduct != -1){
							console.log(productsInCart[searchedProduct])
							carts[searchedIndex].products[searchedProduct].quant++;
							console.log(productsInCart[searchedProduct])
						}else{
						searchedCart.products.push({pid:parseInt(product1), quant:quantity1})
						}
					
				}else{
					console.log("Non existent cart");
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
			console.log("product succesfully added");
			return [true, cart1.id];
		} else {
			console.log("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	async getProductById(idBuscado) {
		try {
			let product = await productsModel.find({_id:idBuscado})
			console.log(`the product searched is the following: ${product}`);
			return true;
			}
			catch(error) {
				console.log(`No se pudo obtener el producto ${idBuscado} con moongose: `+ error);
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