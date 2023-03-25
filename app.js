import express from "express";
import productRoutes from './src/routes/products.router.js';
import cartRoutes from './src/routes/carts.router.js';
import viewsRouter from './src/routes/views.router.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import {Server} from 'socket.io';

const app = express();
const PORT = 8080;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src/public'))

//configuracion de vistas
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/src/views');
app.set('view engine','handlebars');

//configracion de rutas
app.use('/', viewsRouter)
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)


const httpServer= app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
	console.log(__dirname);
});

//websocket
const socketServer= new Server(httpServer);
socketServer.on('connection',socket=>{
	console.log('nuevo cliente conectado');
	socket.on('message', data=>{
        console.log(data);
		socket.emit('producto',data);
    })
	
})
