const Product = require("../models/product.models");
const Category = require("../models/category.models");


const createProduct = async (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.body.image,
        reference: req.body.reference,
        slug:req.body.slug,
    });
    try {
        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
const getProductBySlug= async (req, res) => {
    try {
      const product = await Product.find({ slug: req.params.slug }).populate('category');
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

const getallProducts = async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let filter = {};
    if (req.query.category) {
        filter.category = (
            await Category.findOne({
                slug: req.query.category,
            })
        )?._id;
    }
    if (req.query.q) {
        filter.title = { $regex: ".*" + req.query.q + ".*", $options: "i" };
    }
    try {
        const products = await Product.find(filter).limit(limit).populate("category");
        return res.status(200).json(products);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getProductByCategoryTitle = async (req, res) => {
  try {
    const category = await Category.findOne({ title: req.params.title });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const products = await Product.find({ category: category._id }).populate('category');
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: "lenna" });
  }
};

  const getProductBySlugAndRefrence = async (req, res) => {
    const { slug, reference } = req.params;
    try {
      const products = await Product.find({ slug, reference }).populate('category');
      if (!products || products.length === 0) {
        return res.status(404).json({ error: 'No products found' });
      }
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
  const searchProducts = async (req, res) => {
    const { query } = req.query;
    try {
      const results = await Product.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      }).populate("category").exec();
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
const deleteProduct = async (req, res) => {
    const id = req.params.productId;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        return res.status(200).json(deletedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const updateProduct = async (req, res) => {
    const id = req.params.productId;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json(updatedProduct);
    } catch (err) {
        return res.status(500).json(err);
    }
};
const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).populate("category");

    if (product) {
      return res.status(200).json(product);
    } else {
      throw new Error("Product not found");
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: "Product not found" });
  }
};
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.getProductBySlug = getProductBySlug;
module.exports.deleteProduct = deleteProduct;
module.exports.getallProducts = getallProducts;
module.exports.getProductByCategoryTitle = getProductByCategoryTitle;
module.exports.getProductById = getProductById;
module.exports.searchProducts = searchProducts;
module.exports.getProductBySlugAndRefrence = getProductBySlugAndRefrence;

