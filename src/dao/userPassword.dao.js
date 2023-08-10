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

    buscarUid = async (uid) =>{
        
        let usuario = await userModel.findOne( {"_id": uid});
        if (!usuario) {
            return false;
        }else{
            usuario=usuario.toObject();
            return usuario;
        }
    }

    buscarUsuarios = async () =>{
        
        let usuarios = await userModel.find().lean();
        if (!usuarios) {
            return false;
        }else{
            let usuariosMap=usuarios.map((user) => {
                const obj={}
                obj.first_name=user.first_name,
                obj.last_name=user.last_name,
                obj.email=user.email,
                obj.role=user.role

                return obj;
            });
            return usuariosMap;
        }
    }

    deleteUsuarios = async () =>{
        
        //1000*60*60*24 un dia
        let fechaActual=Date.now();
        let unaHora=1000*60*60;
        let unDia= unaHora*24;
        let dosDias = unDia *2;
        let fechaDosDiasAntes=fechaActual-dosDias;
        let usuarios = await userModel.find({"last_connection": {$lt:fechaDosDiasAntes}});
        let usuariosMap=usuarios.map((user) => {
            const obj={}
            obj.first_name=user.first_name,
            obj.last_name=user.last_name,
            obj.email=user.email,
            obj.role=user.role,
            obj.last_connection=user.last_connection
            return obj;
        });
        console.log(usuariosMap)
        return usuariosMap
    }
}