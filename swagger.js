import swaggerJsdoc from'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentación API",
            description: "Documentación de REST API de tienda de e-commerce con Swagger"
        }
    },
    // aqui van a estar todas las especificaciones tecnicas de mis apis
    apis: ['./src/docs/**/*.yaml']
}

export const swaggerSpecs = swaggerJsdoc(options);

