import {Router} from "express";
import {usersRouter} from "../controller/users.controller.js"

const router = Router();

router.get("/:uid", usersRouter);

export default router;

