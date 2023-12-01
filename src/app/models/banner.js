const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const banner = mongoose.Schema(
    {
        productId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productModel'
        },
        img: String,
        description: String,
    }
)
module.exports = mongoose.model('banner', banner)