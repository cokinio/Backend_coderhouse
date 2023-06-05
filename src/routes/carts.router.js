import {Router} from "express";
import {getCartById,postCart,postProductInCart,deleteCart,deleteProductInCart,putCartById,putProductInCart} from "../controller/carts.controller.js"
import { passportCall, authorization } from "../../utils.js";

const router = Router();

router.get("/:cid", getCartById)

router.post("/", postCart)

router.post("/:cid/product/:pid",passportCall('jwt'),authorization('user'),postProductInCart)

router.delete("/:cid",passportCall('jwt'),authorization('admin'),deleteCart)

router.delete("/:cid/product/:pid",passportCall('jwt'),authorization('user'), deleteProductInCart)

router.put("/:cid", putCartById)

router.put("/:cid/product/:pid", putProductInCart)


export default router;