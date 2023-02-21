class ProductManager {
	static cuentaGlobal = 0;

	constructor() {
		this.products = [];
	}

	//Metodos
	addProduct(title1, description1, price1, thumbnail1, code1, stock1) {
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

			let busquedaCode = this.products.filter((e) => e.code === code1);
			if (busquedaCode.length > 0) {
				console.log("el código del producto ya se encuentra cargado");
			} else {
				ProductManager.cuentaGlobal++;
				producto1.id = ProductManager.cuentaGlobal;
				this.products.push(producto1);
			}
		} else {
			console.log("faltan parametros de entrada");
		}
	}

	getProducts() {
		console.log(this.products);
		return this.products;
	}

	getProductById(idBuscado) {
		let busqueda = this.products.filter((e) => e.id === idBuscado);
		if (busqueda.length > 0) {
			return busqueda;
		} else {
			console.log("product not found");
		}
	}
}

// testing

let productManager1 = new ProductManager();
productManager1.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen","abc123",25);
productManager1.addProduct("televisor", "televisor samsung 50 pulgadas",250000, "Sin imagen","SANG25",1);
//le faltan parametros
productManager1.addProduct("bici",10000,"Sin imagen","bi5",1); 
productManager1.getProducts();
//vuelvo a cargar el mismo producto
productManager1.addProduct(	"producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
console.log(productManager1.getProductById(2));
//el id no existe
productManager1.getProductById(5);
