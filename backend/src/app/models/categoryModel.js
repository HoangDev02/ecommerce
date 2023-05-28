const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const categoryModel = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        slug: {
            type: String, 
            slug: 'name' ,
        }
    },{timestamps: true}
)

mongoose.plugin(slug);
module.exports = new mongoose.model('categoryModel', categoryModel)