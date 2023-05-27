import {Router} from "express";
import { uploader } from "../../utils.js";
import {getProducts, getProductById, postProduct, deleteProductById, updateProductById} from "../controller/products.controller.js"
const router = Router();

router.get("/", getProducts);

router.get("/:pid", getProductById);

router.post("/",uploader.single('thumbnail'),postProduct)

router.delete('/:pid', deleteProductById)

router.put('/:pid',uploader.single('file'),updateProductById)

export default router;