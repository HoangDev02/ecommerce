const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const reviewsModel = mongoose.Schema(
    {
        productId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "productModel"
        },
        techSpecsId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "techSpecsModel"
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        title : [
            {
                title: String,
                content: String,
                img: String
            }
        ],
        review: Number,
        slug: {
            type: String, 
            slug: 'title' ,
        }
    }
)
mongoose.plugin(slug)

module.exports = mongoose.model('review', reviewsModel)