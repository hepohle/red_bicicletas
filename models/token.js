const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TokenSchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Usuario' },
    Token: { type: String, required: true },
    createId: { type: Date, required: true, default: Date.new, expires: 43200 }
});

module.exports = mongoose.model('Token', TokenSchema);