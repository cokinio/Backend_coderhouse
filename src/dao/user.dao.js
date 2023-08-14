import userModel from "../models/users.model.js"
import {UserMongoDTO} from "../services/dto/user.dto.js"

export default class userManager {

    constructor() {	
       
    }


    buscarUsuario = async (mail) =>{
        console.log(mail)
    let usuario = await userModel.findOne( {"email": mail});
    if (!usuario) {
            return false;
        }else{
            usuario=usuario.toObject();
            return usuario;
        }
    }

    actualizarUsuario = async (user) =>{
            console.log(user)
            let exists = await userModel.findOne({"email": user.email});
            let result;
            console.log(exists)
            if (exists) {
                result = await userModel.updateOne({ "email": user.email },user);
            } else{
                console.log('el usuario no existe')
            }
            //Todo sale OK
            return result;
    }

    buscarToken = async (token) =>{
        console.log(token)
        let usuario = await userModel.findOne( {"passwordResetToken": token});
        if (!usuario) {
            return false;
        }else{
            usuario=usuario.toObject();
            return usuario;
        }
    }

    buscarUid = async (uid) =>{
        
        let usuario = await userModel.findOne( {"_id": uid});
        if (!usuario) {
            return false;
        }else{
            usuario=usuario.toObject();
            return usuario;
        }
    }

    borrarUsuario = async (uid) =>{
        let usuario = await userModel.deleteOne( {"_id": uid});

        if (!usuario) {
            return false;
        }else{
            return true;
        }
    }

    buscarUsuarios = async () =>{
        
        let usuarios = await userModel.find().lean();
        if (!usuarios) {
            return false;
        }else{
            let userMongoDTO1= new UserMongoDTO();
            let usuariosMap=userMongoDTO1.mapearUsuarios(usuarios)
            return usuariosMap;
        }
    }

    buscarUsuariosLastConection = async (fechaLimite) =>{
        
        let usuarios = await userModel.find(({"last_connection": {$lt:fechaLimite}})).lean();
        if (!usuarios) {
            return false;
        }else{
            let userMongoDTO1= new UserMongoDTO();
            let usuariosMap=userMongoDTO1.mapearUsuarios(usuarios)
            console.log(usuariosMap);
            return usuarios;
        }
    }


}