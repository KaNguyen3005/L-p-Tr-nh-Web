interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

async function getRandomProduct(): Promise<Product> {
  const res = await fetch(
    "https://dummyjson.com/products/category/mens-shirts",
    { cache: "no-store" } // SSR: no cache → fresh data on every request
  );
  const data = await res.json();
  const products: Product[] = data.products;
  const randomIndex = Math.floor(Math.random() * products.length);
  return products[randomIndex];
}

export default async function Home() {
  const product = await getRandomProduct();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
        Fashion Trending 2026
      </h1>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-72 hover:shadow-xl transition-shadow duration-300">
        {/* Product Image */}
        <div className="bg-gray-100 flex items-center justify-center h-64 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-contain h-full w-full"
          />
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-teal-500 uppercase tracking-wide">
              New Arrival
            </span>
            <span className="text-lg font-bold text-red-500">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <h2 className="text-gray-800 font-semibold text-base mb-4 leading-snug">
            {product.title}
          </h2>

          <button className="w-full bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 active:scale-95 transition-all duration-200 cursor-pointer">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-400">
        Press{" "}
        <kbd className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded font-mono text-xs">
          F5
        </kbd>{" "}
        to see a new trending item!
      </p>
    </main>
  );
}
