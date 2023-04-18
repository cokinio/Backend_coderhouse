import { messageModel } from "../models/messages.model.js";
import mongoose from 'mongoose';

export default class messagesManager {
	
async addMessage(message) {
        try {
            let mensaje = await messageModel.create(message)
            return mensaje;
        } catch (error) {
            console.error("No se pudo crear mensaje con moongose: " + error);
        }
}

async getMesasages() {
    try {
        let messages = await messageModel.find().lean()
        return messages;
    } catch (error) {
        console.error("No se pudo obtener mensajes con moongose: " + error);
    }
}


}