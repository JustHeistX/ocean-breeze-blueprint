import { useState } from "react";
import { ChevronDown, ChevronUp, Fuel, Heart, HeartOff, Settings2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/components/favorites-provider";
import { cn } from "@/lib/utils";
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

export type FleetCar = {
  id: string;
  name: string;
  category?: "Family/MPV" | "City Car" | "SUV/Premium";
  image_url: string | null;
  price_per_day: number;
  transmission: string;
  capacity: number;
  fuel_type: string;
  availability_status: boolean;
};

export type CategoryFilter = "Semua" | "Family/MPV" | "City Car" | "SUV/Premium";

const categories: CategoryFilter[] = ["Semua", "Family/MPV", "City Car", "SUV/Premium"];

const rupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

const getCarCategory = (car: FleetCar): CategoryFilter => {
  if (car.category) return car.category;
  const name = car.name.toLowerCase();
  if (name.includes("fortuner") || name.includes("pajero") || name.includes("alphard")) return "SUV/Premium";
  if (name.includes("brio") || name.includes("agya") || name.includes("ayla") || name.includes("yaris")) return "City Car";
  return "Family/MPV";
};

export function FleetSection({
  cars,
  onSelectCarId,
}: {
  cars: FleetCar[];
  onSelectCarId?: (id: string) => void;
}) {
  const { isFavorite, toggleFavorite, count, activeTab, setActiveTab } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("Semua");
  const [showAll, setShowAll] = useState(false);

  // 1. Favorites vs All Filter
  const favoriteFiltered = activeTab === "favorites" ? cars.filter((car) => isFavorite(car.id)) : cars;

  // 2. Category Filter
  const categoryFiltered =
    selectedCategory === "Semua"
      ? favoriteFiltered
      : favoriteFiltered.filter((car) => getCarCategory(car) === selectedCategory);

  const totalFilteredCount = categoryFiltered.length;

  // 3. Paginated / Load More Limit (default 4 cars)
  const visibleCars = showAll ? categoryFiltered : categoryFiltered.slice(0, 4);

  return (
    <section id="armada" className="bg-secondary/5 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Title & Favorit Toggle */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
              Armada Kami
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Pilihan Mobil Siap Jalan
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Semua unit terawat, bersih, dan rutin diservis. Pilih kendaraan yang paling sesuai dengan
              kebutuhan perjalanan Anda di Wonogiri.
            </p>
          </div>

          <div className="inline-flex shrink-0 gap-1 rounded-2xl border border-border bg-card p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              aria-pressed={activeTab === "all"}
              className={cn(
                "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "all"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-secondary",
              )}
            >
              Semua Mobil
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("favorites")}
              aria-pressed={activeTab === "favorites"}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "favorites"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-secondary",
              )}
            >
              <Heart className={cn("size-4 shrink-0", count > 0 && "fill-current")} />
              Favorit Saya ({count})
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-border/60 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setShowAll(false);
              }}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                selectedCategory === cat
                  ? "bg-secondary text-secondary-foreground shadow-sm"
                  : "bg-card text-muted-foreground border border-border hover:bg-accent hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fleet Grid / Empty State */}
        {visibleCars.length === 0 ? (
          <div className="mt-12 grid place-items-center rounded-[20px] border border-dashed border-border bg-card px-6 py-16 text-center">
            <HeartOff className="size-10 text-muted-foreground/60" strokeWidth={1.5} />
            <p className="mt-4 text-lg font-semibold text-primary">
              {activeTab === "favorites"
                ? "Belum ada mobil favorit"
                : "Tidak ada mobil dalam kategori ini"}
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {activeTab === "favorites"
                ? "Ketuk ikon hati pada mobil yang Anda sukai untuk menyimpannya di daftar favorit."
                : "Silakan pilih kategori lain atau lihat seluruh armada kami."}
            </p>
            <Button
              variant="outlineBrand"
              className="mt-6"
              onClick={() => {
                setActiveTab("all");
                setSelectedCategory("Semua");
              }}
            >
              Lihat Semua Mobil
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleCars.map((car) => {
                const image = (car.image_url && imageMap[car.image_url]) ?? avanza;
                const favorite = isFavorite(car.id);
                const categoryLabel = getCarCategory(car);
                return (
                  <article
                    key={car.id}
                    className="group overflow-hidden rounded-[20px] border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={image}
                        alt={`Sewa ${car.name} di Wonogiri`}
                        loading="lazy"
                        className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />

                      {/* Category Badge */}
                      <span className="absolute left-3 top-3 rounded-full bg-card/95 backdrop-blur px-3 py-1 text-[11px] font-semibold text-primary shadow-xs">
                        {categoryLabel}
                      </span>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(car.id)}
                        aria-pressed={favorite}
                        aria-label={
                          favorite
                            ? `Hapus ${car.name} dari favorit`
                            : `Tambahkan ${car.name} ke favorit`
                        }
                        className="absolute right-3 top-3 grid size-10 shrink-0 place-items-center rounded-full bg-card/90 text-primary shadow-sm backdrop-blur transition-transform hover:scale-110 active:scale-95"
                      >
                        <Heart
                          className={cn(
                            "size-5 transition-colors",
                            favorite && "fill-secondary text-secondary",
                          )}
                        />
                      </button>

                      {!car.availability_status && (
                        <span className="absolute left-3 bottom-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                          Tidak tersedia
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="truncate text-lg font-semibold text-primary">{car.name}</h3>

                      <ul className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <li className="flex flex-col items-center gap-1 rounded-2xl bg-accent/60 px-2 py-3">
                          <Users className="size-4 shrink-0 text-secondary" />
                          {car.capacity} Kursi
                        </li>
                        <li className="flex flex-col items-center gap-1 rounded-2xl bg-accent/60 px-2 py-3 capitalize truncate">
                          <Settings2 className="size-4 shrink-0 text-secondary" />
                          {car.transmission}
                        </li>
                        <li className="flex flex-col items-center gap-1 rounded-2xl bg-accent/60 px-2 py-3">
                          <Fuel className="size-4 shrink-0 text-secondary" />
                          {car.fuel_type}
                        </li>
                      </ul>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="min-w-0">
                          <span className="block truncate text-lg font-bold text-primary">
                            {rupiah(Number(car.price_per_day))}
                          </span>
                          <span className="text-xs text-muted-foreground">per hari</span>
                        </p>
                        <Button
                          variant="brand"
                          disabled={!car.availability_status}
                          asChild={car.availability_status}
                          className="w-full sm:w-auto"
                        >
                          {car.availability_status ? (
                            <a href="#pesan" onClick={() => onSelectCarId?.(car.id)}>
                              Pesan Sekarang
                            </a>
                          ) : (
                            <span>Pesan Sekarang</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Load More / Show Less Button */}
            {!showAll && totalFilteredCount > 4 ? (
              <div className="mt-10 text-center">
                <Button
                  variant="outlineBrand"
                  size="lg"
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold shadow-sm transition-all hover:scale-[1.02]"
                >
                  Lihat Semua Armada ({totalFilteredCount - 4} mobil lagi)
                  <ChevronDown className="size-4" />
                </Button>
              </div>
            ) : showAll && totalFilteredCount > 4 ? (
              <div className="mt-10 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAll(false)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary"
                >
                  Tampilkan Lebih Sedikit
                  <ChevronUp className="size-3.5" />
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
