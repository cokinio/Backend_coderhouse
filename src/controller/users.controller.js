import {cambiarRol} from "../services/users.service.js"

export const usersRouter =async (req,res)=>{
    let uid = req.params.uid;
    let newRole = await cambiarRol(uid);
    res.send(newRole);
}