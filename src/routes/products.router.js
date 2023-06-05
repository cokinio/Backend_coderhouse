import {Router} from "express";
import { uploader } from "../../utils.js";
import {getProducts, getProductById, postProduct, deleteProductById, updateProductById} from "../controller/products.controller.js"
import { passportCall, authorization } from "../../utils.js";

const router = Router();

router.get("/", getProducts);

router.get("/:pid", getProductById);

router.post("/",passportCall('jwt'),authorization('admin'), uploader.single('thumbnail'),postProduct)

router.delete('/:pid',passportCall('jwt'),authorization('admin'), deleteProductById)

router.put('/:pid',passportCall('jwt'),authorization('admin'), uploader.single('file'),updateProductById)

export default router;