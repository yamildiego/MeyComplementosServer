var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const type = ['image', 'video'];

var article = new Schema({
    title: String,
    description: String,
    price: Number
    // category: Number,
    // images: [{
    //     id: Number,
    //     type: type,
    //     path: String
    // }],
    // colors: [{
    //     value: Number,
    //     displayName: type
    // }],
    // brand: {
    //     id: Number,
    //     displayName: String
    // },
    // sizes: [{
    //     value: Number,
    //     displayName: type
    // }],
})

module.exports = mongoose.model('Article', article);