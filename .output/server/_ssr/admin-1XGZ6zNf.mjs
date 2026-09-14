import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Bxc8_G9k.mjs";
import { a as fulfillmentLabel, i as formatRupiah, r as buildOrderMessage, u as waLink } from "./menu-C8d1Yvfz.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-1XGZ6zNf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"new",
	"confirmed",
	"paid",
	"delivered",
	"cancelled"
];
var STATUS_LABEL = {
	new: "Baru",
	confirmed: "Dikonfirmasi",
	paid: "Sudah bayar",
	delivered: "Selesai",
	cancelled: "Dibatalkan"
};
function AdminPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [claimError, setClaimError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		supabase.rpc("claim_admin").then(({ error }) => {
			if (error) setClaimError(error.message);
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		});
	}, [queryClient]);
	const { data: orders, isLoading } = useQuery({
		queryKey: ["orders"],
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	async function updateStatus(id, status) {
		await supabase.from("orders").update({ status }).eq("id", id);
		queryClient.invalidateQueries({ queryKey: ["orders"] });
	}
	async function handleSignOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	const totalRevenue = (orders ?? []).filter((order) => order.status !== "cancelled").reduce((sum, order) => sum + order.total_estimate, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-brand-cream px-6 py-12 font-sans text-brand-charcoal md:px-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-10 flex flex-wrap items-end justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold",
						children: "Rekap Pesanan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-brand-charcoal/60",
						children: "Semua pesanan dari form website masuk ke sini."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold uppercase tracking-widest text-brand-charcoal/50",
									children: "Total pesanan"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl font-semibold",
									children: orders?.length ?? 0
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold uppercase tracking-widest text-brand-charcoal/50",
									children: "Estimasi omzet"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl font-semibold",
									children: formatRupiah(totalRevenue)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleSignOut,
								className: "rounded-full border border-brand-charcoal/20 px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white",
								children: "Keluar"
							})
						]
					})]
				}),
				claimError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-6 rounded-xl bg-white p-4 text-sm text-brand-salmon",
					children: claimError
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-brand-charcoal/60",
					children: "Memuat pesanan..."
				}) : (orders?.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-brand-charcoal/10 bg-white p-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: "Belum ada pesanan masuk."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-brand-charcoal/60",
						children: "Pesanan dari form website akan muncul di halaman ini."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl border border-brand-charcoal/10 bg-white p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] font-bold uppercase tracking-widest text-brand-salmon",
										children: [
											"#",
											order.id.slice(0, 6).toUpperCase(),
											" •",
											" ",
											new Date(order.created_at).toLocaleString("id-ID")
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 font-display text-xl font-bold",
										children: order.customer_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-brand-charcoal/70",
										children: [
											order.phone,
											" • ",
											fulfillmentLabel(order.fulfillment),
											order.fulfillment_date ? ` • ${order.fulfillment_date}` : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 max-w-lg text-sm text-brand-charcoal/60",
										children: order.address
									}),
									order.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm italic text-brand-charcoal/60",
										children: ["Catatan: ", order.notes]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl font-semibold",
										children: formatRupiah(order.total_estimate)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: order.status,
										onChange: (e) => void updateStatus(order.id, e.target.value),
										className: "mt-3 rounded-xl border border-brand-charcoal/15 bg-white px-3 py-2 text-xs font-semibold",
										"aria-label": `Status pesanan ${order.customer_name}`,
										children: STATUSES.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: status,
											children: STATUS_LABEL[status]
										}, status))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 border-t border-brand-charcoal/10 pt-4 text-sm",
								children: order.items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										item.name,
										" (",
										item.size,
										") x",
										item.quantity
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-brand-charcoal/60",
										children: formatRupiah(item.price * item.quantity)
									})]
								}, `${order.id}-${index}`))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: waLink(buildOrderMessage({
									customer_name: order.customer_name,
									phone: order.phone,
									address: order.address,
									fulfillment: order.fulfillment,
									fulfillment_date: order.fulfillment_date ?? "",
									notes: order.notes ?? "",
									items: order.items,
									total_estimate: order.total_estimate
								}, order.id.slice(0, 6).toUpperCase())),
								target: "_blank",
								rel: "noopener noreferrer",
								className: "mt-4 inline-block text-xs font-bold uppercase tracking-widest text-whatsapp hover:underline",
								children: "Salin / kirim ulang via WhatsApp"
							})
						]
					}, order.id))
				})
			]
		})
	});
}
//#endregion
export { AdminPage as component };
