import { passwordReset, setearPassword } from "../services/userPassword.service.js";

export const resetPassword =async (req,res)=>{
    let {email}= req.body;
    console.log(email)
    let user = await passwordReset(email);
    res.send(user);
}

export const setPassword =async (req,res)=>{
    console.log(req.body)
    let {token, password}= req.body;
    console.log(token)
    let user = await setearPassword(token, password);
    res.send(user);
}