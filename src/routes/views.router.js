import {Router} from "express";
import {productsView, cartView, ticketView, realTimeProducts, chatView, loginView, registerView,profileView, passwordRecoverView, passwordSetView,usersView} from "../controller/views.controller.js"
import { passportCall, authorization } from "../../utils.js";

const router = Router();

router.get("/products", passportCall('jwt'),authorization(['user','premium']),productsView)

router.get('/cart', passportCall('jwt'), authorization(['user','premium']),cartView )

router.get('/ticket', passportCall('jwt'), authorization(['user','premium']),ticketView )

router.get('/realtimeproducts', realTimeProducts)

router.get('/chat', passportCall('jwt'), authorization(['user','premium']),chatView);

router.get('/', loginView)

router.get('/register', registerView)

router.get("/profile", passportCall('jwt'), authorization(['user','premium']), profileView)

router.get('/passwordRecover', passwordRecoverView)

router.get('/reset', passwordSetView)

router.get('/usuarios', passportCall('jwt'), authorization('admin'),usersView)

export default router;