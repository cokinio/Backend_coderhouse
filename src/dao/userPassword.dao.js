import userModel from "../models/users.model.js"

export default class userManager {

    constructor() {	}

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
}