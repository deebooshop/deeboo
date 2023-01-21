const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        image: { type: String },
        title: { type: String },
        slug: { type: String, unique: false,},
        description: { type: String },
        price: { type: Number },
        promotionPrice: { type: Number },
        isPromotion: { type: Boolean, default: false },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        reference: { type: String },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Product", ProductSchema);