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


const cartsSchema = new mongoose.Schema({

    products: [
        {
        type:typePid,
        
        }
    ]
    
});


cartsSchema.pre('findOne', function() {
    this.populate('products.pid');
});

export const cartsModel = mongoose.model(collectionName, cartsSchema);