import express from "express";
import ProductManager from "./proyecto.js";
const app = express();
const PORT = 80;

let productManager1 = new ProductManager("./");

app.get("/products", async (req, res) => {
	let { limit } = req.query;
	let response = await productManager1.getProducts();

	if (limit != undefined) {
		let slicedResponse = response.slice(0, limit);
		res.send(slicedResponse);
	} else {
		res.send(response);
	}
});

app.get("/products/:pid", async (req, res) => {
	console.log(req.params.pid);
	let productById = await productManager1.getProductById(req.params.pid);
	if (productById != null) {
		res.send(productById);
	} else {
		res.send(`el producto con ID ${req.params.pid} no existe`);
	}
});

app.get("/", (req, res) => {
	res.send("hola leo!");
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
