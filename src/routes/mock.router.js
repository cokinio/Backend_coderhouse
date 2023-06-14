import { Router } from "express";
import {getProducts} from '../controller/mockProducts.controller.js';

const router = Router();

router.get("/", getProducts);

export default router;