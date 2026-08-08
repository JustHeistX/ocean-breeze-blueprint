import { Car, Mail, MapPin, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Armada", href: "/armada" },
  { label: "Pemesanan", href: "/#pesan" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Area Layanan", href: "/area-layanan" },
  { label: "FAQ", href: "/faq" },
];

export function SiteFooter() {
  return (
    <footer id="kontak" className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/12 ring-1 ring-primary-foreground/20">
              <Car className="size-5" strokeWidth={1.75} />
            </span>
            <span className="font-display text-base font-bold">Rental Mobil Sahabat</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/75">
            Layanan rental mobil profesional di Wonogiri. Harga transparan, proses cepat, armada
            terawat.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Kontak</h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li>
              <a
                href="https://wa.me/6281234567890"
                className="flex items-center gap-2.5 transition-colors hover:text-primary-foreground"
              >
                <MessageCircle className="size-4" strokeWidth={1.75} />
                WhatsApp: 0812-3456-7890
              </a>
            </li>
            <li>
              <a
                href="mailto:halo@rentalmobilsahabat.id"
                className="flex items-center gap-2.5 transition-colors hover:text-primary-foreground"
              >
                <Mail className="size-4" strokeWidth={1.75} />
                halo@rentalmobilsahabat.id
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4" strokeWidth={1.75} />
              Wonogiri, Jawa Tengah
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-primary-foreground/65 lg:px-8">
          © {new Date().getFullYear()} Rental Mobil Sahabat. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
