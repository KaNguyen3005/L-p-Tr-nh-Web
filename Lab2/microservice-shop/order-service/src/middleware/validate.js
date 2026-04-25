const { body, validationResult } = require("express-validator");

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  next();
};

const orderValidation = [
  body("customerId")
    .notEmpty()
    .withMessage("customerId không được rỗng")
    .isInt({ min: 1 })
    .withMessage("customerId phải là số nguyên dương"),

  body("customerName")
    .notEmpty()
    .withMessage("Tên khách hàng không được rỗng")
    .isLength({ min: 2, max: 100 })
    .withMessage("Tên khách hàng phải từ 2-100 ký tự"),

  body("customerEmail")
    .notEmpty()
    .withMessage("Email không được rỗng")
    .isEmail()
    .withMessage("Email không hợp lệ"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("items phải là mảng và có ít nhất 1 sản phẩm"),

  body("items.*.productId")
    .notEmpty()
    .withMessage("productId không được rỗng"),

  body("items.*.productName")
    .notEmpty()
    .withMessage("Tên sản phẩm không được rỗng"),

  body("items.*.price")
    .isFloat({ min: 0 })
    .withMessage("Giá sản phẩm phải là số không âm"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Số lượng phải là số nguyên lớn hơn 0"),

  body("shippingAddress")
    .notEmpty()
    .withMessage("Địa chỉ giao hàng không được rỗng")
    .isLength({ min: 5, max: 255 })
    .withMessage("Địa chỉ giao hàng phải từ 5-255 ký tự"),

  body("note")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Ghi chú không được vượt quá 500 ký tự"),

  handleValidation,
];

const updateOrderStatusValidation = [
  body("status")
    .notEmpty()
    .withMessage("Trạng thái không được rỗng")
    .isIn(["pending", "confirmed", "shipping", "delivered", "cancelled"])
    .withMessage("Trạng thái không hợp lệ"),

  handleValidation,
];

module.exports = {
  orderValidation,
  updateOrderStatusValidation,
};