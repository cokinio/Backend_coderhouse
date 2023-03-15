import express from "express";
import productRoutes from './src/routes/products.router.js'


const app = express();
const PORT = 8080;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/product', productRoutes)

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
