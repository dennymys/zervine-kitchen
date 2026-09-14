import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroMentai from "@/assets/hero-mentai.jpg";
import salmonMentai from "@/assets/menu-salmon-mentai.jpg";
import dimsumMentai from "@/assets/menu-dimsum-mentai.jpg";
import beefMentai from "@/assets/menu-beef-mentai.jpg";
import shiratakiMentai from "@/assets/menu-mentai-shirataki.jpg";
import { OrderFormDialog } from "@/components/OrderFormDialog";

const INSTAGRAM_URL = "https://instagram.com/zervine.kitchen";

type Dish = {
  name: string;
  description: string;
  image: string;
  priceLabel: string;
  sizes: string[];
  tag?: string;
};

const DISHES: Dish[] = [
  {
    name: "Salmon Mentai Rice",
    description:
      "Premium sashimi-grade salmon over seasoned rice, topped with our signature torched mentai sauce.",
    image: salmonMentai,
    priceLabel: "Mulai Rp 22.500",
    sizes: ["Small", "Regular"],
    tag: "Premium",
  },
  {
    name: "Beef Mentai Rice",
    description:
      "Thinly sliced seared beef layered over warm rice with a rich, smoky mentai finish.",
    image: beefMentai,
    priceLabel: "Mulai Rp 25.000",
    sizes: ["Small", "Regular"],
  },
  {
    name: "Dimsum Mentai",
    description:
      "Steamed juicy dimsum generously glazed in creamy, spicy mentai sauce. Perfect for sharing.",
    image: dimsumMentai,
    priceLabel: "Mulai Rp 17.500",
    sizes: ["Small", "Regular"],
  },
  {
    name: "Mentai Shirataki",
    description:
      "Low-carb shirataki noodles swapped in for rice, drenched in our signature torched creamy mentai sauce — the lighter way to enjoy mentai.",
    image: shiratakiMentai,
    priceLabel: "Mulai Rp 20.000",
    sizes: ["Small", "Regular"],
    tag: "New",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zervine Kitchen — Signature Mentai Rice (Pre-Order)" },
      {
        name: "description",
        content:
          "Zervine Kitchen — handcrafted mentai since 2020. Salmon, beef & dimsum mentai plus the new Mentai Shirataki, made fresh every pre-order batch. Order easily via WhatsApp.",
      },
      { property: "og:title", content: "Zervine Kitchen — Signature Mentai (Pre-Order)" },
      {
        property: "og:description",
        content:
          "Handcrafted mentai made fresh on every pre-order batch. Salmon, beef, dimsum & new shirataki mentai. Order via WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [orderDialog, setOrderDialog] = useState<{
    key: number;
    open: boolean;
    initialDish: string | undefined;
  }>({ key: 0, open: false, initialDish: undefined });

  function openOrderForm(initialDish?: string) {
    setOrderDialog((current) => ({
      key: current.key + 1,
      open: true,
      initialDish,
    }));
  }

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-charcoal">
      {/* Announcement Bar */}
      <div className="bg-brand-salmon px-4 py-2 text-center text-xs font-semibold uppercase tracking-widest text-white">
        Pre-Order Only • Made fresh per batch • Order via WhatsApp
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-8 md:px-12">
        <div className="font-display text-2xl font-bold uppercase tracking-tight">
          Zervine Kitchen
        </div>
        <div className="hidden gap-8 text-sm font-medium uppercase tracking-tighter md:flex">
          <a href="#menu" className="transition-colors hover:text-brand-salmon">
            Menu
          </a>
          <a
            href="#how-to-order"
            className="transition-colors hover:text-brand-salmon"
          >
            How to Order
          </a>
          <a
            href="#testimonials"
            className="transition-colors hover:text-brand-salmon"
          >
            Testimonials
          </a>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-brand-charcoal pb-1 text-sm font-semibold transition-all hover:border-brand-salmon hover:text-brand-salmon"
        >
          Follow Instagram
        </a>
      </nav>

      {/* Hero Section */}
      <section className="grid grid-cols-1 items-center gap-12 px-6 py-12 md:px-12 lg:grid-cols-2">
        <div>
          <span className="font-display text-xl italic text-brand-salmon">
            Est. 2020
          </span>
          <h1 className="mb-8 mt-4 font-display text-6xl font-bold leading-[0.9] md:text-8xl">
            Signature <br />
            Mentai, <br />
            <span className="italic text-brand-gold">Crafted Fresh.</span>
          </h1>
          <p className="mb-10 max-w-md text-lg leading-relaxed text-brand-charcoal/80">
            Handcrafted home-cooked meals featuring our signature creamy mentai
            sauce — from premium salmon and beef to steamed dimsum, now also on
            low-carb shirataki noodles. Made fresh, only by pre-order,
            delivered straight to your door.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => openOrderForm()}
              className="inline-flex items-center justify-center rounded-full bg-brand-charcoal px-8 py-5 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-salmon"
            >
              Start Your Order
            </button>
            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full border border-brand-charcoal px-8 py-5 text-center text-sm font-bold uppercase tracking-widest transition-colors hover:bg-white"
            >
              View Menu
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroMentai}
            alt="Signature mentai rice with blow-torched creamy orange sauce in a foil tray"
            width={1200}
            height={1200}
            className="aspect-square w-full rounded-2xl bg-stone-200 object-cover"
          />
          <div className="absolute -bottom-6 -left-6 hidden max-w-[200px] rounded-lg bg-white p-6 shadow-xl md:block">
            <p className="mb-1 text-xs font-bold uppercase italic tracking-tighter text-brand-salmon">
              Premium Salmon Available
            </p>
            <p className="font-display text-sm leading-tight">
              Fresh, sashimi-grade salmon for our signature Salmon Mentai.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="bg-white px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="font-display text-4xl font-bold">Our Signatures</h2>
              <p className="mt-2 text-brand-charcoal/60">
                Available for every pre-order batch
              </p>
            </div>
            <div className="mb-4 hidden h-px flex-1 bg-brand-charcoal/10 md:mx-12 md:block" />
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {DISHES.map((dish) => (
              <div key={dish.name} className="group flex h-full cursor-pointer flex-col">
                <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-lg bg-stone-100">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {dish.tag && (
                    <span
                      className={`absolute left-3 top-3 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        dish.tag === "Premium"
                          ? "border-amber-300 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-stone-900 shadow-sm"
                          : dish.tag === "New"
                            ? "border-red-200 bg-red-50 text-red-600"
                            : "border-brand-charcoal/10 bg-brand-charcoal text-white"
                      }`}
                    >
                      {dish.tag}
                    </span>
                  )}
                </div>
                <h3 className="mb-2 font-display text-xl font-bold">
                  {dish.name}
                </h3>
                <p className="mb-4 text-sm text-brand-charcoal/70">
                  {dish.description}
                </p>
                <div className="mt-auto grid grid-cols-[1fr_auto] items-end gap-3 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {dish.sizes.map((size) => (
                      <span
                        key={size}
                        className="rounded-full bg-brand-cream px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-charcoal/60"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                  <span className="whitespace-nowrap font-display text-lg font-semibold leading-none text-brand-charcoal">
                    {dish.priceLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => openOrderForm(dish.name)}
                  className="mt-6 block w-full rounded-full border border-brand-charcoal py-3 text-center text-xs font-bold uppercase tracking-widest transition-colors hover:bg-brand-charcoal hover:text-white"
                >
                  Order this
                </button>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-brand-charcoal/40">
            Prices shown are illustrative — confirm the latest prices on
            WhatsApp. Available sizes: Small & Regular.
          </p>
        </div>
      </section>

      {/* Pre-order Info Section */}
      <section
        id="how-to-order"
        className="bg-brand-charcoal px-6 py-24 text-white md:px-12"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-16 font-display text-4xl font-bold md:text-5xl">
            How to Secure Your Box
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="mb-6 flex size-12 items-center justify-center rounded-full border border-white/20 font-display text-xl">
                1
              </div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest">
                Check Batch
              </h4>
              <p className="text-sm text-white/60">
                Follow our IG or check this site for the next open pre-order
                batch date.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-6 flex size-12 items-center justify-center rounded-full border border-white/20 font-display text-xl">
                2
              </div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest">
                WhatsApp Us
              </h4>
              <p className="text-sm text-white/60">
                Send us your details: Name, Address, Menu Variant, Size &
                Quantity via WhatsApp.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-6 flex size-12 items-center justify-center rounded-full border border-white/20 font-display text-xl">
                3
              </div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-widest">
                Wait & Eat
              </h4>
              <p className="text-sm text-white/60">
                Your food is cooked fresh on the batch day and delivered via
                courier.
              </p>
            </div>
          </div>

          {/* Batch schedule card */}
          <div className="mt-16 inline-block rounded-2xl border border-white/10 p-8 text-left">
            <h3 className="mb-6 font-display text-2xl font-semibold">
              Pre-Order Cycle
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-12 border-b border-white/10 pb-3">
                <span className="text-sm text-white/60">Order Deadline</span>
                <span className="font-display text-sm font-semibold">
                  Weekly • before batch closes
                </span>
              </div>
              <div className="flex items-center justify-between gap-12 border-b border-white/10 pb-3">
                <span className="text-sm text-white/60">Cooking Day</span>
                <span className="font-display text-sm font-semibold">
                  Batch day — made to order
                </span>
              </div>
              <div className="flex items-center justify-between gap-12">
                <span className="text-sm text-white/60">Delivery</span>
                <span className="font-display text-sm font-semibold text-brand-salmon">
                  Same batch day • via courier
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openOrderForm()}
              className="mt-8 block w-full rounded-full bg-brand-salmon px-6 py-4 text-center text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-brand-salmon/90"
            >
              Reserve My Slot
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-brand-cream px-6 py-24 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-16 font-display text-4xl font-bold">
            Loved by Our Customers
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "The mentai sauce is perfectly balanced and creamy. My go-to comfort meal!",
                name: "Rina A.",
              },
              {
                quote:
                  "Fresh salmon every single batch. You can really taste the quality.",
                name: "David P.",
              },
              {
                quote:
                  "Dimsum mentai is addictive. Always pre-order the moment a batch opens.",
                name: "Sasha M.",
              },
            ].map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-brand-charcoal/10 bg-white p-8 text-left shadow-sm"
              >
                <blockquote className="mb-4 font-display text-lg italic leading-relaxed text-brand-charcoal/80">
                  “{t.quote}”
                </blockquote>
                <figcaption className="text-xs font-semibold uppercase tracking-widest text-brand-salmon">
                  — {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Order Center */}
      <section className="bg-white px-6 py-24 text-center">
        <h3 className="mb-6 font-display text-3xl font-bold">Ready to order?</h3>
        <p className="mb-10 text-brand-charcoal/60">
          All orders go through WhatsApp. Tap below and we’ll guide you through
          the pre-order.
        </p>
        <button
          type="button"
          onClick={() => openOrderForm()}
          className="inline-flex items-center gap-3 rounded-full bg-whatsapp px-12 py-6 text-sm font-bold uppercase tracking-widest text-white shadow-xl transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="size-5" />
          Start Your Order
        </button>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-between gap-8 border-t border-brand-charcoal/10 px-6 py-12 md:flex-row md:px-12">
        <div className="font-display text-xl font-bold opacity-50">
          ZERVINE KITCHEN
        </div>
        <div className="text-xs uppercase tracking-widest text-brand-charcoal/40">
          © {new Date().getFullYear()} • Est. 2020 • Mentai Specialists
        </div>
        <div className="flex gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-transparent text-xs font-bold uppercase tracking-widest hover:border-brand-charcoal"
          >
            Instagram
          </a>
          <button
            type="button"
            onClick={() => openOrderForm()}
            className="border-b border-transparent text-xs font-bold uppercase tracking-widest hover:border-brand-charcoal"
          >
            Order
          </button>
        </div>
      </footer>

      {/* Sticky WhatsApp CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => openOrderForm()}
          className="inline-flex items-center gap-3 rounded-full bg-whatsapp px-5 py-4 text-sm font-bold text-white shadow-2xl ring-4 ring-whatsapp/20 transition-transform hover:scale-105 active:scale-95"
          aria-label="Order via WhatsApp"
        >
          <WhatsAppIcon className="size-6" />
          <span className="hidden sm:inline">Order Now</span>
        </button>
      </div>

      <OrderFormDialog
        key={orderDialog.key}
        open={orderDialog.open}
        {...(orderDialog.initialDish === undefined
          ? {}
          : { initialDish: orderDialog.initialDish })}
        onOpenChange={(open) =>
          setOrderDialog((current) => ({ ...current, open }))
        }
      />
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.549 4.142 1.595 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
