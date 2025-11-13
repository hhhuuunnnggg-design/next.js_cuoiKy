import { NextResponse } from "next/server";

type Product = {
  id: string;
  name: string;
  price: number;
  createdAt: string; // ISO string
};

const products: Product[] = [
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
];

function genId() {
  return (
    (globalThis as any).crypto?.randomUUID?.() ??
    `p_${Math.random().toString(36).slice(2, 10)}`
  );
}

export async function GET() {
  return NextResponse.json({ data: products }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = body?.name;
    const price = body?.price;

    // Basic validation
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Field 'name' is required and must be a non-empty string" },
        { status: 400 }
      );
    }
    const parsedPrice = Number(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json(
        {
          error: "Field 'price' is required and must be a non-negative number",
        },
        { status: 400 }
      );
    }

    const product: Product = {
      id: genId(),
      name: name.trim(),
      price: Math.round(parsedPrice),
      createdAt: new Date().toISOString(),
    };

    products.push(product);

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected error", details: (err as Error).message },
      { status: 500 }
    );
  }
}

// Optional: handle OPTIONS for CORS preflight if you call from external origins
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
