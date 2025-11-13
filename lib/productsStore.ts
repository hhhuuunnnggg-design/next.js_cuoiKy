export type Product = {
  id: string;
  name: string;
  price: number;
  createdAt: string; // ISO
};

type Store = {
  products: Product[];
};

// Ensure a single store instance across hot reloads in dev
const globalStore = globalThis as unknown as { __productsStore?: Store };

if (!globalStore.__productsStore) {
  globalStore.__productsStore = {
    products: [
      {
        id: "p1",
        name: "Bàn phím cơ",
        price: 1200000,
        createdAt: new Date().toISOString(),
      },
      {
        id: "p2",
        name: "Chuột không dây",
        price: 450000,
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

const store = globalStore.__productsStore as Store;

export function listProducts(): Product[] {
  // return copy to avoid external mutation
  return [...store.products].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
}

export function addProduct(input: { name: string; price: number }): Product {
  // tạo id cho sản phẩm
  const id =
    (globalThis as any).crypto?.randomUUID?.() ??
    `p_${Math.random().toString(36).slice(2, 10)}`;
  // tạo object sản phẩm mới
  const product: Product = {
    id,
    name: input.name,
    price: Math.round(input.price),
    createdAt: new Date().toISOString(),
  };
  // lưu tạm vào bộ nhớ
  store.products.push(product);
  return product;
}
