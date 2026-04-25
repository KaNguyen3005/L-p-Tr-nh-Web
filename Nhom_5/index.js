
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Middleware - Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});


// Middleware - checkAge (kiểm tra age < 18 hoặc trả 400 + message lỗi)
const checkAge = (req, res, next) => {
  const age = req.query.age || req.body.age;
  if (age && age < 18) {
    return res.status(400).json({ error: 'Bạn chưa đủ 18 tuổi' });
  }
  next();
};

// Static files - serve HTML
app.use(express.static('public'));

// Middleware để parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route GET /api/info - lấy thông tin người dùng
app.get('/api/info', checkAge, (req, res) => {
  const { name, age } = req.query;
  
  if (!name || !age) {
    return res.status(400).json({ error: 'Thiếu name hoặc age' });
  }
  
  res.json({
    name: name,
    age: parseInt(age),
    message: 'Chào mừng ' + name + '!'
  });
});

// Route POST /api/register - đăng ký người dùng
app.post('/api/register', checkAge, (req, res) => {
  const { name, age, email } = req.body;
  
  // Validate bắt buộc
  if (!name || !age || !email) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ' });
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email không hợp lệ' });
  }
  
  res.json({
    id: 1,
    name: name,
    age: parseInt(age),
    email: email
  });
});

// Chạy server trên port theo máy bạn
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
