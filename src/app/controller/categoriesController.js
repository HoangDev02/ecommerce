
const categoryModel = require('../models/categoryModel')

const productModel = require('../models/product.model')

const categoriesController = {
    createCategories: async (req,res,next) => {
        const newCategory = new categoryModel(req.body);
        try {
            const savedCategories = await newCategory.save()
            res.status(200).json(savedCategories)
        } catch(err) {
            next(err)
        }
    },
    updateCategories: async (req,res,next) => {
        try{
            const updateCategories = await categoryModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json(updateCategories)
        }catch(err) {
            next(err)
        }
    },
    deleteCategories: async(req,res,next) => {
        try {
            await categoryModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Categories has been delete")
        }catch(err) {
            next(err)
        }
    },
    getCategory: async(req,res,next) => {
        try {
            const category = await categoryModel.findById(req.params.id);
            res.status(200).json(category)
        }catch(err) {
            next(err)
        }
    },
    getCategories: async(req,res,next) => {
        try {
            const category = await categoryModel.find();
            res.status(200).json(category)
        }catch(err) {
            next(err)
        }
    },
    //  group 2 data categoryModel + productModel
     getNewCategories: async(req,res,next) => {
        try {
            const category = await categoryModel.aggregate([
                {
                    $lookup: {
                        from: "productmodels",
                        localField: "_id",
                        foreignField: "category_product_id",
                        as: "newCategory"
                    }
                }
            ])
            res.status(200).json(category)
        }catch(err) {
            next(err)
        }
    },
    
}
module.exports = categoriesController