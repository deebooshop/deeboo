const {
    updateMyAddress,
    deleteMyAddress,
    getAddress,
    getAddresses,
    getMyAddress,
} = require("../controllers/address.controllers");
const isAdmin = require("../middlewares/isAdmin");
const verifyToken = require("../middlewares/verifyToken");
const router = require("express").Router();

router.put("/:addressId", /*verifyToken*/ updateMyAddress);
router.delete("/:addressId", /*verifyToken*/ deleteMyAddress);
router.get("/me", /*verifyToken*/ getMyAddress);
router.get("/:addressId", /*verifyToken*/ /*isAdmin,*/ getAddress);
router.get("/", /*verifyToken*/ /*isAdmin*/ getAddresses);
module.exports = router;