
import mongoose from 'mongoose';

const collection = "users";
const schema = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    loggedBy:String,
    role:{
        type:String,
        default:'user'
    }
})
const userModel = mongoose.model(collection,schema);
export default userModel;