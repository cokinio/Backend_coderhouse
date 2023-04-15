import mongoose from 'mongoose';

const collectionName = 'carts';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true
};

const typePid ={
                 pid:{
                    type:mongoose.Schema.Types.ObjectId,
                     ref:"products",
                 },
                 quant:numberTypeSchemaNonUniqueRequired
             }


const courseSchema = new mongoose.Schema({

    products: [
        {
        type:typePid,
        
        }
    ]
    
});

export const cartsModel = mongoose.model(collectionName, courseSchema);