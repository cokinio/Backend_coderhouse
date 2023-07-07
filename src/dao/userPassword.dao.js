import userModel from "../models/users.model.js"

export default class userManager {

    constructor() {	}

    buscarUsuario = async (mail) =>{
        console.log(mail)
    let usuario = await userModel.findOne( {"email": mail});
    usuario=usuario.toObject();
    if (!usuario) {
            return false;
        }else{
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
}