const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    product_name: {
        type:String,
        required: 'Product Name is required',
    },
    product_type: {
        type:String,
        required: 'Product Type is required',
    },
    brand_name: {
        type:String,
        required: 'Brand Name is required',
    },
    size: {
        type:Number,
        enum: [8, 10, 12, 16,20,25,32],
        default: 8 
    },
    quantity: {
        type:Number,
    },
    price: {
        type:Number,
        required: 'Email address is required',
    },
    images: [String],
},{ timestamps: { createdAt: 'created_at' } })
const Product = mongoose.model('Products', productSchema)
module.exports = Product;