import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  FileText,
  Info,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Train,
  Truck,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FavoritesProvider } from "@/components/favorites-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/area-layanan")({
  head: () => ({
    meta: [
      { title: "Area Layanan — Rental Mobil Sahabat Wonogiri & Bandara Solo / YIA" },
      {
        name: "description",
        content:
          "Cakupan luas sewa mobil di 25 Kecamatan Kabupaten Wonogiri, perbatasan Jateng-Jatim, serta antar-jemput 24 jam ke Bandara Solo (SOC), Bandara YIA Jogja, & Stasiun Balapan.",
      },
      { property: "og:title", content: "Area Layanan — Rental Mobil Sahabat Wonogiri" },
      {
        property: "og:description",
        content:
          "Layanan sewa mobil lepas kunci & dengan driver untuk seluruh wilayah Wonogiri, Solo, Yogyakarta, dan kota sekitarnya.",
      },
    ],
  }),
  component: AreaLayananPage,
});

const regions = [
  {
    id: "tengah",
    zone: "Wilayah Tengah & Pusat Kota",
    desc: "Pusat pemerintahan, bisnis, stasiun, dan fasilitas publik utama Wonogiri.",
    tag: "Free Shipping <10km",
    color: "from-blue-500/10 to-cyan-500/10 text-primary border-primary/20",
    districts: [
      { name: "Wonogiri Kota", note: "Pusat Kota, Alun-Alun, Stasiun & Terminal Giri Adipura" },
      { name: "Ngadirojo", note: "Jalur Lintas Provinsi & Kawasan Industri Wonogiri" },
      { name: "Selogiri", note: "Batas Wonogiri – Sukoharjo / Solo" },
      { name: "Manyaran", note: "Area Pemukiman & Sentra Kerajinan Jamu" },
      { name: "Wuryantoro", note: "Kawasan Sekitar Waduk Gajah Mungkur Sisi Barat" },
    ],
  },
  {
    id: "selatan",
    zone: "Wilayah Selatan & Pesisir Wisata",
    desc: "Kawasan Geopark Museum Karst, wisata pantai pesisir, & perbatasan Pacitan.",
    tag: "Area Wisata Populer",
    color: "from-teal-500/10 to-emerald-500/10 text-teal-600 border-teal-500/20",
    districts: [
      { name: "Baturetno", note: "Pusat Perdagangan Wonogiri Selatan & Terminal Baturetno" },
      { name: "Pracimantoro", note: "Museum Karst Indonesia & Destinasi Geopark" },
      { name: "Giriwoyo", note: "Jalur Perhubungan Wonogiri – Pacitan" },
      { name: "Giritontro", note: "Akses Wisata Gua & Pegunungan Karst" },
      { name: "Paranggupito", note: "Destinasi Wisata Pantai Nampu & Pantai Sembukan" },
      { name: "Eromoko", note: "Kawasan Pertanian & Waduk Parangan" },
      { name: "Karangtengah", note: "Area Selatan Perbatasan Pegunungan" },
    ],
  },
  {
    id: "timur",
    zone: "Wilayah Timur & Perbatasan Jatim",
    desc: "Korridor perekonomian utama yang menghubungkan Wonogiri dengan Ponorogo & Madiun.",
    tag: "Jalur Jateng - Jatim",
    color: "from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-500/20",
    districts: [
      { name: "Jatisrono", note: "Pusat Keramaian & Pasar Wonogiri Timur" },
      { name: "Purwantoro", note: "Batas Provinsi Jawa Tengah & Jawa Timur (Ponorogo)" },
      { name: "Slogohimo", note: "Jalur Utama Wisata Air Keturunan & Kuliner" },
      { name: "Sidoharjo", note: "Area Perbukitan & Sentra Pertanian" },
      { name: "Kismantoro", note: "Kawasan Perbatasan Pegunungan Timur" },
      { name: "Jatipurno", note: "Wisata Alam Air Terjun & Perkebunan" },
    ],
  },
  {
    id: "utara",
    zone: "Wilayah Utara & Perbukitan",
    desc: "Kawasan perbukitan sejuk, pemandangan alam Watu Cenik, & perbatasan Karanganyar.",
    tag: "Panorama & Perbukitan",
    color: "from-indigo-500/10 to-purple-500/10 text-indigo-600 border-indigo-500/20",
    districts: [
      { name: "Girimarto", note: "Akses Wisata Watu Cenik & Puncak Gantole" },
      { name: "Bulukerto", note: "Kawasan Lereng Gunung Lawu Sisi Selatan" },
      { name: "Puhpelem", note: "Kecamatan Perbatasan Paling Timur Utara" },
      { name: "Nguntoronadi", note: "Jalur Lintas Utama Wonogiri – Baturetno" },
      { name: "Tirtomoyo", note: "Area Pegunungan & Wisata Aliran Sungai" },
    ],
  },
];

const transitServices = [
  {
    icon: Plane,
    name: "Bandara Adi Soemarmo (Solo / SOC)",
    time: "± 1.5 Jam dari Wonogiri Kota",
    type: "Shuttle Bandara Solo",
    badge: "Antar-Jemput 24 Jam",
    desc: "Pengantaran & penjemputan privat langsung dari gate penerbangan domestik maupun internasional. Driver kami memantau nomor penerbangan Anda secara real-time via WA.",
    highlights: ["Sewa + Driver Profesional", "Bebas Repot Bebas Antre", "Termasuk Toll & Parkir"],
  },
  {
    icon: Plane,
    name: "Yogyakarta International Airport (YIA Kulon Progo)",
    time: "± 2.5 - 3 Jam via Jalur Utama / Tol",
    type: "Shuttle Bandara Jogja",
    badge: "Rute Nyaman & Luas",
    desc: "Layanan shuttle nyaman menggunakan unit MPV/SUV kelas atas (Innova Reborn, Avanza Veloz, Fortuner) untuk perjalanan langsung dari Wonogiri menuju Bandara YIA atau sebaliknya.",
    highlights: ["Armada AC Dingin & Kabin Bersih", "Kapasitas Bagasi Luas", "Layanan Drop-off Langsung"],
  },
  {
    icon: Train,
    name: "Stasiun Solo Balapan & Stasiun Purwosari",
    time: "± 1 Jam dari Wonogiri Kota",
    type: "Transfer Stasiun Kereta",
    badge: "Tepat Waktu",
    desc: "Penjemputan tepat waktu saat kereta api Anda tiba di Solo Balapan, Purwosari, atau Jebres. Sangat cocok bagi wisatawan & pemudik yang tiba di Solo.",
    highlights: ["Standby 15 Menit Sebelum Tiba", "Bantu Angkut Bagasi", "Akses Cepat Jalur Wonogiri"],
  },
  {
    icon: Train,
    name: "Stasiun Wonogiri & Terminal Giri Adipura",
    time: "± 10 - 15 Menit (Pusat Kota)",
    type: "Transit Lokal Wonogiri",
    badge: "Gratis Pengantaran",
    desc: "Gratis pengantaran unit sewa lepas kunci maupun sewa plus driver bagi penumpang bus malam antar-kota atau Railbus Batara Kresna yang tiba di Wonogiri.",
    highlights: ["Free Pickup Point", "Serah Terima Cepat", "Tersedia 24 Jam"],
  },
];

const intercityDestinations = [
  { city: "Solo (Surakarta)", time: "1 Jam", note: "Belanja Batik, Kuliner, Bisnis & Rumah Sakit" },
  { city: "Yogyakarta (Jogja)", time: "2.5 Jam", note: "Wisata Malioboro, Candi, & Kampus" },
  { city: "Semarang", time: "2.5 - 3 Jam", note: "Kunjungan Instansi Provinsi & Pelabuhan" },
  { city: "Pacitan & Ponorogo", time: "1 font-semibold.5 - 2 Jam", note: "Wisata Gua, Pantai, & Kunjungan Keluarga" },
  { city: "Surabaya & Malang", time: "4 - 5 Jam via Tol", note: "Charter Bisnis & Perjalanan Antar-Provinsi" },
  { city: "Jakarta & Bandung", time: "Flexibel / Charter", note: "Perjalanan Luar Kota Jarak Jauh + 2 Driver" },
];

function AreaLayananPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRegions = regions
    .map((reg) => ({
      ...reg,
      districts: reg.districts.filter(
        (d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.zone.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((reg) => reg.districts.length > 0);

  return (
    <FavoritesProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />

        <main className="flex-1">
          {/* HEADER BANNER SECTION */}
          <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/10 via-primary/5 to-background py-16 lg:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,oklch(0.623_0.214_259.8/0.08),transparent_70%)] pointer-events-none" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
              <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Link to="/" className="hover:text-primary transition-colors">
                  Beranda
                </Link>
                <ChevronRight className="size-3.5" />
                <span className="text-foreground font-semibold">Area Layanan</span>
              </nav>

              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                  <MapPin className="size-3.5" />
                  Seluruh 25 Kecamatan Wonogiri &amp; Intercity Transit
                </span>

                <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
                  Cakupan Area Layanan &amp; Antar-Jemput Unit
                </h1>

                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Kami melayani pengantaran armada sewa hingga ke seluruh 25 Kecamatan di Kabupaten Wonogiri,
                  kawasan perbatasan Jawa Tengah – Jawa Timur, serta layanan transfer privat 24 jam ke Bandara Solo (SOC),
                  Bandara YIA Yogyakarta, dan Stasiun Kereta Api.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    25 Kecamatan Terlayani
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm">
                    <Truck className="size-4 text-primary" />
                    Antar-Jemput Rumah / Hotel
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm">
                    <Plane className="size-4 text-secondary" />
                    Shuttle Bandara Solo &amp; YIA
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground shadow-sm">
                    <Clock className="size-4 text-amber-500" />
                    Layanan 24 Jam Nonstop
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* REGION SEARCH & WONOGIRI COVERAGE GRID */}
          <section className="py-16 lg:py-24 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold tracking-wider text-primary uppercase">
                    Cakupan Kabupaten Wonogiri
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-foreground">
                    Daftar Kecamatan &amp; Zona Pengantaran
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                    Cari nama kecamatan Anda di bawah untuk melihat detail zona pengantaran dan kemudahan sewa mobil.
                  </p>
                </div>

                {/* SEARCH INPUT */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari kecamatan..."
                    className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  />
                </div>
              </div>

              {filteredRegions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
                  <MapPin className="mx-auto size-8 text-muted-foreground mb-3" />
                  <h3 className="font-bold text-foreground text-lg">Kecamatan Tidak Ditemukan</h3>
                  <p className="text-sm mt-1">
                    Coba kata kunci lain atau hubungi tim kami langsung untuk konfirmasi pengantaran lokasi Anda.
                  </p>
                  <Button
                    variant="outlineBrand"
                    size="sm"
                    className="mt-4"
                    onClick={() => setSearchTerm("")}
                  >
                    Tampilkan Semua Kecamatan
                  </Button>
                </div>
              ) : (
                <div className="space-y-12">
                  {filteredRegions.map((region) => (
                    <div key={region.id} className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/80 pb-4 mb-6 gap-2">
                        <div>
                          <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wide">
                            {region.tag}
                          </span>
                          <h3 className="font-display text-xl font-bold text-card-foreground">
                            {region.zone}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{region.desc}</p>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground self-start sm:self-auto">
                          <Building2 className="size-3.5 text-secondary" />
                          {region.districts.length} Area Kecamatan
                        </span>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {region.districts.map((item, idx) => (
                          <div
                            key={idx}
                            className="group flex flex-col justify-between rounded-2xl border border-border/70 bg-background p-4 shadow-2xs transition-all hover:border-primary/40 hover:shadow-sm"
                          >
                            <div>
                              <div className="flex items-center gap-2.5">
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                  <Navigation className="size-3.5" />
                                </span>
                                <h4 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                                  {item.name}
                                </h4>
                              </div>
                              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                                {item.note}
                              </p>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-2.5 text-[11px] font-medium text-emerald-600">
                              <span className="flex items-center gap-1">
                                <CheckCircle2 className="size-3.5" />
                                Terlayani Antar – Jemput
                              </span>
                              <span className="text-[10px] text-muted-foreground group-hover:text-primary">
                                RMS Active
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* TRANSIT HUB & AIRPORT SHUTTLE SECTION */}
          <section className="py-16 lg:py-24 bg-muted/40 border-y border-border/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-bold tracking-wider text-primary uppercase">
                  Layanan Penjemputan Privat
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-foreground">
                  Transfer Bandara, Stasiun Kereta, &amp; Antar-Kota
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                  Perjalanan antar-kota yang aman dan bebas lelah dengan armada prima &amp; driver berpengalaman.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {transitServices.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <Card
                      key={idx}
                      className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                          <Icon className="size-3.5" />
                          {service.type}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
                          {service.time}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-xl font-bold text-card-foreground">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {service.desc}
                      </p>

                      <div className="mt-6 pt-4 border-t border-border/60 space-y-2">
                        {service.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* INTERCITY CHARTER GRID */}
              <div className="mt-14 rounded-3xl border border-border bg-card p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 mb-6 gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-card-foreground">
                      Destinasi Charter Antar-Kota Paling Populer
                    </h3>
                    <p className="text-xs text-muted-foreground">Layanan drop-off atau sewa harian luar kota dari Wonogiri</p>
                  </div>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full self-start sm:self-auto">
                    Intercity Shuttle
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {intercityDestinations.map((item, idx) => (
                    <div key={idx} className="rounded-2xl border border-border/70 bg-background p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-foreground text-sm">{item.city}</h4>
                        <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-muted-foreground">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* DELIVERY POLICY NOTE */}
          <section className="py-16 lg:py-24 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-accent/30 p-6 sm:p-10 shadow-lg">
                <div className="flex items-center gap-3 text-primary mb-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                    <FileText className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Ketentuan &amp; Kebijakan Antar-Jemput Armada
                    </h3>
                    <p className="text-xs text-muted-foreground">Informasi penting untuk kenyamanan serah terima kendaraan</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background p-4">
                      <Truck className="size-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm text-foreground">Gratis Antar-Jemput Pusat Kota</h4>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          Pengantaran unit sewa lepas kunci gratis untuk wilayah Wonogiri Kota (radius 10 km dari lokasi pool kami), stasiun, dan terminal bus kota.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background p-4">
                      <MapPin className="size-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm text-foreground">Pengantaran Area Kecamatan &amp; Perbatasan</h4>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          Untuk pengantaran ke area kecamatan di luar radius 10 km (seperti Baturetno, Pracimantoro, Purwantoro), dikenakan ongkos kirim unit terjangkau yang dikonfirmasikan di awal.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background p-4">
                      <Clock className="size-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm text-foreground">Koordinasi WhatsApp H-1</h4>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          Petugas/driver kami akan mengirimkan konfirmasi via WhatsApp H-1 dan membagikan lokasi real-time 1 jam sebelum jam serah terima kendaraan.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background p-4">
                      <ShieldCheck className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm text-foreground">Verifikasi Dokumen Cepat</h4>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                          Penyewa lepas kunci cukup menyiapkan e-KTP asli, SIM A aktif, dan dokumen pendukung domisili/hotel untuk serah terima unit yang cepat &amp; aman.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA BANNER */}
                <div className="mt-8 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-foreground text-base">
                      Lokasi Anda Belum Terdaftar atau Ingin Cek Ongkir Pengantaran Unit?
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Tim customer service kami siap menjawab pertanyaan lokasi &amp; jadwal sewa Anda 24 jam nonstop.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <Button variant="brand" size="lg" asChild>
                      <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="size-4 mr-2" />
                        Tanya via WhatsApp
                      </a>
                    </Button>
                    <Button variant="outlineBrand" size="lg" asChild>
                      <a href="/#pesan">
                        Form Pemesanan
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </FavoritesProvider>
  );
}
