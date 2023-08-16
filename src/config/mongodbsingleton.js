import mongoose from 'mongoose';
import config from './config.js';
import { miLogger } from './logger.js';


export default class MongoSingleton {
    static #instance;

    constructor() {
        this.#connectMongoDB();
    }

    static getInstance() {
        if (this.#instance) {
            miLogger.info("Ya se ha generado una conexion con Mongo!!");
        } else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    }

    #connectMongoDB = async () => {
        try {
            await mongoose.connect(config.mongoUrl);
            miLogger.info("Conectado con exito a la DB");
        } catch (error) {
            miLogger.error("No se pudo conectar a la BD usando Moongose: " + error)
            process.exit();
        }
    }
}