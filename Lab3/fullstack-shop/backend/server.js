const express = require("express");
const cors = require("cors");
const app = express();

// Middleware log tổng quát
app.use((req, _, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000", // chỉ cho phép NextJS
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());
let products = [
  { id: 1, name: "Áo thun basic", price: 150000 },
  { id: 2, name: "Quần jeans slim", price: 450000 },
];
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.listen(5000, () => console.log("Backend chạy tại port :5000"));

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  // Validation đơn giản
  if (!name || !price) return res.status(400).json({ error: "Thiếu dữ liệu" });
  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price),
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  console.log("REQ PARAM ID:", req.params.id);
  console.log("ID AFTER NUMBER:", id);
  console.log("CURRENT PRODUCTS:", products);

  const index = products.findIndex((p) => Number(p.id) === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Không tìm thấy sản phẩm",
      id,
      products,
    });
  }

  products.splice(index, 1);

  res.json({ message: "Đã xoá thành công" });
});
