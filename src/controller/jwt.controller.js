import userModel from '../models/users.model.js';
import {isValidPassword} from '../../utils.js';
import { generateJWToken } from '../../utils.js';

export const jwtLogin =async (req, res)=>{
    const {email, password} = req.body;
    try {
        let user = await userModel.findOne({email: email});
        if (!user) {
            console.warn("User doesn't exists with username: " + email);
            return res.status(204).send({error: "Not found", message: "Usuario no encontrado con username: " + email});
        }
        if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + email);
            return res.status(401).send({status:"error",error:"El usuario y la contraseña no coinciden!"});
        }
        const tokenUser= {
            name : `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role,
            cartId: user.cartId
        };
        const access_token = generateJWToken(tokenUser);
        //console.log(access_token);
        user.last_connection= Date.now();

        let login= await userModel.updateOne({email: email},user);
        // Con Cookies
        res.cookie('jwtCookieToken', access_token , {
        maxAge: 3600000, //una hora
        httpOnly: false // expone la cookie
        //httpOnly: true // No expone la cookie
        })

        res.send({message: "Login successful!", access_token: access_token});
    } catch (error) {
        console.error(error);
        return res.status(500).send({status:"error",error:"Error interno de la applicacion."});
    }
    
}