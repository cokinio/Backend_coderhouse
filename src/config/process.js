import { Command } from 'commander'
import { miLogger } from './logger.js';

const program = new Command();

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del server', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
    .requiredOption('-u <user>', 'El user que va usar la aplicaicon', 'user')

program.parse() //Parsea los comandos y valida si son correctos.

miLogger.info("Options: ", program.opts());
miLogger.info("Mode Option: ", program.opts().mode);
miLogger.info("Remaining arguments: ", program.args);


// Listeners
process.on("exit", code => {
    miLogger.info("Este codigo se ejecuta antes de salir del proceso.");
    miLogger.info("Codigo de salida del proceso: " + code);
});

process.on("uncaughtException", exception => {
    miLogger.info("Esta exception no fue capturada, o controlada.");
    miLogger.info(`Exception no capturada: ${exception}`)
});

process.on("message", message => {
    miLogger.info("Este codigo se ejecutará cuando reciba un mensaje de otro proceso.");
    miLogger.info(`Mensaje recibido: ${message}`);
});


export default program;