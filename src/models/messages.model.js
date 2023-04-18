import mongoose from 'mongoose';

const messageCollection = 'messages';

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


const messageSchema = new mongoose.Schema({
    chat: [
        {user:stringTypeSchemaUniqueRequired,
        message:stringTypeSchemaNonUniqueRequired}
    ]},
   { timestamps: true }
   );

export const messageModel = mongoose.model(messageCollection, messageSchema);