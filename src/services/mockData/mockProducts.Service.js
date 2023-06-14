import { faker } from '@faker-js/faker';

faker.locale = 'es'; //Idioma de los datos

export const armarProducto = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.random.numeric(1),
        id: faker.database.mongodbObjectId(),
        image: faker.image.image()
    }
};

export const generateProducts = () => {
let numOfProducts = 100;
let products = [];
for (let i = 0; i < numOfProducts; i++) {
    products.push(armarProducto());
}

return products;
}