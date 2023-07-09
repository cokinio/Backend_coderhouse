import {productsModel} from "../models/products.models.js";
import { miLogger } from "../config/logger.js";

export default class ProductManager {
	static cuentaGlobal = 0;

	constructor(path) {
		this.path=path;
	}

	//Metodos
	async addProduct(title1, description1, price1, thumbnail1=null, code1, stock1,category1,status1=true,owner) {
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
				status: status1,
				owner:owner
			};
            try {
                let producto = await productsModel.create(producto1)
                return [true, producto.id ];
            } catch (error) {
                console.error("No se pudo crear producto con moongose: " + error);
                return [false, "No se pudo crear producto con moongose "+error];
            }
        }else{
			return [false, "missing input parameters "];
		}
	}

	async getProducts(limitQuant,pageSearched,category1,stockMin1,sort1) {
		if(!pageSearched) pageSearched=1;
		if(!limitQuant) limitQuant=10;
		let busqueda={};

		if (category1){
		 busqueda.category=category1;
		}else{
			category1="";
		}	
		if (stockMin1) {
			busqueda.stock={$gt: parseInt(stockMin1)}}
			else{
				stockMin1=0;
			} ;
		if (!sort1){
			sort1=-1;
		}

		//console.log(busqueda)
		try {
			let products = await productsModel.paginate(busqueda,{page:pageSearched ,limit:limitQuant,sort:{price:sort1},lean:true})
			products.prevLink =products.hasPrevPage?`http://localhost:8080/products?page=${products.prevPage}&category=${category1}&sort=${sort1}&limit=${limitQuant}&stockMin=${stockMin1}`:'';
			products.nextLink = products.hasNextPage?`http://localhost:8080/products?page=${products.nextPage}&category=${category1}&sort=${sort1}&limit=${limitQuant}&stockMin=${stockMin1}`:'';
			products.isValid= !(pageSearched<=0||pageSearched>products.totalPages)
			return products;
        } catch (error) {
            console.error("No se pudo obtener productos con moongose: " + error);
        }
	}

	async getProductById(idBuscado) {
        try {
	    let product = await productsModel.find({_id:idBuscado})
		console.log(`the product searched is the following: ${product}`);
		return product;
        }
		catch(error) {
			console.log(`No se pudo obtener el producto ${idBuscado} con moongose: `+ error);
			return undefined;
		}
	}

	async updateProduct(idBuscado,productInfo){
        try {
            const idString= idBuscado;
            console.log(productInfo);
            let searchedObject = await productsModel.find({_id:`${idString}`})
            //console.log(`the product searched is the following: ${searchedObject}`);
			if (searchedObject != undefined)  {
                console.log("product searched to update found");
                console.log(productInfo);
                await productsModel.updateOne({"_id" : idString} ,productInfo);
                console.log("product updated");
                return [true, "product updated" ];
		    } else {
			console.log("product not found");
			return [false, "product not found" ];
		    }
    }catch(error) {
        console.log(`No se pudo actualizar el producto ${idBuscado} con moongose: `+ error);
        return [false, `couldn´t retrieve product ${error}` ];
    }
	}

	async deleteProduct(idBuscado,user){
        try {
            const idString= idBuscado;
            miLogger.info(idString)
            let searchedObject = await productsModel.findOne({_id:`${idString}`})
            miLogger.info(searchedObject)
			
            if (searchedObject != undefined)  {
				let producto =searchedObject.toObject();
				miLogger.info("product searched to delete found");
				if (producto.owner===user.role || producto.owner===user.email){
				await productsModel.deleteOne({_id: idString});
				miLogger.info("product deleted");
				return [true, "product deleted"]
				}else{
					return [false, `user has not permissions to delete product` ];
				}
		} else {
			miLogger.info("product not found");
			return [false, "product not found"]
		}
    }catch(error) {
        miLogger.info(`No se pudo borrar el producto ${idBuscado} con moongose porque no existe: `+ error);
        return [false, `couldn´t delete product ${error}` ];
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