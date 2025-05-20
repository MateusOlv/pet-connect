const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

ProductSchema.statics.getNextProductId = async function(){
    const lastProduct = await this.findOne().sort('-productId');
    return lastProduct ? lastProduct.productId + 1 : 1;
}

module.exports = mongoose.model('Product', ProductSchema);