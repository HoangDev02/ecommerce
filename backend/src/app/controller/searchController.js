const productModel = require('../models/product.model')

const searchController = {
    searchProduct: async (req, res, next) => {
        const searchQuery = req.query.search; // Get the value from the 'q' query parameter
        try {
          const products = await productModel.find({
            $text: { $search: searchQuery } 
          });
          res.status(200).json(products);
        } catch (err) {
          next(err);
        }
      }
}

module.exports = searchController


