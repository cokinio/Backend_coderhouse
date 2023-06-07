import { Router } from "express";
import {sendEmail} from '../controller/email.controller.js';

const router = Router();

router.get("/", sendEmail);

export default router;