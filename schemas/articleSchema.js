var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var article = new Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    category: Number,
    images: [{
        id: Number,
        type: {
            type: String,
            enum: ['image', 'video']
        },
        path: String
    }],
    colors: [{
        value: Number,
        displayName: String
    }],
    brand: {
        id: Number,
        displayName: String
    },
    sizes: [{
        value: Number,
        displayName: String
    }]
})

module.exports = mongoose.model('Article', article);