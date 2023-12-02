const productModel = require('../models/product.model')
const dealSaleModel = require('../models/dealSaleModel')
const dealineSale = {

    //create dealSale
    createDealSale: async(req,res) => {
        const newDealSale = new dealSaleModel(req.body);
        try {
            await newDealSale.save()
            res.status(200).json("create success")
        } catch (error) {
            console.log(error);
        }
    },
    getProductDealSale: async(req,res) => {
       try {
        const getProductSale = await productModel.aggregate([
            {
              $lookup: {
                from: "dealsales",
                let: { id: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$productId", "$$id"],
                      },
                    },
                  },
                ],
                as: "newDealSale",
              },
            },
          ]);
          res.status(200).json(getProductSale);
       } catch (error) {
            console.log(error);
       }
    }
}
module.exports = dealineSale