const mongoose = require('mongoose');
const FileSchema = require('./fileSchema');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    files: [FileSchema],
    createAt: { type: Date, default: Date.now() }
})

module.exports = mongoose.model("Folder", folderSchema);