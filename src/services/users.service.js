import {UserManager1} from "./userPassword.service.js";

export const cambiarRol = async (uid)=>{
	let user = await UserManager1.buscarUid(uid);
    if (user){
     if (user.role==='premium'){
        user.role='user'
     }else if (user.role==='user'){
        user.role='premium'
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
