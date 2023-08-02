import {cambiarRol,subirDoc} from "../services/users.service.js"

export const usersRole =async (req,res)=>{
    let uid = req.params.uid;
    let newRole = await cambiarRol(uid);
    res.send(newRole);
}

export const usersDocuments =async (req,res)=>{
    let uid = req.params.uid;
    let uploads=[];
    
    if (req.files) {
       uploads=req.files
    }
    let newDoc = await subirDoc(uid,uploads);
    res.send(newDoc);
}