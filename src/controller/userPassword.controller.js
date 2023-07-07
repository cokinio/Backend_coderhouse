import { passwordReset } from "../services/userPassword.service.js";

export const resetPassword =async (req,res)=>{
    let {email}= req.body;
    console.log(email)
    let user = await passwordReset(email);
    res.send(user);
}