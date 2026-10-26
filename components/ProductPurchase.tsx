"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/CartProvider";

export default function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  function addAndGo(destination: "/gio-hang" | "/thanh-toan") {
    addItem(product.id, quantity);
    router.push(destination);
  }

  return (
    <div className="purchase-panel">
      <div className="quantity-control" aria-label="Số lượng">
        <button type="button" aria-label="Giảm số lượng" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15} /></button>
        <span aria-live="polite">{quantity}</span>
        <button type="button" aria-label="Tăng số lượng" onClick={() => setQuantity((value) => value + 1)}><Plus size={15} /></button>
      </div>
      <div className="purchase-buttons">
        <button className="button-outline purchase-add" type="button" onClick={() => addAndGo("/gio-hang")}><ShoppingBag size={17} /> Thêm vào giỏ</button>
        <button className="button-primary purchase-buy" type="button" onClick={() => addAndGo("/thanh-toan")}>Mua ngay</button>
      </div>
    </div>
  );
}