const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const { body } = require("express-validator");
const authHandler = require("../middlewares/authHandler");

router.get("/", postsController.index);

router.post("/",
authHandler,
body("title").notEmpty(),
body("content").notEmpty(),
body("published").notEmpty().isBoolean(),
body("categoryId").isInt(),
body("tags"),
postsController.store)

router.get("/:slug", postsController.show);

router.put("/:slug",authHandler, body("published").isBoolean(), postsController.update);

router.delete("/:slug",authHandler, postsController.destroy);

module.exports = router;