import { n as __toESM } from "../_runtime.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as supabase } from "./client-Bxc8_G9k.mjs";
import { c as menu_mentai_shirataki_default, i as formatRupiah, l as menu_salmon_mentai_default, n as FULFILLMENT_OPTIONS, o as menu_beef_mentai_default, r as buildOrderMessage, s as menu_dimsum_mentai_default, t as DISHES$1, u as waLink } from "./menu-C8d1Yvfz.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as objectType, r as stringType, t as literalType } from "../_libs/zod.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-9FAL-Oks.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_mentai_default = "/assets/hero-mentai-Cbg3RuAs.jpg";
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var orderSchema = objectType({
	customer_name: stringType().trim().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
	phone: stringType().trim().min(8, "Nomor WhatsApp tidak valid").max(20, "Nomor WhatsApp maksimal 20 karakter").regex(/^[0-9+\s-]+$/, "Nomor WhatsApp hanya boleh angka"),
	address: stringType().trim().min(5, "Alamat terlalu singkat").max(500, "Alamat maksimal 500 karakter"),
	fulfillment: stringType().min(1),
	fulfillment_date: stringType().max(20).optional().or(literalType("")),
	notes: stringType().max(500, "Catatan maksimal 500 karakter")
});
var inputClass = "w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-salmon";
var labelClass = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-brand-charcoal/60";
function OrderFormDialog({ open, onOpenChange, initialDish }) {
	const [selection, setSelection] = (0, import_react.useState)(() => initialDish ? { [initialDish]: {
		size: "Regular",
		quantity: 1
	} } : {});
	const [form, setForm] = (0, import_react.useState)({
		customer_name: "",
		phone: "",
		address: "",
		fulfillment: "delivery",
		fulfillment_date: "",
		notes: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const items = (0, import_react.useMemo)(() => DISHES$1.filter((dish) => selection[dish.name]).map((dish) => ({
		name: dish.name,
		size: selection[dish.name].size,
		quantity: selection[dish.name].quantity,
		price: dish.prices[selection[dish.name].size]
	})), [selection]);
	const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	function toggleDish(name) {
		setSelection((prev) => {
			const next = { ...prev };
			if (next[name]) delete next[name];
			else next[name] = {
				size: "Regular",
				quantity: 1
			};
			return next;
		});
	}
	function updateDish(name, patch) {
		setSelection((prev) => ({
			...prev,
			[name]: {
				...prev[name],
				...patch
			}
		}));
	}
	async function handleSubmit(event) {
		event.preventDefault();
		const parsed = orderSchema.safeParse(form);
		const nextErrors = {};
		if (!parsed.success) for (const issue of parsed.error.issues) nextErrors[String(issue.path[0])] = issue.message;
		if (items.length === 0) nextErrors.items = "Pilih minimal satu menu";
		setErrors(nextErrors);
		if (Object.keys(nextErrors).length > 0 || !parsed.success) return;
		setSubmitting(true);
		const payload = {
			...parsed.data,
			fulfillment_date: parsed.data.fulfillment_date || null,
			notes: parsed.data.notes ?? "",
			items,
			total_estimate: total
		};
		const code = crypto.randomUUID().slice(0, 6).toUpperCase();
		const message = buildOrderMessage({
			...payload,
			fulfillment_date: parsed.data.fulfillment_date ?? "",
			notes: payload.notes
		}, code);
		const whatsappUrl = waLink(message);
		const whatsappWindow = window.open(whatsappUrl, "_blank");
		const { error } = await supabase.from("orders").insert(payload);
		setSubmitting(false);
		if (error) {
			setErrors({ submit: "Pesanan gagal tersimpan. Coba lagi, atau langsung chat kami di WhatsApp." });
			if (!whatsappWindow) window.location.assign(whatsappUrl);
			return;
		}
		setResult({
			code,
			message
		});
		if (!whatsappWindow) window.location.assign(whatsappUrl);
	}
	function handleOpenChange(next) {
		onOpenChange(next);
		if (!next) {
			setResult(null);
			setErrors({});
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "max-h-[90vh] overflow-y-auto border-brand-charcoal/10 bg-brand-cream sm:max-w-2xl",
			children: result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-2xl",
						children: "Pesanan tersimpan!"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
						"No. pesanan kamu ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["#", result.code] }),
						". Tinggal kirim pesan ini ke admin — formatnya sudah otomatis terisi."
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-6 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-xl bg-white p-4 text-left text-xs leading-relaxed text-brand-charcoal/80",
						children: result.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: waLink(result.message),
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-6 inline-flex w-full items-center justify-center rounded-full bg-whatsapp px-8 py-4 text-sm font-bold uppercase tracking-widest text-white",
						children: "Kirim ke WhatsApp"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-2xl",
					children: "Form Pre-Order"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Isi sekali di sini — pesanan langsung tercatat dan pesan WhatsApp-nya otomatis dibuat rapi." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: labelClass,
								children: "Pilih Menu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: DISHES$1.map((dish) => {
									const picked = selection[dish.name];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border border-brand-charcoal/10 bg-white p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "checkbox",
													checked: Boolean(picked),
													onChange: () => toggleDish(dish.name),
													className: "size-4 accent-brand-salmon"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex-1 text-sm font-semibold",
													children: dish.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm text-brand-charcoal/60",
													children: formatRupiah(dish.prices[picked?.size ?? "Regular"])
												})
											]
										}), picked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: picked.size,
												onChange: (e) => updateDish(dish.name, { size: e.target.value }),
												className: inputClass,
												"aria-label": `Ukuran ${dish.name}`,
												children: dish.sizes.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: size,
													children: size
												}, size))
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: 1,
												max: 50,
												value: picked.quantity,
												onChange: (e) => updateDish(dish.name, { quantity: Math.min(50, Math.max(1, Number(e.target.value) || 1)) }),
												className: `${inputClass} w-24`,
												"aria-label": `Jumlah ${dish.name}`
											})]
										})]
									}, dish.name);
								})
							}),
							errors.items && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-brand-salmon",
								children: errors.items
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: labelClass,
									htmlFor: "customer_name",
									children: "Nama"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "customer_name",
									className: inputClass,
									maxLength: 100,
									value: form.customer_name,
									onChange: (e) => setForm({
										...form,
										customer_name: e.target.value
									})
								}),
								errors.customer_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-brand-salmon",
									children: errors.customer_name
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: labelClass,
									htmlFor: "phone",
									children: "No. WhatsApp"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "phone",
									className: inputClass,
									maxLength: 20,
									placeholder: "0812xxxxxxx",
									value: form.phone,
									onChange: (e) => setForm({
										...form,
										phone: e.target.value
									})
								}),
								errors.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-brand-salmon",
									children: errors.phone
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								htmlFor: "address",
								children: "Alamat lengkap"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "address",
								rows: 3,
								maxLength: 500,
								className: inputClass,
								value: form.address,
								onChange: (e) => setForm({
									...form,
									address: e.target.value
								})
							}),
							errors.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-brand-salmon",
								children: errors.address
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								htmlFor: "fulfillment",
								children: "Metode"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "fulfillment",
								className: inputClass,
								value: form.fulfillment,
								onChange: (e) => setForm({
									...form,
									fulfillment: e.target.value
								}),
								children: FULFILLMENT_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: option.value,
									children: option.label
								}, option.value))
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								htmlFor: "fulfillment_date",
								children: "Tanggal ambil / kirim"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "fulfillment_date",
								type: "date",
								className: inputClass,
								value: form.fulfillment_date,
								onChange: (e) => setForm({
									...form,
									fulfillment_date: e.target.value
								})
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: labelClass,
								htmlFor: "notes",
								children: "Catatan khusus (opsional)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "notes",
								rows: 2,
								maxLength: 500,
								placeholder: "Contoh: tanpa pedas, extra sauce, dll.",
								className: inputClass,
								value: form.notes,
								onChange: (e) => setForm({
									...form,
									notes: e.target.value
								})
							}),
							errors.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-brand-salmon",
								children: errors.notes
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl bg-white px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-widest text-brand-charcoal/60",
								children: "Estimasi total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl font-semibold",
								children: formatRupiah(total)
							})]
						}),
						errors.submit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-brand-salmon",
							children: errors.submit
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: submitting,
							className: "w-full rounded-full bg-brand-charcoal px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-salmon disabled:opacity-60",
							children: submitting ? "Menyimpan..." : "Lanjut ke WhatsApp"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-[11px] text-brand-charcoal/40",
							children: "Harga di atas masih estimasi. Total akhir dikonfirmasi admin di WhatsApp."
						})
					]
				})]
			})
		})
	});
}
var INSTAGRAM_URL = "https://instagram.com/zervine.kitchen";
var DISHES = [
	{
		name: "Salmon Mentai Rice",
		description: "Premium sashimi-grade salmon over seasoned rice, topped with our signature torched mentai sauce.",
		image: menu_salmon_mentai_default,
		priceLabel: "Mulai Rp 22.500",
		sizes: ["Small", "Regular"],
		tag: "Premium"
	},
	{
		name: "Beef Mentai Rice",
		description: "Thinly sliced seared beef layered over warm rice with a rich, smoky mentai finish.",
		image: menu_beef_mentai_default,
		priceLabel: "Mulai Rp 25.000",
		sizes: ["Small", "Regular"]
	},
	{
		name: "Dimsum Mentai",
		description: "Steamed juicy dimsum generously glazed in creamy, spicy mentai sauce. Perfect for sharing.",
		image: menu_dimsum_mentai_default,
		priceLabel: "Mulai Rp 17.500",
		sizes: ["Small", "Regular"]
	},
	{
		name: "Mentai Shirataki",
		description: "Low-carb shirataki noodles swapped in for rice, drenched in our signature torched creamy mentai sauce — the lighter way to enjoy mentai.",
		image: menu_mentai_shirataki_default,
		priceLabel: "Mulai Rp 20.000",
		sizes: ["Small", "Regular"],
		tag: "New"
	}
];
function Index() {
	const [orderDialog, setOrderDialog] = (0, import_react.useState)({
		key: 0,
		open: false,
		initialDish: void 0
	});
	function openOrderForm(initialDish) {
		setOrderDialog((current) => ({
			key: current.key + 1,
			open: true,
			initialDish
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-brand-cream font-sans text-brand-charcoal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-brand-salmon px-4 py-2 text-center text-xs font-semibold uppercase tracking-widest text-white",
				children: "Pre-Order Only • Made fresh per batch • Order via WhatsApp"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center justify-between px-6 py-8 md:px-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl font-bold uppercase tracking-tight",
						children: "Zervine Kitchen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden gap-8 text-sm font-medium uppercase tracking-tighter md:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#menu",
								className: "transition-colors hover:text-brand-salmon",
								children: "Menu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#how-to-order",
								className: "transition-colors hover:text-brand-salmon",
								children: "How to Order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#testimonials",
								className: "transition-colors hover:text-brand-salmon",
								children: "Testimonials"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: INSTAGRAM_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "border-b border-brand-charcoal pb-1 text-sm font-semibold transition-all hover:border-brand-salmon hover:text-brand-salmon",
						children: "Follow Instagram"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-1 items-center gap-12 px-6 py-12 md:px-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl italic text-brand-salmon",
						children: "Est. 2020"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mb-8 mt-4 font-display text-6xl font-bold leading-[0.9] md:text-8xl",
						children: [
							"Signature ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Mentai, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-brand-gold",
								children: "Crafted Fresh."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-10 max-w-md text-lg leading-relaxed text-brand-charcoal/80",
						children: "Handcrafted home-cooked meals featuring our signature creamy mentai sauce — from premium salmon and beef to steamed dimsum, now also on low-carb shirataki noodles. Made fresh, only by pre-order, delivered straight to your door."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => openOrderForm(),
							className: "inline-flex items-center justify-center rounded-full bg-brand-charcoal px-8 py-5 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-salmon",
							children: "Start Your Order"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#menu",
							className: "inline-flex items-center justify-center rounded-full border border-brand-charcoal px-8 py-5 text-center text-sm font-bold uppercase tracking-widest transition-colors hover:bg-white",
							children: "View Menu"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_mentai_default,
						alt: "Signature mentai rice with blow-torched creamy orange sauce in a foil tray",
						width: 1200,
						height: 1200,
						className: "aspect-square w-full rounded-2xl bg-stone-200 object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute -bottom-6 -left-6 hidden max-w-[200px] rounded-lg bg-white p-6 shadow-xl md:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-xs font-bold uppercase italic tracking-tighter text-brand-salmon",
							children: "Premium Salmon Available"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm leading-tight",
							children: "Fresh, sashimi-grade salmon for our signature Salmon Mentai."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "menu",
				className: "bg-white px-6 py-24 md:px-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-16 flex items-end justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-4xl font-bold",
								children: "Our Signatures"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-brand-charcoal/60",
								children: "Available for every pre-order batch"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-4 hidden h-px flex-1 bg-brand-charcoal/10 md:mx-12 md:block" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4",
							children: DISHES.map((dish) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group flex h-full cursor-pointer flex-col",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative mb-6 aspect-[4/5] overflow-hidden rounded-lg bg-stone-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: dish.image,
											alt: dish.name,
											loading: "lazy",
											width: 1024,
											height: 1024,
											className: "size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
										}), dish.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `absolute left-3 top-3 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${dish.tag === "Premium" ? "border-amber-300 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-stone-900 shadow-sm" : dish.tag === "New" ? "border-red-200 bg-red-50 text-red-600" : "border-brand-charcoal/10 bg-brand-charcoal text-white"}`,
											children: dish.tag
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mb-2 font-display text-xl font-bold",
										children: dish.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-4 text-sm text-brand-charcoal/70",
										children: dish.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto grid grid-cols-[1fr_auto] items-end gap-3 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: dish.sizes.map((size) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-brand-cream px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-charcoal/60",
												children: size
											}, size))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "whitespace-nowrap font-display text-lg font-semibold leading-none text-brand-charcoal",
											children: dish.priceLabel
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => openOrderForm(dish.name),
										className: "mt-6 block w-full rounded-full border border-brand-charcoal py-3 text-center text-xs font-bold uppercase tracking-widest transition-colors hover:bg-brand-charcoal hover:text-white",
										children: "Order this"
									})
								]
							}, dish.name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-10 text-center text-xs text-brand-charcoal/40",
							children: "Prices shown are illustrative — confirm the latest prices on WhatsApp. Available sizes: Small & Regular."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "how-to-order",
				className: "bg-brand-charcoal px-6 py-24 text-white md:px-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-16 font-display text-4xl font-bold md:text-5xl",
							children: "How to Secure Your Box"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-12 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-6 flex size-12 items-center justify-center rounded-full border border-white/20 font-display text-xl",
											children: "1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "mb-4 text-sm font-bold uppercase tracking-widest",
											children: "Check Batch"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-white/60",
											children: "Follow our IG or check this site for the next open pre-order batch date."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-6 flex size-12 items-center justify-center rounded-full border border-white/20 font-display text-xl",
											children: "2"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "mb-4 text-sm font-bold uppercase tracking-widest",
											children: "WhatsApp Us"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-white/60",
											children: "Send us your details: Name, Address, Menu Variant, Size & Quantity via WhatsApp."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-6 flex size-12 items-center justify-center rounded-full border border-white/20 font-display text-xl",
											children: "3"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "mb-4 text-sm font-bold uppercase tracking-widest",
											children: "Wait & Eat"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-white/60",
											children: "Your food is cooked fresh on the batch day and delivered via courier."
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-16 inline-block rounded-2xl border border-white/10 p-8 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-6 font-display text-2xl font-semibold",
									children: "Pre-Order Cycle"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-12 border-b border-white/10 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-white/60",
												children: "Order Deadline"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-sm font-semibold",
												children: "Weekly • before batch closes"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-12 border-b border-white/10 pb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-white/60",
												children: "Cooking Day"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-sm font-semibold",
												children: "Batch day — made to order"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-12",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-white/60",
												children: "Delivery"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-sm font-semibold text-brand-salmon",
												children: "Same batch day • via courier"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => openOrderForm(),
									className: "mt-8 block w-full rounded-full bg-brand-salmon px-6 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-salmon/90",
									children: "Reserve My Slot"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "testimonials",
				className: "bg-brand-cream px-6 py-24 md:px-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-16 font-display text-4xl font-bold",
						children: "Loved by Our Customers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-8 md:grid-cols-3",
						children: [
							{
								quote: "The mentai sauce is perfectly balanced and creamy. My go-to comfort meal!",
								name: "Rina A."
							},
							{
								quote: "Fresh salmon every single batch. You can really taste the quality.",
								name: "David P."
							},
							{
								quote: "Dimsum mentai is addictive. Always pre-order the moment a batch opens.",
								name: "Sasha M."
							}
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
							className: "rounded-2xl border border-brand-charcoal/10 bg-white p-8 text-left shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
								className: "mb-4 font-display text-lg italic leading-relaxed text-brand-charcoal/80",
								children: [
									"“",
									t.quote,
									"”"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
								className: "text-xs font-semibold uppercase tracking-widest text-brand-salmon",
								children: ["— ", t.name]
							})]
						}, t.name))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bg-white px-6 py-24 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-6 font-display text-3xl font-bold",
						children: "Ready to order?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-10 text-brand-charcoal/60",
						children: "All orders go through WhatsApp. Tap below and we’ll guide you through the pre-order."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => openOrderForm(),
						className: "inline-flex items-center gap-3 rounded-full bg-whatsapp px-12 py-6 text-sm font-bold uppercase tracking-widest text-white shadow-xl transition-transform hover:scale-105",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-5" }), "Start Your Order"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "flex flex-col items-center justify-between gap-8 border-t border-brand-charcoal/10 px-6 py-12 md:flex-row md:px-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-xl font-bold opacity-50",
						children: "ZERVINE KITCHEN"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs uppercase tracking-widest text-brand-charcoal/40",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" • Est. 2020 • Mentai Specialists"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: INSTAGRAM_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "border-b border-transparent text-xs font-bold uppercase tracking-widest hover:border-brand-charcoal",
							children: "Instagram"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => openOrderForm(),
							className: "border-b border-transparent text-xs font-bold uppercase tracking-widest hover:border-brand-charcoal",
							children: "Order"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-6 right-6 z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => openOrderForm(),
					className: "inline-flex items-center gap-3 rounded-full bg-whatsapp px-5 py-4 text-sm font-bold text-white shadow-2xl ring-4 ring-whatsapp/20 transition-transform hover:scale-105 active:scale-95",
					"aria-label": "Order via WhatsApp",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: "Order Now"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderFormDialog, {
				open: orderDialog.open,
				...orderDialog.initialDish === void 0 ? {} : { initialDish: orderDialog.initialDish },
				onOpenChange: (open) => setOrderDialog((current) => ({
					...current,
					open
				}))
			}, orderDialog.key)
		]
	});
}
function WhatsAppIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		className,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.549 4.142 1.595 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
	});
}
//#endregion
export { Index as component };
