import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { miLogger } from './src/config/logger.js';
import fs from 'fs'

// config Ruta absoluta
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Configuracion bcrypt 
// hash generation
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// validamos la contraseña con la que esta en la DB como hash
export const isValidPassword = (user, password )=>{
    miLogger.info(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password)
}

//JSON Web Tokens JWT functinos:
export const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";
/**
 * Generate token JWT usando jwt.sign:
 * Primer argumento: objeto a cifrar dentro del JWT
 * Segundo argumento: La llave privada a firmar el token.
 * Tercer argumento: Tiempo de expiración del token.
 */
export const generateJWToken = (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '120s'});
};
/**
 * Metodo que autentica el token JWT para nuestros requests.
 * OJO: Esto actúa como un middleware, observar el next.
 * @param {*} req Objeto de request
 * @param {*} res Objeto de response
 * @param {*} next Pasar al siguiente evento.
 */
export const authToken = (req, res, next) => {
    //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    miLogger.info("Utils.js: Token present in header auth:");
    miLogger.info(authHeader);
    if (!authHeader) {
        return res.status(401).send({error: "User not authenticated or missing token."});
    }
    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.
    //Validar token
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({error: "Token invalid, Unauthorized!"});
        //Token OK
        req.user = credentials.user;
        miLogger.info(req.user);
        next();
    });
};

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        miLogger.info("Entrando a llamar strategy: ");
        miLogger.info(strategy);
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({error: info.messages?info.messages:info.toString()});
            }
            req.user = user;
            next();
        })(req, res, next);
    }
};

export const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send("Unauthorized: User not found in JWT"); 
        if (typeof role==='string'){
            if (req.user.role !== role) {
                return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol."); 
            }
        }
        else if (Array.isArray(role)===true) {
            miLogger.info(role.includes(req.user.role))
            if (role.includes(req.user.role)===false) {
                return res.status(403).send("Forbidden: El usuario no tiene permisos con este rol."); 
            }
        }
        next();
    }
};




// Configuracion MULTER
const storage = multer.diskStorage(
    {
        // ubicaion del directorio donde voy a guardar los archivos
        destination: function (req, file, cb) {
            let uid = req.params.uid;

            const dir=`${__dirname}/src/public/files/${uid}/${file.fieldname}`;
            const dir2=`${__dirname}/src/public/files/${uid}/otros`;
            const dir3=`${__dirname}/src/public/img`;

            miLogger.info(file.fieldname)
        
               if(file.fieldname===`profiles` ||file.fieldname===`products` ||file.fieldname===`documents` ){
                    if (fs.existsSync(dir)===false){ 
                        fs.mkdirSync(dir, { recursive: true })
                    }
                    cb(null,dir);
                    
                }else if(file.fieldname===`thumbnail`){
                cb(null,dir3);
               }else{
                if (fs.existsSync(dir)===false){ 
                    fs.mkdirSync(dir, { recursive: true })
                }
                cb(null,dir2);
                
               }
        },
        filename: function (req, file, cb) {
        
            let uid = req.params.uid;

            if (uid){
                cb(null, `${file.originalname}-${Date.now()}`)
            }else{
                cb(null, `${Date.now()}-${file.originalname}`)
            }
            
        }
    }
)

export const uploader = multer({
    storage, onError: function (err, next) {
        miLogger.info(err);
        next();
    }
});

export default __dirname;