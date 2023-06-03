import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import mongoose from "mongoose";
import MongoStore from 'connect-mongo';
import messagesManager from "./src/dao/messagesManagerMongo.js";
import session from 'express-session';
import cookieParser from "cookie-parser";
import passport from "passport";
import initializePassport from "./src/config/passport.config.js";
//import de routers
import productRoutes from "./src/routes/products.router.js";
import cartRoutes from "./src/routes/carts.router.js";
import viewsRouter from "./src/routes/views.router.js";
import sessionsRouter from './src/routes/sessions.router.js';
import ticketRouter from './src/routes/tickets.router.js';
import githubLoginViewRouter from './src/routes/github-login.views.router.js';
import jwtRouter from './src/routes/jwt.router.js';
//dotenv
import config from './src/config/environment.config.js';

console.log(config)

const app = express();
const PORT = config.port;
const DB =config.mongoUrl;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/src/public"));
app.use(cookieParser())

app.use(session({
	store:MongoStore.create({
        mongoUrl:DB,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 180
    }),
    secret:config.sessionSecret,
    resave: false,
    saveUninitialized: false
}))

//configuracion de passport
initializePassport();
app.use(passport.initialize());
// app.use(passport.session());

//configuracion de vistas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

//configracion de rutas
app.use("/", viewsRouter);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/ticket", ticketRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/github", githubLoginViewRouter);
app.use("/api/jwt", jwtRouter);


const httpServer = app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
	console.log(__dirname);
});

//websocket
const socketServer = new Server(httpServer);
let mensajes = [];
let chat = {};
let messageManager1 = new messagesManager();
socketServer.on("connection", (socket) => {
	socket.on("message", (data) => {
		console.log(data);
		socket.emit("producto", data);
	});

	socket.on("chatmessage", async (data) => {
		console.log(mensajes.length);
		if (mensajes.length === 0) {
			console.log("entre");
			chat = await messageManager1.createChat();
			console.log(`entre aca y el objeto chat es ${chat}`);
		}
		console.log(` el objeto chat es ${chat}`);
		mensajes.push(data);
		//create a chat
		console.log(mensajes);
		let resultado = await messageManager1.addMessageToChat(
			chat._id.toString(),
			mensajes
		);
		console.log(resultado);
		let objectMessages = await messageManager1.getChatById(chat._id);
		let messages = objectMessages.chat;
		socketServer.emit("messageLogs", messages);
	});

	// hacemos un broadcast del nuevo usuario que se conecta al chat
	socket.on("userConnected", (data) => {
		socket.broadcast.emit("userConnected", data.user);
	});
});



const connectMongoDB = async () => {
	try {
		await mongoose.connect(DB);
		console.log("Conectado con exito a MongoDB usando Mongoose");
	} catch (error) {
		console.error("No se pudo conectar a la BD usando Moongose: " + error);
		process.exit();
	}
};
connectMongoDB();
