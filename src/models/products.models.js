import mongoose from 'mongoose';

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
    thumbnails:stringTypeSchemaNonUniqueNonRequiredDefault,
});

export const productsModel = mongoose.model(productsCollection, productSchema);