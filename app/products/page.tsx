import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { addProduct, listProducts } from "../../lib/productsStore";

export const metadata: Metadata = {
  title: "Sản phẩm (Server Actions)",
  description: "Quản lý sản phẩm bằng Server Actions và revalidation",
};

// Server Action: xử lý form submit trên server
async function addProductAction(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const price = formData.get("price") as string;

  // Basic validation
  if (!name || !price) {
    // Có thể trả về lỗi chi tiết hơn nếu cần
    return;
  }

  addProduct({ name, price: Number(price) });

  // Làm mới cache của trang này để hiển thị sản phẩm mới
  // render lại sản phẩm
  revalidatePath("/products");
}

// Form component
function ProductForm() {
  return (
    <form
      action={addProductAction}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Thêm sản phẩm mới
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tên sản phẩm
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            style={{ height: "30px" }}
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Giá (VND)
          </label>
          <input
            type="number"
            name="price"
            id="price"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            style={{ height: "30px" }}
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
        >
          Thêm sản phẩm 123
        </button>
      </div>
    </form>
  );
}

// Page component
export default function ProductsPage() {
  const products = listProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Sản phẩm
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Form này sử dụng Server Action để thêm sản phẩm mà không cần API
          route.
        </p>

        <div className="mt-8">
          <ProductForm />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Danh sách hiện tại
          </h2>
          <ul className="mt-6 space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ID: {product.id}
                  </p>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
