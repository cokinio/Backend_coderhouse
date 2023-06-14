import { generateProducts } from '../services/mockData/mockProducts.Service.js'

export const getProducts = async (req, res) => {
    try {
        let users = [];
        for (let i = 0; i < 5; i++) {
            users.push(generateProducts());
        }
        res.send({ status: "success", payload: users });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener productos:" });
    }
};