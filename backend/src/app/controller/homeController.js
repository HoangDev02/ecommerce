const ProductModel = require('../models/product.model')
const homeController = {
    getHomePage: async(req,res,next) => {
        await ProductModel.find()
        .then((products) => {
            products = products.map((product) => product.toObject())
            res.render("home", {
                products: products
            })
        })
    }
}
module.exports = homeController