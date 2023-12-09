const ReviewsModel = require('../models/reviewsModel');

const reviewsController = {
  // Tạo đánh giá mới
  createReview: async (req, res) => {
    try {
      const newReview = new ReviewsModel(req.body);
      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Lấy danh sách tất cả đánh giá
  getReviewsbyProductId: async (req, res) => {
    try {
      const reviews = await ReviewsModel.find({productId :req.params.productId}).populate('productId').populate('techSpecsId').populate('author');
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Lấy một đánh giá theo ID
  getReviewById: async (req, res) => {
    try {
      const review = await ReviewsModel.find({slug : req.params.slug}).populate('productId').populate('techSpecsId').populate('author');
      res.status(200).json(review);
    } catch (error) {
      res.status(404).json({ message: "Review not found!" });
    }
  },

  // Cập nhật đánh giá
  updateReview: async (req, res) => {
    try {
      const updatedReview = await ReviewsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Xóa đánh giá
  deleteReview: async (req, res) => {
    try {
      await ReviewsModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Review has been deleted." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = reviewsController;
