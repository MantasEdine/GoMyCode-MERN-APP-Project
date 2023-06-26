const express = require("express");
const app = express();
const router = express.Router();
const postFunc = require("../controllers/postController");

router.get("/", postFunc.getPosts);
router.post("/", postFunc.createPost);
router.delete("/:id", postFunc.deletePost);
router.put("/:id", postFunc.updatePost);
router.get("/:id", postFunc.getOnePost);

module.exports = router;
