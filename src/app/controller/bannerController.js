const BannerModel = require("../models/banner");
const productModel = require("../models/product.model");
const bannerController = {
  createBanner: async (req, res, next) => {
    let imagePaths = req.files.map((file) => file.path);
    const bannerData = {
      ...req.body,
      img: imagePaths,
    };
    const newBanner = new BannerModel(bannerData);
    try {
      await newBanner.save();
      res.status(200).json("create banner success");
    } catch (err) {
      next(err);
    }
  },

  //group banner + productModel, get name, slug in productModel
  getBanner: async (req, res) => {
    try {
      const getBanner = await BannerModel.aggregate([
        {
          $lookup: {
            from: "productmodels",
            let: { productId: "$productId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$productId"],
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  name: 1,
                  slug: 1,
                  price: 1,
                },
              },
            ],
            as: "newBaner",
          },
        },
      ]);
      res.status(200).json(getBanner);
    } catch (err) {
      console.log(err);
    }
  },
};
module.exports = bannerController;
