import { Clock, MapPin, ShieldCheck, Sparkles, Star, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const values = [
  {
    icon: Sparkles,
    title: "Armada Prima & Bersih",
    description: "Seluruh kendaraan rutin diservis di bengkel resmi dan selalu dibersihkan sebelum diserahkan.",
  },
  {
    icon: Clock,
    title: "Layanan 24 Jam & Tepat Waktu",
    description: "Siap melayani kebutuhan transportasi harian, bisnis, maupun wisata tepat waktu 24/7.",
  },
  {
    icon: Star,
    title: "Harga Transparan",
    description: "Tarif sewa jelas tanpa biaya tersembunyi. Lepas kunci maupun dengan sopir berpengalaman.",
  },
];

const serviceAreas = [
  "Wonogiri Kota",
  "Selogiri",
  "Baturetno",
  "Jatisrono",
  "Purwantoro",
  "Praci",
  "Ngadirojo",
  "Girimarto",
];

export function AboutSection() {
  return (
    <section id="tentang" className="bg-secondary/5 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
            <Users className="size-3.5 text-secondary" />
            Tentang Kami
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Profil Rental Mobil Sahabat
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Rental Mobil Sahabat adalah penyedia jasa sewa kendaraan terpercaya yang berpusat di Wonogiri,
            Jawa Tengah. Kami berkomitmen memberikan solusi transportasi yang aman, nyaman, dan higienis dengan
            armada terawat serta pengemudi yang ramah dan profesional.
          </p>
        </div>

        {/* 3 Values Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <Card
                key={v.title}
                className="group rounded-[22px] border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-accent text-secondary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-primary">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Office Location & Operational Info */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Office Address & Hours */}
          <Card className="rounded-[24px] border border-border bg-card p-6 shadow-sm lg:col-span-7 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-secondary">
                <MapPin className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-primary">Lokasi Kantor Utama</h3>
                <p className="text-xs text-muted-foreground">Wonogiri, Jawa Tengah</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm text-foreground/80">
              <p className="leading-relaxed">
                <strong className="text-primary">Alamat Kantor:</strong><br />
                Jl. Raya Wonogiri - Solo No. 45, Pokoh, Wonogiri, Kabupaten Wonogiri, Jawa Tengah 57613
              </p>

              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/80 bg-accent/30 p-4">
                  <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Jam Operasional Kantor
                  </span>
                  <span className="mt-1 block text-base font-bold text-primary">
                    06:00 – 22:00 WIB
                  </span>
                  <span className="text-xs text-muted-foreground">Setiap Hari (Senin - Minggu)</span>
                </div>

                <div className="rounded-2xl border border-border/80 bg-accent/30 p-4">
                  <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Layanan Darurat / Booking
                  </span>
                  <span className="mt-1 block text-base font-bold text-secondary">
                    24 Jam Nonstop
                  </span>
                  <span className="text-xs text-muted-foreground">Respons cepat via WhatsApp</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Operational Area */}
          <Card className="flex flex-col justify-between rounded-[24px] border border-border bg-primary p-6 text-primary-foreground shadow-md lg:col-span-5 lg:p-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15">
                  <ShieldCheck className="size-5 text-emerald-400" />
                </span>
                <div>
                  <h3 className="text-lg font-bold">Jangkauan Area Layanan</h3>
                  <p className="text-xs text-primary-foreground/75">Seluruh Kabupaten Wonogiri & Sekitarnya</p>
                </div>
              </div>

              <p className="mt-5 text-sm text-primary-foreground/85 leading-relaxed">
                Kami melayani pengantaran dan penjemputan armada hingga ke lokasi Anda di wilayah:
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium text-primary-foreground"
                  >
                    ✓ {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-primary-foreground/15 pt-4 text-xs text-primary-foreground/70">
              Juga melayani luar kota: Solo, Boyolali, Sukoharjo, Karanganyar, dan Bandara YIA / Adi Soemarmo.
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
