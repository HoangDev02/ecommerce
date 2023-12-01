const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const comment = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "productModel"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        text: String,
        review: Number,
        modifiedOn: {
            type: Date,
            default: Date.now
        },
    }
)
module.exports = mongoose.model("comment", comment)