//import ProductManager from "../dao/productManager.js";
import ProductManager from "../dao/productManagerMongo.js";
import {Router} from "express";
import { uploader } from "../../utils.js";
const router = Router();

export let productManager1 = new ProductManager("./");

router.get("/", async (req, res) => {
    let { limit,page,category,disp,sort } = req.query;
    page = parseInt(req.query.page);
	let products = await productManager1.getProducts(limit,page,category,disp,sort);
    res.send(products);
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


router.post("/",uploader.single('thumbnail'), async (req,res)=>{
    let product=req.body;
    if (req.file) {
        product.thumbnail = req.file.path;
    }
    console.log(product)
    let {title, description, price, thumbnail, code, stock, category, status}=product;
    let wasProductAddedSuccesfully = await productManager1.addProduct(title, description, price, thumbnail, code, stock,category,status);
    console.log(wasProductAddedSuccesfully)
    if (wasProductAddedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Producto agregado con exito con ID:${wasProductAddedSuccesfully[1]}`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductAddedSuccesfully[1] });
    }
})

router.delete('/:pid', async (req,res)=>{
    console.log(req.params);
    let pid = req.params.pid;
    let wasProductDeletedSuccesfully= await productManager1.deleteProduct(pid);
    if (wasProductDeletedSuccesfully[0]===true) {
        res.send({ status: "Success", message: wasProductDeletedSuccesfully[1]});
    } else{
        res.status(400).send({ status: "Error", message: wasProductDeletedSuccesfully[1] });
    }
})

router.put('/:pid',uploader.single('file'), async (req, res)=>{
    let product=req.body;
    if (req.file) {
        product.thumbnail = req.file.path;
    }
    let pid = req.params.pid;
    let wasProductUpdatedSuccesfully = await productManager1.updateProduct(pid,product);
    if ( wasProductUpdatedSuccesfully[0]===true) {
        res.send({ status: "Success", message: wasProductUpdatedSuccesfully[1] });
    } else{
        res.status(400).send({ status: "Error", message: wasProductUpdatedSuccesfully[1] });
    }
})

export default router;