import { passwordReset, setearPassword } from "../services/userPassword.service.js";
import { miLogger } from '../config/logger.js';

export const resetPassword =async (req,res)=>{
    let {email}= req.body;
    miLogger.info(email)
    let user = await passwordReset(email);
    res.send(user);
}

export const setPassword =async (req,res)=>{
    miLogger.info(req.body)
    let {token, password}= req.body;
    miLogger.info(token)
    let user = await setearPassword(token, password);
    res.send(user);
}