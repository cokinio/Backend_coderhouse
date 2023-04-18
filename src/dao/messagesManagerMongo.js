import { messageModel } from "../models/messages.model.js";
import mongoose from "mongoose";

export default class messagesManager {
	async getChatById(idBuscado) {
		try {
            console.log("entre getChatById")
			let chat = await messageModel.findOne({ _id: idBuscado });
			console.log(`the chat searched is the following: ${chat}`);
			chat = chat.toObject();
			return chat;
		} catch (error) {
			console.log(
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
				console.log(searchedChat);
				searchedChat.chat = message1;
				console.log(searchedChat);
				let updated = await messageModel.updateOne({ _id: chat1 },searchedChat);
				console.log(updated);
				return [true, chat1];
			} else {
				console.log("Non existent chat");
				return [false, "Non existent chat"];
			}
		} else {
			console.log("missing input parameters");
			return [false, "missing input parameters"];
		}
	}

	async createChat() {
		try {
			let messages = await messageModel.create({});
			return messages;
		} catch (error) {
			console.error("No se pudo obtener mensajes con moongose: " + error);
		}
	}
}
