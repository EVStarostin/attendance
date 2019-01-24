const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitorSchema = new Schema({
  name: { type: String, required: true, trim: true },
  archived: { type: Boolean, default: false },
});

module.exports = mongoose.model('Visitor', visitorSchema);