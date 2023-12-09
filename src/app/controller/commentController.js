const commentModel = require('../models/commentModel')
const productModel = require('../models/product.model')
const userModel = require('../models/user.model')
const CommentController = {
    postComment : async (req,res) => {
        const postComment = new commentModel(req.body)
        try {
            await postComment.save()
            res.status(200).json("comment Success")    
        }catch(err) {
            console.log(err);
        }
    },
    getCommentByUserId: async (req,res) => {
        try {
            const getCommentByUser = await commentModel.find({productId: req.params.productId}).populate('userId', 'username');;
            res.status(200).json(getCommentByUser)
        }catch(err) {
            console.log(err);
        }
    },
    updateCommentByUserId: async (req,res) => {
        try {
            const updateCommentByUser = await commentModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updateCommentByUser)
        }catch(err) {
            console.log(err);
        }
    },
    deleteCommentByUserId: async (req,res) => {
        try {
            await commentModel.findByIdAndDelete(req.params.id);
            res.status(200).json("delete success")
        }catch(err) {
            console.log(err);
        }
    }
}
module.exports = CommentController