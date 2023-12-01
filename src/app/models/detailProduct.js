const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const detailProduct = mongoose.Schema(
    {
        productId : [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "productModel"
                },
                name: String,
                img: String,
            },

        ],
        image1: String,
        image2: String,
        image3: String,

    }
)
module.exports = mongoose.model('detailProduct',detailProduct)