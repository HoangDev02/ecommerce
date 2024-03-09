const productModel = require("../models/product.model");
const dealSaleModel = require("../models/dealSaleModel");
const dealineSale = {
  //create dealSale
  createDealSale: async (req, res) => {
    const newDealSale = new dealSaleModel(req.body);
    try {
      await newDealSale.save();
      res.status(200).json("create success");
    } catch (error) {
      console.log(error);
    }
  },
  getProductDealSale: async (req, res) => {
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
  },
  deleteProductInTime : async (req, res) => {
    const now = new Date();
    try {
      const product = await dealSaleModel.findOne({productId: req.body.productId});
      // check find product
      if (!product) {
        return res.status(404).send({ status: false, message: "Product not found" });
      }
      const saleTime = product.saleTime.split(":");
      const saleDate = new Date(product.saleDate);
      // console.log("saleDate : " + saleDate)

      saleDate.setHours(parseInt(saleTime[0]), parseInt(saleTime[1]), 0, 0);

      const dealSaleEnd = new Date(saleDate.getTime() + 1 * 60 * 60 * 1000); // 1 giờ sau saleDate
      console.log("saleDate : " + dealSaleEnd)
      console.log("data : " + now)
  
      if (now >= dealSaleEnd) {
        await dealSaleModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
          status: true,
          message: "Product deleted successfully after deal sale time.",
        });
      } else {
        res.status(200).json({
          status: true,
          message: "Product is still in deal sale time, not deleted.",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: false, message: "An error occurred while deleting the product." });
    }
  }
  
};
module.exports = dealineSale;
