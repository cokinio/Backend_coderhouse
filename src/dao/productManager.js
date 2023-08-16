import * as fs from 'fs';
import { miLogger } from '../config/logger.js';
const fileName = "productos.json";


export default class ProductManager {
	static cuentaGlobal = 0;

	constructor(path) {
		this.path=path;
	}

	//Metodos
	async addProduct(title1, description1, price1, thumbnail1=null, code1, stock1,category1,status1=true) {
		if (
			title1 !== undefined &&
			description1 !== undefined &&
			price1 !== undefined &&
			category1 !== undefined &&
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
				category: category1,
				status: status1
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

			miLogger.info("Reading file");
			ProductManager.cuentaGlobal=products.length;

			let busquedaCode = products.filter((e) => e.code === code1);
			if (busquedaCode.length > 0) {
				miLogger.info("The product code is already stored in the file");
				return [false, "The product code is already stored in the file"];
			} else {
				ProductManager.cuentaGlobal++;
				producto1.id = ProductManager.cuentaGlobal;
				products.push(producto1);
				//write products in the file
				let data= JSON.stringify(products);
				await fs.promises.writeFile(fileName,data);
				miLogger.info("product succesfully added");
				return [true, producto1.id ];
			}
		} else {
			miLogger.info("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	async getProducts() {
		let jsonString = await fs.promises.readFile(fileName, "utf-8");
		let products = JSON.parse(jsonString);
		return products;
	}

	async getProductById(idBuscado) {
		let jsonString = await fs.promises.readFile(fileName, "utf-8");
		let products = JSON.parse(jsonString);
		let busqueda = products.filter((e) => e.id == idBuscado);
		if (busqueda.length > 0) {
			miLogger.info("the product searched is the following:");
			return busqueda;
		} else {
			miLogger.info("product not found");
			return undefined;
		}
	}

	async updateProduct(idBuscado,productInfo){
		let jsonString = await fs.promises.readFile(fileName, "utf-8");
		let products = JSON.parse(jsonString);
		let busquedaIndex = products.findIndex( (e) => e.id === parseint(idBuscado));
		if (busquedaIndex != -1)  {
			miLogger.info("product searched to update found");
			let searchedObject=products[busquedaIndex];
			let oldId=searchedObject.id;
			Object.keys(productInfo).forEach(key => {
				searchedObject[key]=productInfo[key];
			})
			//in case someone wants to change the id I assign it again
			searchedObject.id=oldId;
			miLogger.info(searchedObject)
			products.splice(busquedaIndex, 1, searchedObject)
			let data= JSON.stringify(products);
			await fs.promises.writeFile(fileName,data);
			miLogger.info("product updated");
			return [true, "product updated" ];
		} else {
			miLogger.info("product not found");
			return [false, "product not found" ];
		}
	}

	async deleteProduct(idBuscado){
		let jsonString = await fs.promises.readFile(fileName, "utf-8");
		let products = JSON.parse(jsonString);
		let busquedaIndex = products.findIndex((e)=> e.id === parseint(idBuscado));
		if (busquedaIndex != -1) {
			miLogger.info("product searched to delete found");
			products.splice(busquedaIndex,1);
			let data= JSON.stringify(products);
			await fs.promises.writeFile(fileName,data);
			miLogger.info("product deleted");
			return [true, "product deleted"]
		} else {
			miLogger.info("product not found");
			return [false, "product not found"]
		}
	}
}

