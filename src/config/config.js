// import dotenv from 'dotenv';
// import { Command } from 'commander';

// const program = new Command(); //Crea la instancia de comandos de commander.

// program
//     .option('-d', 'Variable para debug', false)
//     .option('-p <port>', 'Puerto del servidor', 9090)
//     .option('--mode <mode>', 'Modo de trabajo', 'develop')
// program.parse();

// console.log("Mode Option: ", program.opts().mode);

// const environment = program.opts().mode;

// dotenv.config({
//     path: environment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
// });

export default {
    environment:"production",
    port: process.env.PORT||8080,
    mongoUrl: process.env.MONGO_URL,
    sessionSecret: process.env.SESION_SECRET,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWD,
    host : process.env.HOST
};