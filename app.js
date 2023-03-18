import express from "express";
import productRoutes from './src/routes/products.router.js';
import cartRoutes from './src/routes/carts.router.js';
import __dirname from './utils.js';

const app = express();
const PORT = 8080;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src/public'))

app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
	console.log(__dirname);
});
