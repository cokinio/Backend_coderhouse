import chai from "chai";
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing de router de products", () => {
    //"test": "echo \"Error: no test specified\" && exit 1",
        // Before
        // before(async function(done) {

        //     this.cookie;
        //     this.mockUser = {
        //         email: "leandroschlain@gmail.com",
        //         password: "1234"
        //     };
        //     const result = await requester.post('/api/sessions/login').send(mockLogin).end(function(err, res) {
        //     console.log(result.headers);
        //     const token = result.headers['set-cookie'][0];
        //     console.log(token);
        //     done()
        //     })
       // });


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
            const user = {
                        email: "leandroschlain@gmail.com",
                        password: "1234"}

            const productMock = {
                title: 'HP Pavilion 14',
                description: 'HP Pavilion 14 Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10',
                code: 'AAA011',
                price: 899,
                status: true,
                stock: 15,
                thumbnail: 'https://i.dummyjson.com/data/products/10/thumbnail.jpeg',
                category: 'laptops',
                        };
            
                //Then
                const result = await requester.post('/api/sessions/login').send(user);
                console.log(result.headers);
                const cookieResult = result.headers['set-cookie'][0];
                console.log(cookieResult);
                //const { _body, ok, statusCode } = await (await requester.post("/api/products")).send(productMock).set('Authorization', 'Bearer ' + token);
            
            // Assert that

        })

       
})