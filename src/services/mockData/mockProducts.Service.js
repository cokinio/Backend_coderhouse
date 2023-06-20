import { faker } from '@faker-js/faker';

faker.locale = 'es'; //Idioma de los datos

export const armarProducto = () => {
    return {
        title: faker.commerce.productName(),
        description:faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code:faker.random.alphaNumeric(3),
        stock: faker.random.numeric(1),
        id: faker.database.mongodbObjectId(),
        thumbnail: faker.image.image(),
        status:true
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