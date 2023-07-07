import crypto from 'crypto'
import userManager from "../dao/userPassword.dao.js";
import  config from "../config/config.js"
import { sendMailMessage } from '../controller/email.controller.js';

export let UserManager1 = new userManager("./");

export const passwordReset = async (mail) => {
    const token =  crypto.randomBytes(8).toString("hex");
    let user = await UserManager1.buscarUsuario(mail);
    if (user !=false){
    user.passwordResetToken = token;
    //60 min* 60 sec * 1000 miliseg
    user.passwordResetTimeout = Date.now() + 3600000;
    //seteo los datos en la base de datos
    let result =  UserManager1.actualizarUsuario(user)
    const resetEmail = {
        to: user.email,
        from: 'Ecommerce Store',
        subject: 'Reseteo de clave de acceso de tienda',
        text: `
          Usted esta recibiendo este mensaje porque usted (o alguien mas) solicito resetear el password de tu cuenta.
          Por favor clickee en el siguiente link, o copielo en su navegador para completar el proceso:
          http://${config.host}/reset/${token}
          Si no solicito esto, por favor ignore el mail y su password se mantedrá sin cambios.
        `,
      };
      sendMailMessage(resetEmail);
    return result; 
    } else{
        return false;
    }
}