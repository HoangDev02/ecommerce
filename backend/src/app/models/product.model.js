const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const productModel = new mongoose.Schema(
    {
        category_product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"categoryModel"
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true

        },
        img: {
            type: String,     
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        slug: {
            type: String, 
            slug: 'name' ,
        }
    }, { timestamps: true }
)
mongoose.plugin(slug)
module.exports = mongoose.model('productModel', productModel)