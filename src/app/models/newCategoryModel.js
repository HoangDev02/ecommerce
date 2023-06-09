const mongooes = require('mongoose')


const newCategoryModel = new mongooes.Schema(
    {
        name: {
            type: String,
            require: true,
        }
        
    }
)
mongooes.model = mongooes.model('newCategoryModel', newCategoryModel)