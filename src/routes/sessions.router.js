import { Router } from 'express';
import passport from 'passport';
import {miLogger } from '../config/logger.js';
import {resetPassword,setPassword} from '../controller/userPassword.controller.js'
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
        miLogger.info("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con exito." });
    });


//recupero de clave 
router.post("/recuperoClave", resetPassword)

// seteo clave
router.post("/seteoClave", setPassword)

//login con passport local
router.post("/login", passport.authenticate('login', { failureRedirect: '/api/sessions/fail-login' }), async (req, res) => {
    miLogger.info("User found to login:");
    const user = req.user;
    miLogger.info(user);
    if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: user.role,
        cartId: user.cartId
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