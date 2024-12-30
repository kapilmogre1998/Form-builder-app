const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formBotSchema = new Schema({
    formBotId: {
        type: Schema.Types.ObjectId,
        ref:'form',
        required:true
    },
    elements: [{
        type: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }],
    submittedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("FormBot", formBotSchema);