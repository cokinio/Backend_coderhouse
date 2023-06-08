export default class UserDTO {
    constructor(user) {
        // console.log("entre DTO")
        // console.log(user)
        //oculto los datos de age y cartId
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
    }
}