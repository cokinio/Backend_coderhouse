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

const typeMessage ={
    user:stringTypeSchemaUniqueRequired,
    message:stringTypeSchemaNonUniqueRequired
}

const messageSchema = new mongoose.Schema({
    chat: [
        {type:typeMessage}
    ]},
   { timestamps: true }
   );

export const messageModel = mongoose.model(messageCollection, messageSchema);