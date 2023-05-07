import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import multer from 'multer';

// config Ruta absoluta
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Configuracion bcrypt 

// hash generation
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// validamos la contraseña con la que esta en la DB como hash
export const isValidPassword = (user, password )=>{
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password)
}

// Configuracion MULTER
const storage = multer.diskStorage(
    {
        // ubicaion del directorio donde voy a guardar los archivos
        destination: function (req, file, cb) {
            cb(null, `${__dirname}/src/public/img`)
        },
        filename: function (req, file, cb) {
            // console.log(file);
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    }
)

export const uploader = multer({
    storage, onError: function (err, next) {
        console.log(err);
        next();
    }
});

export default __dirname;