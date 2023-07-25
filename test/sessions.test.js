import chai from "chai";
import supertest from 'supertest';

const expect = chai.expect;

let token="";
let cookie ="";
const baseUrl="http://localhost:8080";
let requester = supertest(baseUrl);


describe("Testing de router de session", () => {

        // Before

        // BeforeEach

        // Test 01
        it("Registrar usuario: El API POST /api/sessions/register debe registrar un usuario correctamente.", async () => {
            
            // Given
            let mockUser = {
                first_name: "Leandro",
                last_name: "Perez",
                email: "leo_bahia@hotmail.com",
                age: "23",
                password: "1234"
            }
            //Then
            const { _body ,ok, statusCode } = await requester.post("/api/sessions/register").send(mockUser);
            // Assert that
            expect(_body).to.be.ok
            expect(statusCode).to.be.deep.equal(201);
            expect(_body).to.have.property('status',"success");
        })

        // Test 02
        it("loguear usuario: El API POST /api/jwt/login debe loguear un usuario correctamente.", async () => {
            
            // Given
            let mockLogin = {
                email: "leo_bahia@hotmail.com",
                password: "1234"
            }
            //Then
            const { _body, headers, ok, statusCode } = await requester.post("/api/jwt/login").send(mockLogin);
            token= _body.access_token;
            cookie = headers['set-cookie'][0];
            // Assert that
            expect(_body).to.be.ok
            expect(statusCode).to.be.deep.equal(200);
            expect(_body).to.have.property('message',"Login successful!");
        })

        // Test 03
        it("Desoguear al usuario: El API GET api/sessions/loguot debe desloguear un usuario correctamente.", async () => {
            
            // Given
           
            //Then
            const { _body, ok, statusCode } = await requester.get("/api/sessions/logout").set('Cookie', cookie);
            console.log(_body)
            console.log(ok)
            console.log(statusCode)
            // Assert that
            expect(_body).to.be.ok
            expect(statusCode).to.be.deep.equal(201);
            expect(_body).to.have.property('message',"user logged out");
        })

    })