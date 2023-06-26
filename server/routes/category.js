const express = require("express");
const app = express();
const router = express.Router();
const Categories = require("../controllers/categoryController");
router.post("/", Categories.createCategory);

router.get("/", Categories.getCate);
module.exports = router;
