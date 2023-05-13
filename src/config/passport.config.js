import passport from 'passport';
import passportLocal from 'passport-local';
import GitHubStrategy from 'passport-github2';
import userModel from '../models/users.model.js';
import jwtStrategy from 'passport-jwt';
import { createHash, isValidPassword, PRIVATE_KEY } from '../../utils.js';
import CartManager from '../dao/cartsManagerMongo.js'



const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

// Declaramos nuestra estrategia
const localStrategy = passportLocal.Strategy;

const initializePassport = ()=>{
    
    //Estrategia de obtener Token JWT por Cookie:
    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), 
            secretOrKey: PRIVATE_KEY
        }, async (jwt_payload, done) => {
            console.log("Entrando a passport Strategy con JWT.");
            try {
                console.log("JWT obtenido del payload");
                console.log(jwt_payload);
                return done(null, jwt_payload.user);
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    ));

    // estrategia github
    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.09e1ea12bc1e3947', 
            clientSecret: '1144d6f7545a555e774884c964b99b740de69fd2',
            callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'
        }, 
        async (accessToken, refreshToken, profile, done) => {
            console.log("Profile obtenido del usuario: ");
            console.log(profile);
            try {
                const user = await userModel.findOne({email: profile._json.email});
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + profile._json.email);
                    //creo el cart id
                    let cartManager1 = new CartManager("./");
                    let wasCartAddedSuccesfully = await cartManager1.NewCart([]);
                    let newUser = {
                        first_name: profile._json.name,
                        last_name: '',
                        email: profile._json.email,
                        cartId:wasCartAddedSuccesfully[1],
                        password: '',
                        loggedBy: "GitHub"
                    };
                    const result = await userModel.create(newUser);
                    return done(null, result);
                } else {
                    //Si entramos por acá significa que el usuario ya existía.
                    return done(null, user);
                }
            } catch (error) {
                return done(error);
            }
        })
    );

    // estrategia register
    /**
      *  Inicializando la estrategia local, username sera para nosotros email.
      *  Done será nuestro callback
     */
    passport.use('register', new localStrategy(
        // passReqToCallback: para convertirlo en un callback de request, para asi poder iteracturar con la data que viene del cliente
        // usernameField: renombramos el username
        { passReqToCallback: true, usernameField: 'email' },
        async(req, username, password, done) =>{
            const { first_name, last_name, email, age} = req.body;
            try {

                const exists = await userModel.findOne({ email });
                if (exists) {
                    console.log("El usuario ya existe.");
                    return done(null, false);
                }
                //creo el cart id
                let cartManager1 = new CartManager("./");
                let wasCartAddedSuccesfully = await cartManager1.NewCart([]);
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    cartId:wasCartAddedSuccesfully[1],
                    password: createHash(password)
                };
                const result = await userModel.create(user);
                //Todo sale OK
                return done(null, result);
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }

    ))


    // estrategia login
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.warn("Invalid credentials for user: " + username);
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );


    //Funciones de Serializacion y Desserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
};

const cookieExtractor = req => {
    let token = null;
    console.log("Entrando a Cookie Extractor");
    if (req && req.cookies) { //Validamos que exista el request y las cookies.
        console.log("Cookies presentes: ");
        console.log(req.cookies);
        token = req.cookies['jwtCookieToken'];
        console.log("Token obtenido desde Cookie:");
        console.log(token);
    }
    return token;
};


export default initializePassport;