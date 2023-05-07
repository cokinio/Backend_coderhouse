import { Router } from 'express';
import passport from 'passport';
// import userModel from '../models/users.model.js';
// import { createHash, isValidPassword } from '../../utils.js';

const router = Router();

//estrategia con github
router.get("/github", passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate('github', {failureRedirect: '/github/error'}), async (req, res) => {
    const user = req.user;
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role
    };
    res.redirect("/products");
});


// registro con passport local
router.post("/register", passport.authenticate('register', { failureRedirect: '/api/sessions/fail-register' }),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });


//login con passport local
router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    console.log("User found to login:");
    const user = req.user;
    console.log(user);
    if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

//fallo al registrar
router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

//fallo en login
router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});


// router.post("/register", async (req, res)=>{
//     const { first_name, last_name, email, password} = req.body;
//     console.log("Registrando usuario:");
//     console.log(req.body);

//     const exists = await userModel.findOne({email});
//     if (exists){
//         return res.status(400).send({status: "error", message: "Usuario ya existe."});
//     }
//     const user = {
//         first_name,
//         last_name,
//         email,
//         password: createHash(password) 
//     };
//     const result = await userModel.create(user);
//     res.status(201).send({status: "success", message: "Usuario creado con extito con ID: " + result.id});
// }); 

// router.post("/login", async (req, res)=>{
//     const {email, password} = req.body;
//     const user = await userModel.findOne({email});
//     if(!user) return res.status(401).send({status:"error",error:"Incorrect credentials"});
//     if(!isValidPassword(user,password)){
//         return res.status(401).send({status:'error',error:'credenciales incorrectas'})
//     }
//     req.session.user= {
//         name : `${user.first_name} ${user.last_name}`,
//         email: user.email,
//         role: user.role
//     }
//     res.send({status:"success", payload:req.session.user, message:"¡Primer logueo realizado! :)" });
// });

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