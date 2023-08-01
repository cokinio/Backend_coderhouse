import {Router} from "express";
import {usersRole,usersDocuments} from "../controller/users.controller.js"
import { uploader } from "../../utils.js";

const router = Router();

router.get("/premium/:uid", usersRole);

router.post("/:uid/documents", uploader.single('document'), usersDocuments);
export default router;

