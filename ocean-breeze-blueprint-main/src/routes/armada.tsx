import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Car as CarIcon,
  CheckCircle2,
  ChevronRight,
  Fuel,
  Heart,
  HeartOff,
  MessageCircle,
  Phone,
  Search,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingSection } from "@/components/booking-section";
import { FavoritesProvider, useFavorites } from "@/components/favorites-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getCars, type Car } from "@/lib/cars.functions";

import avanza from "@/assets/car-avanza.jpg";
import innova from "@/assets/car-innova.jpg";
import alphard from "@/assets/hero-car.jpg";
import hatchback from "@/assets/car-hatchback.jpg";

const imageMap: Record<string, string> = {
  "car-avanza": avanza,
  "car-innova": innova,
  "hero-car": alphard,
  "car-hatchback": hatchback,
};

export const Route = createFileRoute("/armada")({
  loader: async () => ({ cars: await getCars() }),
  head: () => ({
    meta: [
      { title: "Katalog Armada Mobil — Rental Mobil Sahabat Wonogiri" },
      {
        name: "description",
        content:
          "Daftar lengkap 10 pilihan sewa mobil murah & terawat di Wonogiri: Avanza, Innova Reborn, Zenix, Brio, Fortuner, Pajero. Bisa lepas kunci atau dengan driver.",
      },
      { property: "og:title", content: "Katalog Armada Mobil — Rental Mobil Sahabat Wonogiri" },
      {
        property: "og:description",
        content:
          "Pilihan 10 armada MPV, City Car, & SUV/Premium terawat untuk sewa mobil di Wonogiri. Harga transparan & proses cepat.",
      },
    ],
  }),
  component: ArmadaPage,
});

type CategoryFilter = "Semua" | "Family/MPV" | "City Car" | "SUV/Premium";
const categories: CategoryFilter[] = ["Semua", "Family/MPV", "City Car", "SUV/Premium"];

const rupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

const getCarCategory = (car: Car): CategoryFilter => {
  if (car.category) return car.category;
  const name = car.name.toLowerCase();
  if (name.includes("fortuner") || name.includes("pajero") || name.includes("alphard")) return "SUV/Premium";
  if (name.includes("brio") || name.includes("agya") || name.includes("ayla") || name.includes("yaris")) return "City Car";
  return "Family/MPV";
};

function ArmadaPage() {
  const { cars } = Route.useLoaderData();
  const [selectedCarId, setSelectedCarId] = useState<string | undefined>(cars[0]?.id);

  return (
    <FavoritesProvider>
      <ArmadaPageContent cars={cars} selectedCarId={selectedCarId} onSelectCarId={setSelectedCarId} />
    </FavoritesProvider>
  );
}

function ArmadaPageContent({
  cars,
  selectedCarId,
  onSelectCarId,
}: {
  cars: Car[];
  selectedCarId: string | undefined;
  onSelectCarId: (id: string) => void;
}) {
  const { isFavorite, toggleFavorite, count, activeTab, setActiveTab } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Favorite vs All Filter
  const favoriteFiltered = activeTab === "favorites" ? cars.filter((car) => isFavorite(car.id)) : cars;

  // 2. Category Filter
  const categoryFiltered =
    selectedCategory === "Semua"
      ? favoriteFiltered
      : favoriteFiltered.filter((car) => getCarCategory(car) === selectedCategory);

  // 3. Search Filter
  const visibleCars = categoryFiltered.filter(
    (car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCarCategory(car).toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.transmission.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* HEADER BANNER */}
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/10 via-primary/5 to-background py-16 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.623_0.214_259.8/0.08),transparent_70%)] pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                Beranda
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-foreground font-semibold">Katalog Armada</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                  <CarIcon className="size-3.5" />
                  Katalog Lengkap 10 Unit Armada Wonogiri
                </span>

                <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
                  Pilihan Mobil Sewa Prima, Bersih, &amp; Siap Jalan
                </h1>

                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Semua kendaraan menjalani pemeriksaan mekanis 15 titik, perawatan bengkel resmi, serta pembersihan interior higienis sebelum serah terima. Tersedia pilihan sewa lepas kunci &amp; paket All-In dengan driver profesional.
                </p>
              </div>

              {/* SEARCH INPUT */}
              <div className="relative w-full lg:w-80 shrink-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari armada (Avanza, Brio, Zenix)..."
                  className="w-full rounded-2xl border border-border bg-card pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY & WISHLIST FILTER CONTROLS */}
        <section className="py-12 bg-background border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (activeTab === "favorites") setActiveTab("all");
                    }}
                    className={cn(
                      "rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200",
                      selectedCategory === cat && activeTab === "all"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-card text-muted-foreground border border-border hover:bg-accent hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Favorites Wishlist Toggle Button */}
              <div className="inline-flex shrink-0 items-center gap-1 rounded-2xl border border-border bg-card p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("all");
                  }}
                  className={cn(
                    "rounded-xl px-4 py-2 text-xs font-semibold transition-colors",
                    activeTab === "all"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Semua Unit ({cars.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("favorites");
                    setSelectedCategory("Semua");
                  }}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors",
                    activeTab === "favorites"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Heart className={cn("size-3.5 shrink-0", count > 0 && "fill-secondary text-secondary")} />
                  ❤️ Favorit Saya ({count})
                </button>
              </div>
            </div>

            {/* FULL 10-CAR GRID / EMPTY STATE */}
            {visibleCars.length === 0 ? (
              <div className="mt-12 grid place-items-center rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center shadow-xs">
                <HeartOff className="size-12 text-muted-foreground/60 mb-2" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-foreground">
                  {activeTab === "favorites" ? "Belum ada mobil favorit Anda." : "Mobil Tidak Ditemukan"}
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  {activeTab === "favorites"
                    ? "Ketuk ikon hati (❤️) pada kartu mobil yang Anda sukai untuk menyimpannya di daftar favorit Anda."
                    : "Tidak ada unit mobil yang sesuai dengan pencarian atau kategori ini."}
                </p>
                <Button
                  variant="outlineBrand"
                  size="lg"
                  className="mt-6 rounded-xl"
                  onClick={() => {
                    setActiveTab("all");
                    setSelectedCategory("Semua");
                    setSearchTerm("");
                  }}
                >
                  Tampilkan Semua Armada
                </Button>
              </div>
            ) : (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleCars.map((car) => {
                  const image = (car.image_url && imageMap[car.image_url]) ?? avanza;
                  const favorite = isFavorite(car.id);
                  const categoryLabel = getCarCategory(car);
                  const waText = encodeURIComponent(
                    `Halo Rental Mobil Sahabat, saya ingin memesan unit armada *${car.name}* (${categoryLabel}, ${car.transmission}) dengan tarif ${rupiah(Number(car.price_per_day))}/hari.`
                  );
                  const waLink = `https://wa.me/6281234567890?text=${waText}`;

                  return (
                    <Card
                      key={car.id}
                      className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Container */}
                        <div className="relative overflow-hidden bg-muted aspect-[16/10]">
                          <img
                            src={image}
                            alt={`Sewa ${car.name} di Wonogiri`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Category Tag */}
                          <span className="absolute left-3 top-3 rounded-full bg-card/95 backdrop-blur px-3 py-1 text-[11px] font-semibold text-primary shadow-xs">
                            {categoryLabel}
                          </span>

                          {/* Heart Favorite Button */}
                          <button
                            type="button"
                            onClick={() => toggleFavorite(car.id)}
                            aria-label={favorite ? `Hapus ${car.name} dari favorit` : `Tambahkan ${car.name} ke favorit`}
                            className="absolute right-3 top-3 grid size-10 shrink-0 place-items-center rounded-full bg-card/90 text-primary shadow-sm backdrop-blur transition-transform hover:scale-110 active:scale-95"
                          >
                            <Heart className={cn("size-5 transition-colors", favorite && "fill-secondary text-secondary")} />
                          </button>
                        </div>

                        {/* Card Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="truncate font-display text-lg font-bold text-card-foreground">
                              {car.name}
                            </h3>
                            <span className="shrink-0 text-[11px] font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                              Ready
                            </span>
                          </div>

                          {/* Spec Grid */}
                          <ul className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                            <li className="flex flex-col items-center gap-1 rounded-2xl bg-accent/60 px-2 py-3">
                              <Users className="size-4 shrink-0 text-secondary" />
                              <span className="font-medium text-foreground">{car.capacity} Kursi</span>
                            </li>
                            <li className="flex flex-col items-center gap-1 rounded-2xl bg-accent/60 px-2 py-3 truncate">
                              <Settings2 className="size-4 shrink-0 text-secondary" />
                              <span className="font-medium text-foreground capitalize truncate">{car.transmission}</span>
                            </li>
                            <li className="flex flex-col items-center gap-1 rounded-2xl bg-accent/60 px-2 py-3">
                              <Fuel className="size-4 shrink-0 text-secondary" />
                              <span className="font-medium text-foreground">{car.fuel_type}</span>
                            </li>
                          </ul>

                          {/* Features Highlight */}
                          <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center gap-1 font-medium text-foreground">
                              <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                              15 Poin Inspeksi
                            </span>
                            <span className="flex items-center gap-1 font-medium text-foreground">
                              <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                              AC Dingin &amp; Sanitasi
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: Price & Booking Action */}
                      <div className="px-6 pb-6 pt-2">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border/60 pt-4">
                          <div>
                            <span className="block text-xs text-muted-foreground">Tarif Sewa</span>
                            <span className="block truncate font-display text-lg font-bold text-primary">
                              {rupiah(Number(car.price_per_day))}
                            </span>
                            <span className="text-[10px] text-muted-foreground">per 24 jam</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="brand"
                              className="rounded-xl px-4 font-semibold shadow-sm"
                              asChild
                            >
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => onSelectCarId(car.id)}
                              >
                                <MessageCircle className="size-4 mr-1.5" />
                                Pesan Sekarang
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* EMBEDDED BOOKING SECTION FORM */}
        <section id="pesan-form" className="py-16 lg:py-24 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold tracking-wider text-primary uppercase">
                Formulir Pemesanan Online
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                Hitung Estimasi &amp; Booking Unit Pilihan Anda
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Pilih tanggal sewa &amp; jenis paket layanan untuk konfirmasi instan.
              </p>
            </div>
            <BookingSection cars={cars} selectedCarId={selectedCarId} onSelectCarId={onSelectCarId} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
