const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const categoryModel = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        img: {
            type: String,
            require: true
        },
        bard: {
            type: String
        },
        slug: {
            type: String, 
            slug: 'name' ,
        }
    },{timestamps: true}
)

mongoose.plugin(slug);
module.exports = new mongoose.model('categoryModel', categoryModel)