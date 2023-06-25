import { messageModel } from "../models/messages.model.js";
import mongoose from "mongoose";
import { miLogger } from "../config/logger.js";

export default class messagesManager {
	async getChatById(idBuscado) {
		try {
            miLogger.info("entre getChatById")
			let chat = await messageModel.findOne({ _id: idBuscado });
			miLogger.info(`the chat searched is the following: ${chat}`);
			chat = chat.toObject();
			return chat;
		} catch (error) {
			miLogger.error(
				`No se pudo obtener el chat ${idBuscado} con moongose: ` + error
			);
			return false;
		}
	}

	async addMessageToChat(chat1, message1) {
		if (chat1 !== undefined && message1 !== undefined) {
			//search if the chat exists
			let searchedChat = await this.getChatById(chat1);
			if (searchedChat != false) {
				miLogger.info(searchedChat);
				searchedChat.chat = message1;
				miLogger.info(searchedChat);
				let updated = await messageModel.updateOne({ _id: chat1 },searchedChat);
				miLogger.info(updated);
				return [true, chat1];
			} else {
				miLogger.info("Non existent chat");
				return [false, "Non existent chat"];
			}
		} else {
			miLogger.info("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	async createChat() {
		try {
			let messages = await messageModel.create({});
			return messages;
		} catch (error) {
			miLogger.error("No se pudo obtener mensajes con moongose: " + error);
		}
	}
}
