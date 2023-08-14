import {Router} from "express";
import {usersRole,usersDocuments, getUsers,deleteUsers,deleteUser} from "../controller/users.controller.js"
import { uploader } from "../../utils.js";

const router = Router();

router.get("/", getUsers);

router.delete("/", deleteUsers);

router.delete("/:uid", deleteUser);

router.get("/premium/:uid", usersRole);

router.post("/:uid/documents", uploader.fields([{ name: 'profiles', maxCount: 5 },{ name: 'products', maxCount: 5 },{ name: 'documents', maxCount: 5 },{ name: 'otros', maxCount: 5 }]), usersDocuments);
export default router;

