const {
  createProduct,
  updateProduct,
  getProductBySlug,
  deleteProduct,
  getallProducts,
  getProductByCategoryTitle,
  getProductById, // Import getProductById controller
  searchProducts,
  getProductBySlugAndRefrence,
} = require("../controllers/product.controllers");

const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.post("/", /*verifyToken,*/ createProduct);
router.put("/:productSlug", verifyToken, updateProduct);
router.delete("/:productSlug", verifyToken, deleteProduct);
router.get("/search", searchProducts);
router.get("/productcat/:title", getProductByCategoryTitle);
router.get("/id/:productId", getProductById); // Add getProductById route
router.get("/:slug", getProductBySlug);
router.get("/", getallProducts);
router.get("/:slug/:reference", getProductBySlugAndRefrence);

module.exports = router;