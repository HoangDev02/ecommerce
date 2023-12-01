const mongoose = require("mongoose");

const dealSale = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  quantity: Number,
  saleDate: {
    type: Date,
    required: true,
  },
  saleTime: {
    type: String,
    required: true,
  },
  modifiedOn: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("DealSale", dealSale);
