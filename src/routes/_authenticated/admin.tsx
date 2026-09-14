import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  buildOrderMessage,
  formatRupiah,
  fulfillmentLabel,
  waLink,
  type OrderItem,
} from "@/lib/menu";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Rekap Pesanan — Zervine Kitchen" },
      {
        name: "description",
        content:
          "Rekap semua pesanan pre-order Zervine Kitchen: nama pembeli, alamat, menu, jumlah, dan status pesanan.",
      },
      { property: "og:title", content: "Rekap Pesanan — Zervine Kitchen" },
      {
        property: "og:description",
        content: "Dashboard admin untuk memantau pesanan pre-order mentai.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  address: string;
  fulfillment: string;
  fulfillment_date: string | null;
  notes: string | null;
  items: OrderItem[];
  total_estimate: number;
  status: string;
};

const STATUSES = ["new", "confirmed", "paid", "delivered", "cancelled"] as const;

const STATUS_LABEL: Record<string, string> = {
  new: "Baru",
  confirmed: "Dikonfirmasi",
  paid: "Sudah bayar",
  delivered: "Selesai",
  cancelled: "Dibatalkan",
};

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [claimError, setClaimError] = useState("");

  // The first signed-in user claims admin access while no admin exists yet.
  useEffect(() => {
    void supabase.rpc("claim_admin").then(({ error }) => {
      if (error) setClaimError(error.message);
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
    });
  }, [queryClient]);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Order[];
    },
  });

  async function updateStatus(id: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", id);
    void queryClient.invalidateQueries({ queryKey: ["orders"] });
  }

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const totalRevenue = (orders ?? [])
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total_estimate, 0);

  return (
    <main className="min-h-screen bg-brand-cream px-6 py-12 font-sans text-brand-charcoal md:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl font-bold">Rekap Pesanan</h1>
            <p className="mt-2 text-sm text-brand-charcoal/60">
              Semua pesanan dari form website masuk ke sini.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal/50">
                Total pesanan
              </p>
              <p className="font-display text-2xl font-semibold">
                {orders?.length ?? 0}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold uppercase tracking-widest text-brand-charcoal/50">
                Estimasi omzet
              </p>
              <p className="font-display text-2xl font-semibold">
                {formatRupiah(totalRevenue)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-brand-charcoal/20 px-5 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white"
            >
              Keluar
            </button>
          </div>
        </header>

        {claimError && (
          <p className="mb-6 rounded-xl bg-white p-4 text-sm text-brand-salmon">
            {claimError}
          </p>
        )}

        {isLoading ? (
          <p className="text-sm text-brand-charcoal/60">Memuat pesanan...</p>
        ) : (orders?.length ?? 0) === 0 ? (
          <div className="rounded-2xl border border-brand-charcoal/10 bg-white p-10 text-center">
            <p className="font-display text-xl">Belum ada pesanan masuk.</p>
            <p className="mt-2 text-sm text-brand-charcoal/60">
              Pesanan dari form website akan muncul di halaman ini.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders!.map((order) => (
              <article
                key={order.id}
                className="rounded-2xl border border-brand-charcoal/10 bg-white p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-brand-salmon">
                      #{order.id.slice(0, 6).toUpperCase()} •{" "}
                      {new Date(order.created_at).toLocaleString("id-ID")}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-bold">
                      {order.customer_name}
                    </h2>
                    <p className="text-sm text-brand-charcoal/70">
                      {order.phone} • {fulfillmentLabel(order.fulfillment)}
                      {order.fulfillment_date
                        ? ` • ${order.fulfillment_date}`
                        : ""}
                    </p>
                    <p className="mt-2 max-w-lg text-sm text-brand-charcoal/60">
                      {order.address}
                    </p>
                    {order.notes && (
                      <p className="mt-2 text-sm italic text-brand-charcoal/60">
                        Catatan: {order.notes}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-semibold">
                      {formatRupiah(order.total_estimate)}
                    </p>
                    <select
                      value={order.status}
                      onChange={(e) => void updateStatus(order.id, e.target.value)}
                      className="mt-3 rounded-xl border border-brand-charcoal/15 bg-white px-3 py-2 text-xs font-semibold"
                      aria-label={`Status pesanan ${order.customer_name}`}
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABEL[status]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <ul className="mt-4 border-t border-brand-charcoal/10 pt-4 text-sm">
                  {order.items.map((item, index) => (
                    <li
                      key={`${order.id}-${index}`}
                      className="flex justify-between py-1"
                    >
                      <span>
                        {item.name} ({item.size}) x{item.quantity}
                      </span>
                      <span className="text-brand-charcoal/60">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(
                    buildOrderMessage(
                      {
                        customer_name: order.customer_name,
                        phone: order.phone,
                        address: order.address,
                        fulfillment: order.fulfillment,
                        fulfillment_date: order.fulfillment_date ?? "",
                        notes: order.notes ?? "",
                        items: order.items,
                        total_estimate: order.total_estimate,
                      },
                      order.id.slice(0, 6).toUpperCase(),
                    ),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-whatsapp hover:underline"
                >
                  Salin / kirim ulang via WhatsApp
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
