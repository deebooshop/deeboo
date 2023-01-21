const mongoose = require("mongoose");
const slug = require("slug");
const CategorySchema = new mongoose.Schema(
    {
        title: { type: String },
        slug: { type: String},
        description: { type: String },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Category", CategorySchema);