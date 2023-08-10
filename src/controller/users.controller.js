import {cambiarRol,subirDoc, buscarUsuarios, deleteUsuarios} from "../services/users.service.js"

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

export const getUsers =async (req,res)=>{
    let users = await buscarUsuarios();
    res.send(users);
}

export const deleteUsers =async (req,res)=>{
    let result = await deleteUsuarios();
    res.send(result);
}