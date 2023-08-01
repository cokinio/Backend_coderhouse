import {cambiarRol} from "../services/users.service.js"

export const usersRole =async (req,res)=>{
    let uid = req.params.uid;
    let newRole = await cambiarRol(uid);
    res.send(newRole);
}

export const usersDocuments =async (req,res)=>{

}