import {getAllProducts,getProductUsingId,postNewProduct,deleteProduct,UpdateProductUsingId} from "../services/products.service.js"

export const getProducts =async (req,res)=>{
    let { limit,page,category,disp,sort } = req.query;
    page = parseInt(req.query.page);
	let products = await getAllProducts(limit,page,category,disp,sort);
    res.send(products);
}

export const getProductById =async (req,res)=>{
    console.log(req.params.pid);
    let productId=req.params.pid;
	let productById = await getProductUsingId(productId);
	if (productById != null) {
		res.send(productById);
	} else {
		res.send(`el producto con ID ${req.params.pid} no existe`);
	}
}

export const postProduct =async (req,res)=>{
    let product=req.body;
    if (req.file) {
        product.thumbnail = req.file.path;
    }
    //console.log(product)
    let {title, description, price, thumbnail, code, stock, category, status}=product;
    let wasProductAddedSuccesfully = await postNewProduct(title, description, price, thumbnail, code, stock,category,status);
    if (wasProductAddedSuccesfully[0]===true) {
        res.send({ status: "Success", message: `Producto agregado con exito con ID:${wasProductAddedSuccesfully[1]}`});
    } else{
        res.status(400).send({ status: "Error", message: wasProductAddedSuccesfully[1] });
    }
}

export const deleteProductById =async (req,res)=>{
    console.log(req.params);
    let pid = req.params.pid;
    let wasProductDeletedSuccesfully= await deleteProduct(pid);
    if (wasProductDeletedSuccesfully[0]===true) {
        res.send({ status: "Success", message: wasProductDeletedSuccesfully[1]});
    } else{
        res.status(400).send({ status: "Error", message: wasProductDeletedSuccesfully[1] });
    }
}

export const updateProductById =async (req,res)=>{
    let product=req.body;
    if (req.file) {
        product.thumbnail = req.file.path;
    }
    let pid = req.params.pid;
    let wasProductUpdatedSuccesfully = await UpdateProductUsingId(pid,product);
    if ( wasProductUpdatedSuccesfully[0]===true) {
        res.send({ status: "Success", message: wasProductUpdatedSuccesfully[1] });
    } else{
        res.status(400).send({ status: "Error", message: wasProductUpdatedSuccesfully[1] });
    }
}