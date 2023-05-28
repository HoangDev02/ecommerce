const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const cart = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        products: [
            {
              productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "productModel"
              },
              quantity: Number,
              name: String,
              img: String,
              price: Number,
              total: {
                type: Number,
              },
            }
          ],
          active: {
            type: Boolean,
            default: true
          },
          modifiedOn: {
            type: Date,
            default: Date.now
          },
          subtotal: {
            type: Number,
            default: 0,
          },
    }
)
module.exports = mongoose.model('cart', cart)