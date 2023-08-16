import crypto from "crypto";
import userManager from "../dao/user.dao.js";
import config from "../config/config.js";
import { sendMailMessage } from "../controller/email.controller.js";
import { createHash } from '../../utils.js';


export const UserManager1 = new userManager("./");

export const passwordReset = async (mail) => {
	const token = crypto.randomBytes(8).toString("hex");
	let user = await UserManager1.buscarUsuario(mail);
	if (user != false) {
		user.passwordResetToken = token;
		//60 min* 60 sec * 1000 miliseg
		user.passwordResetTimeout = Date.now() + 3600000;
		//seteo los datos en la base de datos
		let result = UserManager1.actualizarUsuario(user);
		const resetEmail = {
			to: user.email,
			from: "Ecommerce Store" + config.gmailAccount,
			subject: "Reseteo de clave de acceso de tienda",
			text: `
          Usted esta recibiendo este mensaje porque usted (o alguien mas) solicito resetear el password de tu cuenta.
          Por favor clickee en el siguiente link, o copielo en su navegador para completar el proceso:
          http://${config.host}/reset?token=${token}
          Si no solicito esto, por favor ignore el mail y su password se mantedrá sin cambios.
        `,
		};
		sendMailMessage(resetEmail);
		return result;
	} else {
		return false;
	}
};

export const validarToken = async (token) => {
	let tokenValid = false;
	let user = await UserManager1.buscarToken(token);
	if (user && user.passwordResetTimeout > Date.now()) {
		//encontre el token y no esta vencido

		user.tokenValid = true;
		return user;
	} else {
		user = {
			tokenValid: tokenValid,
		};
		return user;
	}
}

  export const setearPassword = async (token, password)=>{
   
	let user = await UserManager1.buscarToken(token);
    if (user){
      user.password= createHash(password);
      user.passwordResetToken="";
      let result = UserManager1.actualizarUsuario(user);
      return result;
    }else{
      return false;
    }
	
  }

  
;
