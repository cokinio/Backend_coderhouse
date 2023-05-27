import {Router} from "express";
import {getCartById,postCart,postProductInCart,deleteCart,deleteProductInCart,putCartById,putProductInCart} from "../controller/carts.controller.js"
const router = Router();

router.get("/:cid", getCartById)

router.post("/", postCart)

router.post("/:cid/product/:pid",postProductInCart)

router.delete("/:cid",deleteCart)

router.delete("/:cid/product/:pid", deleteProductInCart)

router.put("/:cid", putCartById)

router.put("/:cid/product/:pid", putProductInCart)


export default router;