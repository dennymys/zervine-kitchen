import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-Bxc8_G9k.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DIoBKLK_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		...opts,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
var inputClass = "w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-salmon";
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [info, setInfo] = (0, import_react.useState)("");
	async function handleSubmit(event) {
		event.preventDefault();
		setError("");
		setInfo("");
		setBusy(true);
		if (mode === "signup") {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: { emailRedirectTo: window.location.origin }
			});
			setBusy(false);
			if (error) return setError(error.message);
			if (!data.session) {
				setInfo("Cek email kamu untuk konfirmasi, lalu masuk kembali.");
				return;
			}
			navigate({ to: "/admin" });
			return;
		}
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setBusy(false);
		if (error) return setError(error.message);
		navigate({ to: "/admin" });
	}
	async function handleGoogle() {
		setError("");
		const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
		if (result.error) {
			setError("Gagal masuk dengan Google. Coba lagi.");
			return;
		}
		if (result.redirected) return;
		navigate({ to: "/admin" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-brand-cream px-6 py-16 font-sans text-brand-charcoal",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-brand-charcoal/10 bg-white p-8 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold",
					children: "Admin Zervine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-brand-charcoal/60",
					children: "Masuk untuk melihat rekap pesanan pre-order."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: handleGoogle,
					className: "mt-8 w-full rounded-full border border-brand-charcoal/20 px-6 py-3 text-sm font-semibold transition-colors hover:bg-brand-cream",
					children: "Lanjut dengan Google"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-6 flex items-center gap-4 text-[11px] uppercase tracking-widest text-brand-charcoal/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-brand-charcoal/10" }),
						" atau",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-brand-charcoal/10" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							required: true,
							placeholder: "Email",
							className: inputClass,
							value: email,
							onChange: (e) => setEmail(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							required: true,
							minLength: 6,
							placeholder: "Password",
							className: inputClass,
							value: password,
							onChange: (e) => setPassword(e.target.value)
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-brand-salmon",
							children: error
						}),
						info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-brand-charcoal/70",
							children: info
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy,
							className: "w-full rounded-full bg-brand-charcoal px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-salmon disabled:opacity-60",
							children: busy ? "Memproses..." : mode === "signin" ? "Masuk" : "Daftar"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
					className: "mt-6 w-full text-xs font-semibold uppercase tracking-widest text-brand-charcoal/50 hover:text-brand-salmon",
					children: mode === "signin" ? "Belum punya akun admin? Daftar" : "Sudah punya akun? Masuk"
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
