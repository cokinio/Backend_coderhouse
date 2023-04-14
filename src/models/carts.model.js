import mongoose from 'mongoose';

const collectionName = 'carts';

const courseSchema = new mongoose.Schema({
    products: {
        type:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"product"
                }
            }
        ],
        default:[]
    }
});

export const cartsModel = mongoose.model(collectionName, courseSchema);