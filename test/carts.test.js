import chai from "chai";
import supertest from 'supertest';

const expect = chai.expect;

let token="";
let cookie ="";
const baseUrl="http://localhost:8080";
let requester = supertest(baseUrl);
let id="";

describe("Testing de router de carts", () => {

        // Before
        before(async function() {

            const user = {
                email:"cokinio@gmail.com",
                password: "1234"}

            const { _body, headers, ok, statusCode } = await requester.post('/api/jwt/login').send(user);
            token= _body.access_token;
            cookie = headers['set-cookie'][0];
            })
       


        // BeforeEach

        // Test 01
        it("crear carrito: El API POST /api/carts debe creat un cart.", async () => {
            
            // Given
            let mockCart=[
                {
                  "pid":"643fe3e7e64b58910900d411",
                  "quant":"2"
                }
              ]
            //Then
            const { _body, ok, statusCode } = await requester.post("/api/carts").send(mockCart).set('Cookie', cookie);
            id=_body.message.split(":")[1]
            console.log(id)
            // Assert that
            expect(_body).to.be.ok
            expect(_body).to.have.property('status',"Success");
        })

        // Test 02
        it("Obtener carrito: El API GET /api/carts debe obtener un cart especifico.", async () => {
            
            // Given
            let cartId=id;

            //Then
            const { _body, ok, statusCode } = await requester.get(`/api/carts/${cartId}`);
            
            // Assert that
            expect(_body).to.be.ok
            expect(_body).to.have.property('products');
        })

         // Test 03
         it("Eliminar carrito: El API DELETE /api/carts debe borrar un cart especifico.", async () => {
            
            // Given
            let cartId=id;

            //Then
            const { _body, ok, statusCode } = await requester.delete(`/api/carts/${cartId}`).set('Cookie', cookie);
            console.log(_body)
            // Assert that
            expect(_body).to.be.ok
            expect(_body).to.have.property('status',"Success");
        })
    })

