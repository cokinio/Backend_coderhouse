const express = require('express');
import ProductManager from './proyecto.js';
const app = express();
const PORT = 80;


let productManager1 = new ProductManager("./");

app.get('/products', async (req, res) => {
  await res.send(productManager1.getProducts)
})

app.get('/leo', (req, res) => {
    res.send('hola leo!')
  })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})