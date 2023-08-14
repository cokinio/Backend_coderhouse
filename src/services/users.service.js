import {UserManager1} from "./userPassword.service.js";
import { sendMailMessage } from "../controller/email.controller.js";
import config from "../config/config.js";

export const cambiarRol = async (uid)=>{
	let user = await UserManager1.buscarUid(uid);
    if (user){
     if (user.role==='premium'){
        user.role='user'
     }else if (user.role==='user'){
         if (user.document_verified===true){
            user.role='premium'
         }else{
            return "Aun no se han verificado los documentos necesario para pasar a usuer premium"
         }
     }else{
        return false;
     }
     let result= await UserManager1.actualizarUsuario(user);
     return "el cambio de rol se efectuo correctamente";
    }else{
      return false;
    }
	
  }
;

export const subirDoc = async (uid,uploads)=>{

   let user = await UserManager1.buscarUid(uid);
   
   if (user){
   if (!user.documents.documents){user.documents.documents=[]}
   if (uploads.documents){
   uploads.documents.forEach(archivo => {
      user.documents.documents.push({name:archivo.originalname,
                           reference: archivo.path})
   });
   }
   if (uploads.profiles){
   if (!user.documents.profiles){user.documents.profiles=[]}
   uploads.profiles.forEach(archivo => {
      user.documents.profiles.push({name:archivo.originalname,
                           reference: archivo.path})
   });
   }
   if (!user.documents.products){user.documents.products=[]}
   if (uploads.products){
   uploads.products.forEach(archivo => {
      user.documents.products.push({name:archivo.originalname,
                           reference: archivo.path})
   });
   }
   if (!user.documents.otros){user.documents.otros=[]}
   if (uploads.otros){
   uploads.otros.forEach(archivo => {
      user.documents.otros.push({name:archivo.originalname,
                           reference: archivo.path})
   });
   }

     console.log(user.documents)
     let result= await UserManager1.actualizarUsuario(user);
     return "se agrego documento exitosamente";
    }else{
      console.log("no se encontro usuario")
      return false;
    }
}

export const buscarUsuarios = async ()=>{
   let result= await UserManager1.buscarUsuarios();
   console.log(result)
   return result;
}

export const deleteUsuarios = async ()=>{
  
      let fechaActual=Date.now();
      let unaHora=1000*60*60;
      let unDia= unaHora*24;
      let dosDias = unDia *2;
      let fechaDosDiasAntes=fechaActual-dosDias;
      let usuarios = await UserManager1.buscarUsuariosLastConection(fechaDosDiasAntes);
      console.log(usuarios)
      
      let eliminarUsuarios = await Promise.all(
      usuarios.map(async (user)=> { 
      const deleteEmail = {
			to: user.email,
			from: "Ecommerce Store" + config.gmailAccount,
			subject: "Eliminacion de cuenta de acceso a la tienda",
			text: `
          Usted esta recibiendo este mensaje porque hace mas de 2 días que no accede a su cuenta.
          Debido a esto su cuenta será eliminada. Si quiere volver a utilizar nuestra pagina web deberá registrarse nuevamente.`,
		};
		let mailEnviado=await sendMailMessage(deleteEmail);
      let deleteUser = await UserManager1.borrarUsuario(user._id);
      let userDeleted={
         mail:user.email,
         eliminado:deleteUser
      }
      return userDeleted
   }))
      return eliminarUsuarios
}


export const deleteUsuario = async (uid)=>{
   console.log(uid)
   let deleteUser = await UserManager1.borrarUsuario(uid);
   return deleteUser
}