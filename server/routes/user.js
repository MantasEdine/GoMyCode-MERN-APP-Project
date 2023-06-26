const express = require("express");
const app = express();
const router = express.Router();
const userRoutes = require("../controllers/userController");
router.put("/:id", userRoutes.updateUser);
router.delete("/:id", userRoutes.deleteUser);
router.get("/:id", userRoutes.getUser);
// router.delete("/:id");
module.exports = router;
