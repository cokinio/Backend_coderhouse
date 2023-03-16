import ProductManager from "../classes/productManager.js";
import {Router} from "express";
const router = Router();

let productManager1 = new ProductManager("./");

router.get("/", async (req, res) => {
	let { limit } = req.query;
	let response = await productManager1.getProducts();

	if (limit != undefined) {
		let slicedResponse = response.slice(0, limit);
		res.send(slicedResponse);
	} else {
		res.send(response);
	}
});

router.get("/:pid", async (req, res) => {
	console.log(req.params.pid);
	let productById = await productManager1.getProductById(req.params.pid);
	if (productById != null) {
		res.send(productById);
	} else {
		res.send(`el producto con ID ${req.params.pid} no existe`);
	}
});


router.post("/",async (req,res)=>{
    let product=req.body;
    console.log(product)
    let {title, description, price, thumbnail, code, stock}=product;
    let wasProductAddedSuccesfully = await productManager1.addProduct(title, description, price, thumbnail, code, stock);
    if (wasProductAddedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Producto agregado con exito con ID:${wasProductAddedSuccesfully[1]}`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductAddedSuccesfully[1] });
    }
})

router.delete('/:pid', async (req,res)=>{
    console.log("Llamado a api de DELETE product");
    console.log(req.params);
    let pid = parseInt(req.params.pid);
    let wasProductDeletedSuccesfully= await productManager1.deleteProduct(pid);
    if (wasProductDeletedSuccesfully[0]===true) {
        res.send({ status: "Success", message: wasProductDeletedSuccesfully[1]});
    } else{
        res.status(400).send({ status: "Error", message: wasProductDeletedSuccesfully[1] });
    }
})

router.put('/:pid',async (req, res)=>{
    let product=req.body;
    //console.log(product)
    //console.log(req.params);
    let pid = parseInt(req.params.pid);
    let wasProductUpdatedSuccesfully = await productManager1.updateProduct(pid,product);
    if ( wasProductUpdatedSuccesfully[0]===true) {
        res.send({ status: "Success", message: wasProductUpdatedSuccesfully[1] });
    } else{
        res.status(400).send({ status: "Error", message: wasProductUpdatedSuccesfully[1] });
    }
})

export default router;