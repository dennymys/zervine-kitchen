//#region node_modules/.nitro/vite/services/ssr/assets/menu-C8d1Yvfz.js
var menu_salmon_mentai_default = "/assets/menu-salmon-mentai-BiclRGCD.jpg";
var menu_dimsum_mentai_default = "/assets/menu-dimsum-mentai-BPIDEwXe.jpg";
var menu_beef_mentai_default = "/assets/menu-beef-mentai-BLIyrzZE.jpg";
var menu_mentai_shirataki_default = "/assets/menu-mentai-shirataki-CfTKB_5F.jpg";
/**
* NOTE: WHATSAPP_NUMBER is a placeholder. Replace with the real business
* WhatsApp number (international format, no "+", e.g. 62812xxxx).
*/
var WHATSAPP_NUMBER = "6287742904911";
function waLink(message) {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
var DISHES = [
	{
		name: "Salmon Mentai Rice",
		description: "Premium sashimi-grade salmon over seasoned rice, topped with our signature torched mentai sauce.",
		image: menu_salmon_mentai_default,
		price: 45e3,
		sizes: ["Small", "Regular"],
		prices: {
			Small: 22500,
			Regular: 45e3
		},
		tag: "Premium"
	},
	{
		name: "Beef Mentai Rice",
		description: "Thinly sliced seared beef layered over warm rice with a rich, smoky mentai finish.",
		image: menu_beef_mentai_default,
		price: 5e4,
		sizes: ["Small", "Regular"],
		prices: {
			Small: 25e3,
			Regular: 5e4
		}
	},
	{
		name: "Dimsum Mentai",
		description: "Steamed juicy dimsum generously glazed in creamy, spicy mentai sauce. Perfect for sharing.",
		image: menu_dimsum_mentai_default,
		price: 35e3,
		sizes: ["Small", "Regular"],
		prices: {
			Small: 17500,
			Regular: 35e3
		}
	},
	{
		name: "Mentai Shirataki",
		description: "Low-carb shirataki noodles swapped in for rice, drenched in our signature torched creamy mentai sauce — the lighter way to enjoy mentai.",
		image: menu_mentai_shirataki_default,
		price: 4e4,
		sizes: ["Small", "Regular"],
		prices: {
			Small: 2e4,
			Regular: 4e4
		},
		tag: "New"
	}
];
var FULFILLMENT_OPTIONS = [
	{
		value: "delivery",
		label: "Dikirim (kurir/ojek online)"
	},
	{
		value: "cod",
		label: "COD (bayar di tempat)"
	},
	{
		value: "pickup",
		label: "Ambil sendiri"
	}
];
function fulfillmentLabel(value) {
	return FULFILLMENT_OPTIONS.find((option) => option.value === value)?.label ?? value;
}
function formatRupiah(value) {
	return `Rp ${value.toLocaleString("id-ID")}`;
}
/** Builds the ready-to-send WhatsApp message so buyers never have to guess the format. */
function buildOrderMessage(order, orderCode) {
	const lines = [];
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
	for (const item of order.items) lines.push(`• ${item.name} (${item.size}) x${item.quantity} — ${formatRupiah(item.price * item.quantity)}`);
	lines.push("");
	lines.push(`Estimasi total: ${formatRupiah(order.total_estimate)}`);
	if (order.notes.trim()) lines.push(`Catatan: ${order.notes.trim()}`);
	lines.push("");
	lines.push("Mohon konfirmasi batch pre-order & total akhirnya ya. Terima kasih!");
	return lines.join("\n");
}
//#endregion
export { fulfillmentLabel as a, menu_mentai_shirataki_default as c, formatRupiah as i, menu_salmon_mentai_default as l, FULFILLMENT_OPTIONS as n, menu_beef_mentai_default as o, buildOrderMessage as r, menu_dimsum_mentai_default as s, DISHES as t, waLink as u };
