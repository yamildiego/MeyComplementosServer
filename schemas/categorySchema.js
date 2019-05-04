var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var category = new Schema({
    id: Number,
    name: String,
    subcategories: [{
        id: Number,
        name: String
    }]
})

module.exports = mongoose.model('Category', category);