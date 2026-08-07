import { Building2, CheckCircle2, MapPin, Navigation, Plane, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const subDistricts = [
  { name: "Wonogiri Kota", note: "Pusat Kota & Area Stasiun" },
  { name: "Baturetno", note: "Jalur Selatan & Perdagangan" },
  { name: "Jatisrono", note: "Kawasan Wonogiri Timur" },
  { name: "Pracimantoro", note: "Wisata Geopark & Selatan" },
  { name: "Ngadirojo", note: "Akses Jalur Lintas Provinsi" },
  { name: "Selogiri", note: "Batas Wonogiri – Sukoharjo" },
  { name: "Purwantoro", note: "Perbatasan Jateng – Jatim" },
  { name: "Sidoharjo & Manyaran", note: "Area Pemukiman & Kemitraan" },
];

const airports = [
  {
    name: "Bandara Adi Soemarmo (Solo / SOC)",
    time: "± 1.5 Jam dari Wonogiri",
    description:
      "Layanan antar-jemput cepat dan tepat waktu untuk penerbangan domestik & internasional di Solo.",
    badge: "Solo Shuttle",
  },
  {
    name: "Yogyakarta International Airport (YIA)",
    time: "± 2.5 - 3 Jam via Jalur Utama / Tol",
    description:
      "Penjemputan dan pengantaran nyaman langsung dari/ke Kulon Progo Yogyakarta dengan driver berpengalaman.",
    badge: "Jogja Shuttle",
  },
];

export function AreaSection() {
  return (
    <section id="area" className="scroll-mt-20 bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
            <MapPin className="size-3.5 text-secondary" />
            Area Layanan & Antar Jemput
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Jangkauan Sewa Mobil di Wonogiri & Bandara
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Kami melayani pengantaran unit sewa hingga ke lokasi Anda di seluruh kecamatan Kabupaten Wonogiri,
            serta menyediakan layanan antar-jemput bandara di Solo & Yogyakarta.
          </p>
        </div>

        {/* Sub-Districts Coverage */}
        <div className="mt-12">
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div className="flex items-center gap-2">
              <Building2 className="size-5 text-secondary" />
              <h3 className="text-xl font-bold text-primary">Cakupan Kecamatan Wonogiri</h3>
            </div>
            <span className="hidden rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground sm:inline-block">
              25 Kecamatan Terlayani
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subDistricts.map((district) => (
              <Card
                key={district.name}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent text-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Navigation className="size-3.5" />
                    </span>
                    <h4 className="font-bold text-primary">{district.name}</h4>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{district.note}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
                  <CheckCircle2 className="size-3.5" />
                  Antar – Jemput Lokasi
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Airport Shuttle Highlights */}
        <div className="mt-14">
          <div className="flex items-center gap-2 border-b border-border/80 pb-4">
            <Plane className="size-5 text-secondary" />
            <h3 className="text-xl font-bold text-primary">Layanan Antar – Jemput Bandara</h3>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {airports.map((airport) => (
              <Card
                key={airport.name}
                className="relative overflow-hidden rounded-[22px] border border-border bg-gradient-to-br from-card via-card to-accent/30 p-6 shadow-sm lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                    {airport.badge}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <Plane className="size-3.5 text-secondary" />
                    {airport.time}
                  </span>
                </div>

                <h4 className="mt-4 text-lg font-bold text-primary sm:text-xl">{airport.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {airport.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border/60 pt-4 text-xs font-medium text-foreground/80">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-secondary" />
                    Drop-off & Pick-up 24 Jam
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    Termasuk Driver Professional
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
