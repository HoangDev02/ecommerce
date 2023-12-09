const mongoose = require('mongoose')

const techSpecsModel = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productModel'
    },
    specifications: [{
        key: String,
        value: String,
        garantie: Number
    }],
    promotion: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'productModel'
            },
            key:String,
            value: String
        }
    ]
});
module.exports = mongoose.model('techSpecsModel', techSpecsModel)