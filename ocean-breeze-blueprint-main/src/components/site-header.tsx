import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Car, Heart, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/components/favorites-provider";
import { cn } from "@/lib/utils";


const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Armada", href: "#armada" },
  { label: "Pemesanan", href: "#pesan" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Area Layanan", href: "#area" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count, setActiveTab } = useFavorites();


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Car className="size-5" strokeWidth={1.75} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-bold text-primary">
              Rental Mobil Sahabat
            </span>
            <span className="block text-xs text-muted-foreground">Wonogiri, Jawa Tengah</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                if (item.href === "#armada") setActiveTab("all");
              }}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-secondary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#armada"
            onClick={() => setActiveTab("favorites")}
            aria-label={`Favorit saya (${count} mobil)`}
            className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-border text-primary transition-colors hover:border-secondary hover:text-secondary"
          >
            <Heart className={cn("size-5", count > 0 && "fill-secondary text-secondary")} />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-secondary px-1.5 text-[11px] font-semibold text-secondary-foreground">
                {count}
              </span>
            )}
          </a>
          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="outlineBrand" size="lg" asChild>
              <a href="tel:+6281234567890">
                <Phone className="size-4" strokeWidth={1.75} />
                Hubungi Kami
              </a>
            </Button>
            <Button variant="brand" size="lg" asChild>
              <a href="#pesan">Pesan Sekarang</a>
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-xl border border-border text-primary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setOpen(false);
                  if (item.href === "#armada") setActiveTab("all");
                }}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </a>
            ))}
            <Button variant="brand" size="lg" className="mt-3" asChild>
              <a href="#pesan" onClick={() => setOpen(false)}>
                Pesan Sekarang
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
