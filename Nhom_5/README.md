# Xây Dựng Server + Form Đăng Ký Người Dùng

## Công Nghệ Sử Dụng
- **Node.js + Express** - Backend framework
- **Middleware** - Logger, checkAge validation
- **Routing** - GET /api/info, POST /api/register
- **HTML + CSS + Fetch API** - Frontend forms
- **JSON** - Dữ liệu truyền tải

## Cấu Trúc Project
```
.
├── index.js              # Server Express chính
├── public/
│   └── index.html       # Frontend với 2 form
├── package.json         # Dependencies
├── .env                 # Cấu hình môi trường
└── .gitignore          # Git ignore
```

## Hướng Dẫn Chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy server
```bash
npm start
```

Hoặc chạy với nodemon (tự reload):
```bash
npm run dev
```

### 3. Truy cập ứng dụng
Mở trình duyệt và vào: `http://localhost:3000`

## Các Route API

### GET /api/info
- **Tham số**: `name`, `age` (query string)
- **Middleware**: checkAge (age >= 18)
- **Response thành công**:
```json
{
  "name": "An",
  "age": 20,
  "message": "Chào mừng An!"
}
```
- **Response lỗi** (age < 18):
```json
{
  "error": "Bạn chưa đủ 18 tuổi"
}
```

### POST /api/register
- **Body**: `{ name, age, email }`
- **Middleware**: checkAge (age >= 18)
- **Validation**: 
  - Kiểm tra đầy đủ dữ liệu (name, age, email)
  - Kiểm tra format email
- **Response thành công**:
```json
{
  "id": 1,
  "name": "An",
  "age": 20,
  "email": "an@email.com"
}
```
- **Response lỗi** (thiếu field):
```json
{
  "error": "Vui lòng điền đầy đủ"
}
```

## Middleware
1. **Logger** - In ra console: `[timestamp] METHOD /path`
2. **checkAge** - Kiểm tra tuổi < 18 trước route handler
3. **express.static()** - Serve static HTML files
4. **express.json()** - Parse JSON request body

## Tính Năng Form
- **FORM 1**: GET request → lấy thông tin người dùng
- **FORM 2**: POST request → đăng ký tài khoản mới
- Validation thực thi trên server
- Response hiển thị với styling đẹp mắt
- Hỗ trợ responsive design

## Troubleshooting
- Nếu port 3000 đang sử dụng: sửa PORT trong `.env`
- Nếu lỗi `Cannot find module 'express'`: chạy `npm install`
- Mở DevTools (F12) để xem Network requests
