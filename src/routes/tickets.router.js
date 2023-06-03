import {Router} from "express";
import {getTickets,createNewTicket} from "../controller/tickets.controller.js"
const router = Router();

router.get("/", getTickets)

router.post("/:cid",createNewTicket)


export default router;