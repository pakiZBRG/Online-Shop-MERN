const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    writer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, maxlength: 50 },
    description: { type: String },
    price: { type: Number, default: 0 },
    images: { type: Array, default: [] },
    continent: { type: String },
    sold: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);