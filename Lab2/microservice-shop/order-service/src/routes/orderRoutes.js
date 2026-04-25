const router = require("express").Router();

const {
  createOrder,
  getOrdersByCustomer,
  updateOrderStatus,
} = require("../controllers/orderController.js");

// Nếu bạn có middleware validate riêng cho order thì đổi tên lại:
const {
   orderValidation,
   updateOrderStatusValidation 
} = require("../middleware/validate");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API quản lý đơn hàng
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Tạo đơn hàng mới
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - customerName
 *               - customerEmail
 *               - items
 *               - shippingAddress
 *             properties:
 *               customerId:
 *                 type: integer
 *                 example: 1
 *               customerName:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               customerEmail:
 *                 type: string
 *                 example: a@gmail.com
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - productName
 *                     - price
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 66123abc123def4567890001
 *                     productName:
 *                       type: string
 *                       example: iPhone 15
 *                     price:
 *                       type: number
 *                       example: 25000000
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *               shippingAddress:
 *                 type: string
 *                 example: 123 Lê Lợi, Quận 1, TP.HCM
 *               note:
 *                 type: string
 *                 example: Giao giờ hành chính
 *     responses:
 *       201:
 *         description: Tạo đơn hàng thành công
 *       422:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/", orderValidation, createOrder);

/**
 * @swagger
 * /api/orders/customer/{customerId}:
 *   get:
 *     summary: Lấy danh sách đơn hàng theo khách hàng
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID khách hàng
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số bản ghi mỗi trang
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, shipping, delivered, cancelled]
 *         description: Lọc theo trạng thái đơn hàng
 *     responses:
 *       200:
 *         description: Lấy danh sách đơn hàng thành công
 */
router.get("/customer/:customerId", getOrdersByCustomer);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Cập nhật trạng thái đơn hàng
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID đơn hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, shipping, delivered, cancelled]
 *                 example: confirmed
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *       404:
 *         description: Không tìm thấy đơn hàng
 *       422:
 *         description: Dữ liệu không hợp lệ
 */
router.put("/:id/status", updateOrderStatusValidation, updateOrderStatus);

module.exports = router;