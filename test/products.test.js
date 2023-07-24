import chai from "chai";
import supertest from 'supertest';

const expect = chai.expect;

let token="";
let cookie ="";
const baseUrl="http://localhost:8080";
let requester = supertest(baseUrl);

describe("Testing de router de products", () => {
    //"test": "echo \"Error: no test specified\" && exit 1",
        // Before
        before(async function() {

            const user = {
                email:"cokinio@gmail.com",
                password: "1234"}

            const { _body, headers, ok, statusCode } = await requester.post('/api/jwt/login').send(user);
            token= _body.access_token;
            cookie = headers['set-cookie'][0];
            //console.log(token);
            //console.log(headers)
            })
       


        // BeforeEach
        // Test 01
        it("Obtener products: El API GET /api/products debe obtener la lista de productos correctamente.", async () => {
            
            // Given

            //Then
            const { _body, ok, statusCode } = await requester.get("/api/products");
            
            // Assert that
            expect(_body).to.be.ok
            expect(_body.totalDocs).to.be.ok;
            expect(_body.isValid).to.be.ok;
        })

         // Test 02
         it("Agregar products: El API PUT /api/products debe agregar productos correctamente.", async () => {
            
            // Given
            const productMock = {
                title: 'Test HP Pavilion 14',
                description: 'HP Pavilion 14 Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10',
                code: 'ACA016',
                price: 899,
                status: true,
                stock: 15,
                thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
                category: 'laptops'
                        };
            
                //Then
                //const { _body, ok, statusCode } = await requester.post("/api/products").send(productMock).set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + token);
                const { _body, ok, statusCode } = await requester.post("/api/products").send(productMock).set('Cookie', cookie);
                console.log(_body)
                console.log(statusCode)
                console.log(ok)
            // Assert that
                expect(_body).to.be.ok
                expect(_body).to.have.property('status',"Success");
            })

})