const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    folder: {
        type: Schema.Types.ObjectId,
        ref: 'Folder',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    formName: {
        type: String,
        required: true
    },
    elements: [{
        type: [String],
        enum: ['bubble-text', 'bubble-image', 'bubble-gif', 'text', 'number', 'email', 'phone', 'date', 'rating','button']
    }]
})