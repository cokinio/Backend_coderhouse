import {productsModel} from "../models/products.models.js";


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

	async getProducts() {
		try {
            let products = await productsModel.find()
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

	async deleteProduct(idBuscado){
        try {
            const idString= idBuscado;
            console.log(idString)
            let searchedObject = await productsModel.find({_id:`${idString}`})
            console.log(searchedObject)
            if (searchedObject != undefined)  {
			console.log("product searched to delete found");
            await productsModel.deleteOne({_id: idString});
			console.log("product deleted");
			return [true, "product deleted"]
		} else {
			console.log("product not found");
			return [false, "product not found"]
		}
    }catch(error) {
        console.log(`No se pudo borrar el producto ${idBuscado} con moongose porque no existe: `+ error);
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