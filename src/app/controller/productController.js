
const productModel = require('../models/product.model')
const categoryModel = require('../models/categoryModel')

const productController = {
    createProduct: async(req,res,next) => {
        let imagePaths = req.files.map(file => file.path);
        const productData = {
            ...req.body,
            img: imagePaths
          };
        const newProduct = new productModel(productData);
        try {
            await newProduct.save()
            res.status(200).json('create product success')
        } catch(err) {
            next(err)
        }
    },
    // editProduct: async(req,res,next) => {
    //     product.findById(req.params.id)
    //     .then(product => res.render('products/updateProduct', {
    //         product: mongooseToObject(product)
    //     }))
    //     .catch(next)
    // },

    //get
    editProduct: async(req,res,next) => {
        try {
            const editProduct = await productModel.findById(req.params.id);
            res.status(200).json(editProduct)
        }catch(err) {
            next(err)
        }
    },
    //put
    updateProduct: async(req,res,next) => {
        productModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        .then(() => res.json('"update product success'))
        .catch(next)
    },
    //delete
    deleteProduct: async(req,res,next) => {
        productModel.findByIdAndDelete(req.params.id)
        .then(() =>res.json('delete product success'))
        .catch(next)
    },
    getProduct: async(req,res,next) => {
        try {
            const product = await productModel.findOne({slug: req.params.slug});
            res.status(200).json(product)
        }catch(err) {
            next(err)
        }
    },

    //show screen home 6 product
    getProducts: async(req,res,next) => {
        try {
            const product =await productModel.find().limit(6);
            res.status(200).json( product)
        }catch(err) {
            next(err)
        }
    },
    getProductsAll: async(req,res,next) => {
        try {
            const product =await productModel.find();
            res.status(200).json( product)
        }catch(err) {
            next(err)
        }
    },
    getCategory: async(req,res,next) => {
        try {
            const category = await productModel.find({"category_product_id": ObjectId("647b0ede57ce7bcb09517c44")})
            res.status(200).json(category)
        }catch(err) {
            next(err)
        }
    },
    SortProductAscending: async(req,res,next) => {
        try {
            const ascending = await productModel.aggregate([{$sort: {price: -1}}])
            res.status(200).json(ascending)
            // res.json("hello")
        }catch(err) {
            next(err)
        }
    },
    getSuggestNewCategories: async (req, res) => {
        try {
          const categoryId = req.body._id;
          const category = await categoryModel.aggregate([
            // {
            //   $match: {
            //     id: categoryId
            //   }
            // },
            {
              $lookup: {
                from: "productmodels",
                let: { categoryId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $ne: ["$category_product_id", "$$categoryId"]
                      }
                    }
                  },
                  {
                    $sample: {
                      size: 3 // Số lượng sản phẩm gợi ý giới hạn ở đây
                    }
                  },
                ],
                as: "suggestedProducts"
              }
            },
            {
                $limit: 1 // Giới hạn số lượng danh mục chỉ lấy ra 1
            }
          ]);
          res.status(200).json(category);
        } catch (err) {
          console.log(err);
        }
      }
}

module.exports = productController