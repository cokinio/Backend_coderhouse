const fs = require("fs");
const fileName = "products.txt";

export default class ProductManager {
	static cuentaGlobal = 0;

	constructor(path) {
		this.path=path;
	}

	//Metodos
	async addProduct(title1, description1, price1, thumbnail1, code1, stock1) {
		if (
			title1 !== undefined &&
			description1 !== undefined &&
			price1 !== undefined &&
			thumbnail1 !== undefined &&
			code1 !== undefined &&
			stock1 !== undefined
		) {
			let producto1 = {
				title: title1,
				description: description1,
				price: price1,
				thumbnail: thumbnail1,
				code: code1,
				stock: stock1,
			};

			// check if the file is already created

			if (!fs.existsSync(fileName)) {
				console.error("The file doesnt exists, we will create one for you");
				let initialData= JSON.stringify([]);
				await fs.promises.writeFile(fileName,initialData);
			} 
		
			// read fileName in order to search if the product is stored in the file
			let jsonString = await fs.promises.readFile(fileName, "utf-8");
			let products = JSON.parse(jsonString);

			console.log("Reading file");
			ProductManager.cuentaGlobal=products.length;

			let busquedaCode = products.filter((e) => e.code === code1);
			if (busquedaCode.length > 0) {
				console.log("The product code is already stored in the file");
			} else {
				ProductManager.cuentaGlobal++;
				producto1.id = ProductManager.cuentaGlobal;
				products.push(producto1);
				//write products in the file
				let data= JSON.stringify(products);
				await fs.promises.writeFile(fileName,data);
				console.log("product succesfully added");
			}
		} else {
			console.log("missing input parameters");
		}
	}

	async getProducts() {
		let jsonString = await fs.promises.readFile(fileName, "utf-8");
		let products = JSON.parse(jsonString);
		console.log(products);
		return products;
	}

	async getProductById(idBuscado) {
		let jsonString = await fs.promises.readFile(fileName, "utf-8");
		let products = JSON.parse(jsonString);
		let busqueda = products.filter((e) => e.id === idBuscado);
		if (busqueda.length > 0) {
			console.log("the product searched is the following:");
			return busqueda;
		} else {
			console.log("product not found");
		}
	}

	async updateProduct(idBuscado, campo, valor){
		let jsonString = await fs.promises.readFile(fileName, "utf-8");
		let products = JSON.parse(jsonString);
		let busquedaIndex = products.findIndex( (e) => e.id === idBuscado);
		if (busquedaIndex != -1)  {
			console.log("product searched to update found");
			let searchedObject=products[busquedaIndex]
			searchedObject[campo]=valor;
			products.splice(busquedaIndex, 1, searchedObject)
			console.log(products);
			let data= JSON.stringify(products);
			await fs.promises.writeFile(fileName,data);
			console.log("product updated");
		} else {
			console.log("product not found");
		}
	}

	async deleteProduct(idBuscado){
		let jsonString = await fs.promises.readFile(fileName, "utf-8");
		let products = JSON.parse(jsonString);
		let busquedaIndex = products.findIndex((e)=> e.id === idBuscado);
		console.log(busquedaIndex)
		if (busquedaIndex != -1) {
			console.log("product searched to delete found");
			products.splice(busquedaIndex,1);
			console.log(products);
			let data= JSON.stringify(products);
			await fs.promises.writeFile(fileName,data);
			console.log("product deleted");
		} else {
			console.log("product not found");
		}
	}
}

// testing
let testing= async ()=> {
	let productManager1 = new ProductManager("./");
	await productManager1.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen","abc123",25);
	await productManager1.addProduct("televisor", "televisor samsung 50 pulgadas",250000, "Sin imagen","SANG25",1);
	//parameters missing
	await productManager1.addProduct("bici",10000,"Sin imagen","bi5",1); 
	await productManager1.getProducts();
	//same product added again
	await productManager1.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
	console.log(await productManager1.getProductById(2));
	// //el id no existe
	console.log(await productManager1.getProductById(5));
	//agrego producto 3
	await productManager1.addProduct("bici","la mejor bici",9999,"Sin imagen","bi5",1);
	//actualizacion de producto 3
	await productManager1.updateProduct(3,"price",3000);
	//elimino producto 1
	await productManager1.deleteProduct(1);

}


//testing();