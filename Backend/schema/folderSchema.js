const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    folderName: {
        type: String,
        unique: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    forms: [{
        formName: String,
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Folder", folderSchema);