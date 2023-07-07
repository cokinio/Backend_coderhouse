
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
    passwordResetToken:String
})
const userModel = mongoose.model(collection,schema);
export default userModel;