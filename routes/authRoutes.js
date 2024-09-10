const express = require("express");
const authController = require("../controllers/authController");
const { validateUser } = require("../middleware/validateUser");

const router = express.Router();

router.post("/register", validateUser, authController.register);
router.post("/login", validateUser, authController.login);

module.exports = router;
