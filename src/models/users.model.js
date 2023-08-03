
import mongoose from 'mongoose';

const collection = "users";
const schema = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    },
    age:Number,
    password:String,
    cartId:String,
    loggedBy:String,
    role:{
        type:String,
        default:'user'
    },
    passwordResetTimeout: Date,
    passwordResetToken:String,
    documents:{
        documents:[{name:String,
                    reference:String}],
        profiles:[{name:String,
                    reference:String}],
        products:[{name:String,
                    reference:String}],
        otros:[{name:String,
                    reference:String}],
    },
    last_connection: Date,
    document_verified: {type: Boolean, default: false}
})
const userModel = mongoose.model(collection,schema);
export default userModel;