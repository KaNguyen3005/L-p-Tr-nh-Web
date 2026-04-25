"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

type Product = {
  id: number;
  name: string;
  price: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Không thể kết nối server!");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    // 1. Xác nhận người dùng
    if (!confirm("Bạn chắc chắn muốn xoá?")) return;
    try {
      // 2. Gọi API xoá
      await api.delete(`/api/products/${id}`);
      // 3. Cập nhật state NGAY (optimistic update)
      // — không cần gọi lại API, UX nhanh hơn
      setProducts((prev) => prev.filter((p) => p.id !== id));
      // 4. Hiển thị toast thành công
      toast.success("Đã xoá sản phẩm");
    } catch (err) {
      toast.error("Xoá thất bại, thử lại!");
      // Rollback: gọi lại server để đồng bộ dữ liệu
      fetchProducts();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await toast.promise(
        api.post("/api/products", {
          name,
          price: Number(price),
        }),
        {
          loading: "Đang lưu...",
          success: "Thêm sản phẩm thành công!",
          error: "Có lỗi xảy ra!",
        },
      );

      setName("");
      setPrice("");
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder="Tên SP"
        />

        <input
          value={price}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.value)
          }
          placeholder="Giá"
          type="number"
        />

        <button type="submit">Thêm sản phẩm</button>
      </form>

      {products.map((p) => (
        <div
          key={p.id}
          className="flex justify-between items-center p-3 border rounded
mb-2"
        >
          <span>
            {p.name} — {p.price.toLocaleString()}đ
          </span>
          <button
            onClick={() => handleDelete(p.id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Xoá
          </button>
        </div>
      ))}
    </div>
  );
}
