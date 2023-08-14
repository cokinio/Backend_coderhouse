import {Router} from "express";
import {productsView, cartView, ticketView, realTimeProducts, chatView, loginView, registerView,profileView, passwordRecoverView, passwordSetView,usersView} from "../controller/views.controller.js"
import { passportCall, authorization } from "../../utils.js";

const router = Router();

router.get("/products", passportCall('jwt'),authorization('user'),productsView)

router.get('/cart', cartView )

router.get('/ticket', ticketView )

router.get('/realtimeproducts', realTimeProducts)

router.get('/chat', passportCall('jwt'), authorization('user'),chatView);

router.get('/', loginView)

router.get('/register', registerView)

router.get("/profile", passportCall('jwt'), authorization('user'), profileView)

router.get('/passwordRecover', passwordRecoverView)

router.get('/reset', passwordSetView)

router.get('/usuarios', usersView)

export default router;