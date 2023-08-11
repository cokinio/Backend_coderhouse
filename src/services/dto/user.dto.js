export default class UserSessionDTO {
    constructor(user) {
        //oculto los datos de age y cartId
        this.name = user.name;
        this.email = user.email;
        this.role = user.role;
    }
}

export class UserMongoDTO {
    constructor() {}

    async mapearUsuarios(usuarios){
        let usuariosMap=usuarios.map((user) => {
            let obj={}
            obj.first_name=user.first_name,
            obj.last_name=user.last_name,
            obj.email=user.email,
            obj.role=user.role
            return obj
        })
        return usuariosMap;
    }
}