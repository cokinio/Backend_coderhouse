import { Router } from 'express';
import {jwtLogin} from "../controller/jwt.controller.js"

const router = Router();

router.post("/login", jwtLogin);

export default router;