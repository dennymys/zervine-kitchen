import { useMemo, useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import {
  buildOrderMessage,
  DISHES,
  FULFILLMENT_OPTIONS,
  formatRupiah,
  waLink,
  type DishSize,
  type OrderItem,
} from "@/lib/menu";

const orderSchema = z.object({
  customer_name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  phone: z
    .string()
    .trim()
    .min(8, "Nomor WhatsApp tidak valid")
    .max(20, "Nomor WhatsApp maksimal 20 karakter")
    .regex(/^[0-9+\s-]+$/, "Nomor WhatsApp hanya boleh angka"),
  address: z
    .string()
    .trim()
    .min(5, "Alamat terlalu singkat")
    .max(500, "Alamat maksimal 500 karakter"),
  fulfillment: z.string().min(1),
  fulfillment_date: z.string().max(20).optional().or(z.literal("")),
  notes: z.string().max(500, "Catatan maksimal 500 karakter"),
});

type Selection = Record<string, { size: DishSize; quantity: number }>;

type FormErrors = Partial<
  Record<
    | "customer_name"
    | "phone"
    | "address"
    | "fulfillment"
    | "fulfillment_date"
    | "notes"
    | "items"
    | "submit",
    string
  >
>;

const inputClass =
  "w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-salmon";
const labelClass =
  "mb-2 block text-[11px] font-bold uppercase tracking-widest text-brand-charcoal/60";

export function OrderFormDialog({
  open,
  onOpenChange,
  initialDish,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialDish?: string;
}) {
  const [selection, setSelection] = useState<Selection>(() =>
    initialDish ? { [initialDish]: { size: "Regular", quantity: 1 } } : {},
  );
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
    fulfillment: "delivery",
    fulfillment_date: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ code: string; message: string } | null>(
    null,
  );

  const items: OrderItem[] = useMemo(
    () =>
      DISHES.filter((dish) => selection[dish.name]).map((dish) => ({
        name: dish.name,
        size: selection[dish.name]!.size,
        quantity: selection[dish.name]!.quantity,
        price: dish.prices[selection[dish.name]!.size],
      })),
    [selection],
  );
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  function toggleDish(name: string) {
    setSelection((prev) => {
      const next = { ...prev };
      if (next[name]) delete next[name];
      else next[name] = { size: "Regular", quantity: 1 };
      return next;
    });
  }

  function updateDish(name: string, patch: Partial<Selection[string]>) {
    setSelection((prev) => ({
      ...prev,
      [name]: { ...prev[name]!, ...patch },
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = orderSchema.safeParse(form);
    const nextErrors: FormErrors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        (nextErrors as Record<string, string>)[String(issue.path[0])] =
          issue.message;
      }
    }
    if (items.length === 0) nextErrors.items = "Pilih minimal satu menu";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !parsed.success) return;

    setSubmitting(true);
    const payload = {
      ...parsed.data,
      fulfillment_date: parsed.data.fulfillment_date || null,
      notes: parsed.data.notes ?? "",
      items,
      total_estimate: total,
    };
    const code = crypto.randomUUID().slice(0, 6).toUpperCase();
    const message = buildOrderMessage(
      {
        ...payload,
        fulfillment_date: parsed.data.fulfillment_date ?? "",
        notes: payload.notes,
      },
      code,
    );
    const whatsappUrl = waLink(message);
    const whatsappWindow = window.open(whatsappUrl, "_blank");
    const { error } = await supabase.from("orders").insert(payload);
    setSubmitting(false);

    if (error) {
      setErrors({
        submit:
          "Pesanan gagal tersimpan. Coba lagi, atau langsung chat kami di WhatsApp.",
      });
      if (!whatsappWindow) window.location.assign(whatsappUrl);
      return;
    }

    setResult({
      code,
      message,
    });
    if (!whatsappWindow) window.location.assign(whatsappUrl);
  }

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) {
      setResult(null);
      setErrors({});
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-brand-charcoal/10 bg-brand-cream sm:max-w-2xl">
        {result ? (
          <div className="text-center">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">
                Pesanan tersimpan!
              </DialogTitle>
              <DialogDescription>
                No. pesanan kamu <strong>#{result.code}</strong>. Tinggal kirim
                pesan ini ke admin — formatnya sudah otomatis terisi.
              </DialogDescription>
            </DialogHeader>
            <pre className="mt-6 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-xl bg-white p-4 text-left text-xs leading-relaxed text-brand-charcoal/80">
              {result.message}
            </pre>
            <a
              href={waLink(result.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-whatsapp px-8 py-4 text-sm font-bold uppercase tracking-widest text-white"
            >
              Kirim ke WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">
                Form Pre-Order
              </DialogTitle>
              <DialogDescription>
                Isi sekali di sini — pesanan langsung tercatat dan pesan
                WhatsApp-nya otomatis dibuat rapi.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              <div>
                <span className={labelClass}>Pilih Menu</span>
                <div className="space-y-3">
                  {DISHES.map((dish) => {
                    const picked = selection[dish.name];
                    return (
                      <div
                        key={dish.name}
                        className="rounded-xl border border-brand-charcoal/10 bg-white p-4"
                      >
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={Boolean(picked)}
                            onChange={() => toggleDish(dish.name)}
                            className="size-4 accent-brand-salmon"
                          />
                          <span className="flex-1 text-sm font-semibold">
                            {dish.name}
                          </span>
                          <span className="text-sm text-brand-charcoal/60">
                            {formatRupiah(dish.prices[picked?.size ?? "Regular"])}
                          </span>
                        </label>
                        {picked && (
                          <div className="mt-3 flex gap-3">
                            <select
                              value={picked.size}
                              onChange={(e) =>
                                updateDish(dish.name, {
                                  size: e.target.value as DishSize,
                                })
                              }
                              className={inputClass}
                              aria-label={`Ukuran ${dish.name}`}
                            >
                              {dish.sizes.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              min={1}
                              max={50}
                              value={picked.quantity}
                              onChange={(e) =>
                                updateDish(dish.name, {
                                  quantity: Math.min(
                                    50,
                                    Math.max(1, Number(e.target.value) || 1),
                                  ),
                                })
                              }
                              className={`${inputClass} w-24`}
                              aria-label={`Jumlah ${dish.name}`}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {errors.items && (
                  <p className="mt-2 text-xs text-brand-salmon">{errors.items}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="customer_name">
                    Nama
                  </label>
                  <input
                    id="customer_name"
                    className={inputClass}
                    maxLength={100}
                    value={form.customer_name}
                    onChange={(e) =>
                      setForm({ ...form, customer_name: e.target.value })
                    }
                  />
                  {errors.customer_name && (
                    <p className="mt-1 text-xs text-brand-salmon">
                      {errors.customer_name}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">
                    No. WhatsApp
                  </label>
                  <input
                    id="phone"
                    className={inputClass}
                    maxLength={20}
                    placeholder="0812xxxxxxx"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-brand-salmon">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="address">
                  Alamat lengkap
                </label>
                <textarea
                  id="address"
                  rows={3}
                  maxLength={500}
                  className={inputClass}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
                {errors.address && (
                  <p className="mt-1 text-xs text-brand-salmon">
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="fulfillment">
                    Metode
                  </label>
                  <select
                    id="fulfillment"
                    className={inputClass}
                    value={form.fulfillment}
                    onChange={(e) =>
                      setForm({ ...form, fulfillment: e.target.value })
                    }
                  >
                    {FULFILLMENT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="fulfillment_date">
                    Tanggal ambil / kirim
                  </label>
                  <input
                    id="fulfillment_date"
                    type="date"
                    className={inputClass}
                    value={form.fulfillment_date}
                    onChange={(e) =>
                      setForm({ ...form, fulfillment_date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="notes">
                  Catatan khusus (opsional)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  maxLength={500}
                  placeholder="Contoh: tanpa pedas, extra sauce, dll."
                  className={inputClass}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
                {errors.notes && (
                  <p className="mt-1 text-xs text-brand-salmon">
                    {errors.notes}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-charcoal/60">
                  Estimasi total
                </span>
                <span className="font-display text-xl font-semibold">
                  {formatRupiah(total)}
                </span>
              </div>

              {errors.submit && (
                <p className="text-sm text-brand-salmon">{errors.submit}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-brand-charcoal px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-salmon disabled:opacity-60"
              >
                {submitting ? "Menyimpan..." : "Lanjut ke WhatsApp"}
              </button>
              <p className="text-center text-[11px] text-brand-charcoal/40">
                Harga di atas masih estimasi. Total akhir dikonfirmasi admin di
                WhatsApp.
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
