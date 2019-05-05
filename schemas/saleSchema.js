var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var sale = new Schema({
    isPaid: Boolean,
    dataPersonal: {
        name: String,
        lastname: String,
        street: String,
        numberStreet: String,
        floor: String,
        apartment: String,
        postCode: String,
        phone: String,
        email: String
    },
    dataCart: [{
        cartItems: [{
            idArticle: Number,
            size: Number,
            color: Number,
            title: String,
            price: Number,
            quantity: Number
        }],
        totalItems: Number,
        total: Number,
        maxId: Number
    }]
})

module.exports = mongoose.model('Sale', sale);