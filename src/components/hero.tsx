import { Clock, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/hero-carousel";

const highlights = [
  { icon: ShieldCheck, label: "Armada terawat & bersih" },
  { icon: Clock, label: "Proses cepat 24 jam" },
  { icon: Star, label: "Harga transparan" },
];

export function Hero() {
  return (
    <section id="beranda" className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-accent/70 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
            Rental Mobil Wonogiri • Lepas Kunci & Dengan Sopir
          </span>
          <h1 className="mt-6 text-3xl leading-tight text-primary sm:text-4xl lg:text-[3.1rem]">
            Rental Mobil Terpercaya di Wonogiri
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Nikmati perjalanan yang nyaman bersama Rental Mobil Sahabat. Tersedia berbagai pilihan
            kendaraan dengan harga transparan, proses cepat, dan layanan profesional untuk wisata,
            keluarga, maupun kebutuhan bisnis.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button variant="brand" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#pesan">Pesan Sekarang</a>
            </Button>
            <Button variant="outlineBrand" size="xl" className="w-full sm:w-auto" asChild>
              <a href="#armada">Lihat Armada</a>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-foreground/80">
                <Icon className="size-4 text-secondary" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <HeroCarousel />
      </div>
    </section>
  );
}
