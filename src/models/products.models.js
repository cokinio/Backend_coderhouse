import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const stringTypeSchemaNonUniqueNonRequired = {
    type: String
};

const stringTypeSchemaNonUniqueNonRequiredDefault = {
    type: String,
    default: "/"
};


const numberTypeSchemaNonUniqueRequired = {
    type: Number,
    required: true
};
const booleanTypeSchemaNonUniqueRequired = {
    type: Boolean,
    required: true
};

const productSchema = new mongoose.Schema({
    title: stringTypeSchemaNonUniqueRequired,
    description: stringTypeSchemaNonUniqueRequired,
    code: stringTypeSchemaUniqueRequired,
    price: numberTypeSchemaNonUniqueRequired,
    status:booleanTypeSchemaNonUniqueRequired,
    stock:numberTypeSchemaNonUniqueRequired,
    category:stringTypeSchemaNonUniqueRequired,
    thumbnail:stringTypeSchemaNonUniqueNonRequiredDefault,
    owner:{type: String, default:"admin"}
});

productSchema.plugin(mongoosePaginate);
export const productsModel = mongoose.model(productsCollection, productSchema);