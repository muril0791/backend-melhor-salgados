const { body, validationResult } = require("express-validator");

exports.validateOrder = [
  body("items").isArray().withMessage("Items must be an array"),
  body("items.*.id").notEmpty().withMessage("Item id is required"),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Item quantity must be at least 1"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
