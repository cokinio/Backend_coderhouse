import mongoose from 'mongoose';

const collectionName = 'tickets';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const typePid ={
                 pid:{
                    type:mongoose.Schema.Types.ObjectId,
                     ref:"products",
                 },
                 quant:numberTypeSchemaNonUniqueRequired
             }


const ticketSchema = new mongoose.Schema({
    code: stringTypeSchemaUniqueRequired,
    purchase_datetime:{ type : Date, default: Date.now },
    amount: {type: Number},
    purchaser: stringTypeSchemaNonUniqueRequired,
    products: [
        {
        type:typePid,
        
        }
    ]
    
});


ticketSchema.pre('findOne', function() {
    this.populate('products.pid');
});

export const ticketsModel = mongoose.model(collectionName, ticketSchema);