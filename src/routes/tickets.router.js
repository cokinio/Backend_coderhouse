import {Router} from "express";
import {getTickets,createNewTicket} from "../controller/tickets.controller.js"
import { passportCall, authorization } from "../../utils.js";

const router = Router();

router.get("/", getTickets)

router.post("/:cid",passportCall('jwt'),authorization('user'),createNewTicket)


export default router;