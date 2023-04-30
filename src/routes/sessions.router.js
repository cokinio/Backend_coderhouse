import { Router } from 'express';
import userModel from '../models/users.model.js';

const router = Router();

router.post("/register", async (req, res)=>{
    const { first_name, last_name, email, password} = req.body;
    console.log("Registrando usuario:");
    console.log(req.body);

    const exists = await userModel.findOne({email});
    if (exists){
        return res.status(400).send({status: "error", message: "Usuario ya existe."});
    }
    const user = {
        first_name,
        last_name,
        email,
        password //se encriptara despues...
    };
    const result = await userModel.create(user);
    res.status(201).send({status: "success", message: "Usuario creado con extito con ID: " + result.id});
}); 

router.post("/login", async (req, res)=>{
    const {email, password} = req.body;
    const user = await userModel.findOne({email,password}); //Ya que el password no está hasheado, podemos buscarlo directamente
    if(!user) return res.status(401).send({status:"error",error:"Incorrect credentials"});
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role
    }
    res.send({status:"success", payload:req.session.user, message:"¡Primer logueo realizado! :)" });
});

router.get('/logout', (req, res)=>{
    req.session.destroy(err => {
        if (err) {
          res.status(400).send('Unable to log out')
        } else {
            res.status(201).send({status: "success", message: "user logged out"})
        }
      });
})


export default router;