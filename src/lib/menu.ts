import salmonMentai from "@/assets/menu-salmon-mentai.jpg";
import dimsumMentai from "@/assets/menu-dimsum-mentai.jpg";
import beefMentai from "@/assets/menu-beef-mentai.jpg";
import shiratakiMentai from "@/assets/menu-mentai-shirataki.jpg";

/**
 * NOTE: WHATSAPP_NUMBER is a placeholder. Replace with the real business
 * WhatsApp number (international format, no "+", e.g. 62812xxxx).
 */
export const WHATSAPP_NUMBER = "6287742904911";
export const INSTAGRAM_URL = "https://instagram.com/zervine.kitchen";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const ORDER_MESSAGE =
  "Halo Zervine Kitchen! Saya mau order mentai. Boleh dibantu info batch pre-order terbaru & menu yang tersedia?";

export type Dish = {
  name: string;
  description: string;
  image: string;
  price: number;
  sizes: DishSize[];
  prices: Record<DishSize, number>;
  tag?: string;
};

export type DishSize = "Small" | "Regular";

export const DISHES: Dish[] = [
  {
    name: "Salmon Mentai Rice",
    description:
      "Premium sashimi-grade salmon over seasoned rice, topped with our signature torched mentai sauce.",
    image: salmonMentai,
    price: 45000,
    sizes: ["Small", "Regular"],
    prices: { Small: 22500, Regular: 45000 },
    tag: "Premium",
  },
  {
    name: "Beef Mentai Rice",
    description:
      "Thinly sliced seared beef layered over warm rice with a rich, smoky mentai finish.",
    image: beefMentai,
    price: 50000,
    sizes: ["Small", "Regular"],
    prices: { Small: 25000, Regular: 50000 },
  },
  {
    name: "Dimsum Mentai",
    description:
      "Steamed juicy dimsum generously glazed in creamy, spicy mentai sauce. Perfect for sharing.",
    image: dimsumMentai,
    price: 35000,
    sizes: ["Small", "Regular"],
    prices: { Small: 17500, Regular: 35000 },
  },
  {
    name: "Mentai Shirataki",
    description:
      "Low-carb shirataki noodles swapped in for rice, drenched in our signature torched creamy mentai sauce — the lighter way to enjoy mentai.",
    image: shiratakiMentai,
    price: 40000,
    sizes: ["Small", "Regular"],
    prices: { Small: 20000, Regular: 40000 },
    tag: "New",
  },
];

export const FULFILLMENT_OPTIONS = [
  { value: "delivery", label: "Dikirim (kurir/ojek online)" },
  { value: "cod", label: "COD (bayar di tempat)" },
  { value: "pickup", label: "Ambil sendiri" },
] as const;

export function fulfillmentLabel(value: string) {
  return (
    FULFILLMENT_OPTIONS.find((option) => option.value === value)?.label ?? value
  );
}

export function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export type OrderItem = {
  name: string;
  size: string;
  quantity: number;
  price: number;
};

export type OrderDetails = {
  customer_name: string;
  phone: string;
  address: string;
  fulfillment: string;
  fulfillment_date: string;
  notes: string;
  items: OrderItem[];
  total_estimate: number;
};

/** Builds the ready-to-send WhatsApp message so buyers never have to guess the format. */
export function buildOrderMessage(order: OrderDetails, orderCode?: string) {
  const lines: string[] = [];
  lines.push("*PRE-ORDER ZERVINE KITCHEN*");
  if (orderCode) lines.push(`No. Pesanan: #${orderCode}`);
  lines.push("");
  lines.push(`Nama: ${order.customer_name}`);
  lines.push(`No. WhatsApp: ${order.phone}`);
  lines.push(`Metode: ${fulfillmentLabel(order.fulfillment)}`);
  if (order.fulfillment_date) lines.push(`Tanggal: ${order.fulfillment_date}`);
  lines.push(`Alamat: ${order.address}`);
  lines.push("");
  lines.push("*Pesanan:*");
  for (const item of order.items) {
    lines.push(
      `• ${item.name} (${item.size}) x${item.quantity} — ${formatRupiah(
        item.price * item.quantity,
      )}`,
    );
  }
  lines.push("");
  lines.push(`Estimasi total: ${formatRupiah(order.total_estimate)}`);
  if (order.notes.trim()) lines.push(`Catatan: ${order.notes.trim()}`);
  lines.push("");
  lines.push("Mohon konfirmasi batch pre-order & total akhirnya ya. Terima kasih!");
  return lines.join("\n");
}
