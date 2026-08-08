import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Car,
  CheckCircle2,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  ProtectCheck,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  UserCheck,
  Users,
  Award,
  ChevronRight,
  Camera,
  Compass,
  Building2,
  Luggage,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FavoritesProvider } from "@/components/favorites-provider";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tentang-kami")({
  head: () => ({
    meta: [
      { title: "Tentang Kami — Rental Mobil Sahabat Wonogiri" },
      {
        name: "description",
        content:
          "Ketahui kisah, komitmen, dan keunggulan Rental Mobil Sahabat di Wonogiri. Penyedia layanan sewa mobil terpercaya untuk wisata, acara keluarga, dan kebutuhan bisnis.",
      },
      { property: "og:title", content: "Tentang Kami — Rental Mobil Sahabat Wonogiri" },
      {
        property: "og:description",
        content:
          "Penyedia layanan rental mobil terpercaya di Wonogiri dengan armada bersih terawat, driver berpengalaman, layanan 24/7, dan asuransi proteksi.",
      },
    ],
  }),
  component: TentangKamiPage,
});

const statsData = [
  { value: "1.000+", label: "Pelanggan Puas", desc: "Melayani perjalanan keluarga & perjalanan bisnis" },
  { value: "5+ Tahun", label: "Pengalaman", desc: "Pengalaman melayani rute Wonogiri & sekitarnya" },
  { value: "50+ Unit", label: "Armada Terawat", desc: "Pilihan unit lengkap MPV, SUV, hingga Microbus" },
  { value: "99.8%", label: "Ketepatan Waktu", desc: "Driver lokal ramah & tepat waktu di setiap lokasi" },
];

const advantages = [
  {
    icon: Sparkles,
    title: "Armada Terawat & Bersih",
    desc: "Setiap mobil melewati 15 poin pemeriksaan mekanis secara rutin serta pembersihan interior (deep cleaning) dan sanitasi sebelum serah terima.",
    color: "from-blue-500/10 to-cyan-500/10 text-primary border-primary/20",
  },
  {
    icon: UserCheck,
    title: "Driver Lokal Berpengalaman",
    desc: "Punctual, profesional, bersertifikasi, dan sangat menguasai rute jalan raya serta medan berbukit khas Kabupaten Wonogiri dengan aman.",
    color: "from-teal-500/10 to-emerald-500/10 text-teal-600 border-teal-500/20",
  },
  {
    icon: ShieldAlert,
    title: "Layanan Darurat 24/7",
    desc: "Free car replacement (mobil pengganti gratis) atau bantuan darurat jalan raya (roadside assistance) jika terjadi kendala teknis kapan saja.",
    color: "from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Asuransi & Proteksi",
    desc: "Ketenangan pikiran ekstra selama berkendara dengan dukungan proteksi asuransi kendaraan komprehensif untuk seluruh penumpang.",
    color: "from-indigo-500/10 to-blue-500/10 text-indigo-600 border-indigo-500/20",
  },
];

const galleryItems = [
  {
    id: 1,
    title: "Serah Terima Toyota Innova Reborn",
    category: "Wisata Keluarga",
    location: "Waduk Gajah Mungkur, Wonogiri",
    date: "Agustus 2026",
    img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    badge: "Terverifikasi",
  },
  {
    id: 2,
    title: "Trip Rombongan Avanza Veloz",
    category: "Wisata Alam",
    location: "Pantai Nampu & Pantai Sembukan",
    date: "Juli 2026",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    badge: "Lepas Kunci",
  },
  {
    id: 3,
    title: "Layanan Penjemputan Bandara & Stasiun",
    category: "Transfer Airport",
    location: "Stasiun Solo Balapan & Bandara SOC",
    date: "Juli 2026",
    img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    badge: "Dengan Driver",
  },
  {
    id: 4,
    title: "Unit Dinas Corporate & Instansi",
    category: "Kunjungan Dinas",
    location: "Kompleks Pemkab Wonogiri",
    date: "Juni 2026",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
    badge: "Corporate VIP",
  },
  {
    id: 5,
    title: "Perjalanan Rombongan Toyota HiAce",
    category: "Wisata Kelompok",
    location: "Watu Cenik & Puncak Gantole",
    date: "Juni 2026",
    img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
    badge: "Microbus 15 Seat",
  },
  {
    id: 6,
    title: "Unit Pengantin & Acara Keluarga",
    category: "Acara Pernikahan",
    location: "Baturetno, Wonogiri",
    date: "Mei 2026",
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80",
    badge: "Wedding Car",
  },
];

function TentangKamiPage() {
  return (
    <FavoritesProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />

        <main className="flex-1">
          {/* HERO BANNER SECTION */}
          <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/10 via-primary/5 to-background py-16 lg:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.623_0.214_259.8/0.08),transparent_70%)] pointer-events-none" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
              <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Link to="/" className="hover:text-primary transition-colors">
                  Beranda
                </Link>
                <ChevronRight className="size-3.5" />
                <span className="text-foreground font-semibold">Tentang Kami</span>
              </nav>

              <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                    <Sparkles className="size-3.5" />
                    Mitra Perjalanan Terpercaya Wonogiri
                  </span>

                  <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
                    Solusi Transportasi Nyaman, Aman, & Berpengalaman di Wonogiri
                  </h1>

                  <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Rental Mobil Sahabat hadir untuk menjawab kebutuhan mobilitas Anda di Kabupaten Wonogiri
                    dan sekitarnya. Kami menghadirkan armada terawat, transparansi biaya tanpa kejutan,
                    serta pelayanan profesional untuk wisatawan, acara keluarga, dan kunjungan bisnis.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button variant="brand" size="lg" asChild>
                      <a href="/#pesan">
                        <Car className="size-4 mr-2" />
                        Pesan Armada Sekarang
                      </a>
                    </Button>
                    <Button variant="outlineBrand" size="lg" asChild>
                      <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="size-4 mr-2" />
                        Konsultasi Perjalanan
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative mx-auto max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-xl backdrop-blur">
                    <div className="absolute -top-4 -right-4 flex size-12 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-lg">
                      <Award className="size-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-card-foreground">
                      Komitmen Layanan Utama
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 shrink-0 text-secondary mt-0.5" />
                        <span><strong>Armada Prima:</strong> Rutin servis berkala &amp; bebas bau rokok.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 shrink-0 text-secondary mt-0.5" />
                        <span><strong>Driver Pilihan:</strong> Pengalaman medan jalan berbukit Wonogiri.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 shrink-0 text-secondary mt-0.5" />
                        <span><strong>Harga Transparan:</strong> Tanpa biaya tersembunyi saat pengembalian.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="size-5 shrink-0 text-secondary mt-0.5" />
                        <span><strong>Respon Cepat 24 Jam:</strong> Siap membantu kebutuhan darurat Anda.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BRAND STORY SECTION */}
          <section className="py-16 lg:py-24 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">
                      Kisah &amp; Filosofi Kami
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-foreground">
                      Menghubungkan Setiap Sudut Wonogiri dengan Kenyamanan Sepenuh Hati
                    </h2>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    Berdiri di jantung Kabupaten Wonogiri, <strong>Rental Mobil Sahabat</strong> didirikan
                    dengan visi sederhana: menjadi mitra transportasi paling dapat diandalkan bagi siapa saja
                    yang berkunjung atau beraktivitas di daerah ini. Wonogiri memiliki topografi unik yang indah
                    sekaligus menantang — dari pesisir Pantai Nampu hingga perbukitan Watu Cenik dan Waduk Gajah Mungkur.
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    Kami memahami bahwa setiap perjalanan memiliki cerita penting. Bagi <strong>wisatawan</strong>,
                    kami menyediakan kendaraan yang tangguh dan nyaman untuk menjelajahi keindahan alam. Bagi
                    <strong> keluarga</strong>, kami menghadirkan ruang yang hangat dan aman untuk momen pernikahan,
                    mudik, atau liburan. Sedangkan bagi <strong>klien corporate &amp; instansi</strong>, kami menjamin
                    ketepatan waktu, legalitas lengkap, dan driver yang santun untuk mendukung kelancaran agenda dinas.
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="flex flex-col items-center text-center p-3 rounded-xl bg-accent/50">
                      <Compass className="size-6 text-primary mb-1.5" />
                      <span className="text-xs font-semibold text-foreground">Wisata Alam</span>
                      <span className="text-[11px] text-muted-foreground">Destinasi Wonogiri</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 rounded-xl bg-accent/50">
                      <Luggage className="size-6 text-secondary mb-1.5" />
                      <span className="text-xs font-semibold text-foreground">Acara Keluarga</span>
                      <span className="text-[11px] text-muted-foreground">Pernikahan &amp; Mudik</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 rounded-xl bg-accent/50">
                      <Building2 className="size-6 text-teal-600 mb-1.5" />
                      <span className="text-xs font-semibold text-foreground">Dinas Bisnis</span>
                      <span className="text-[11px] text-muted-foreground">Corporate Client</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-card">
                    <img
                      src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1000&q=80"
                      alt="Rental Mobil Sahabat Wonogiri"
                      className="w-full h-80 sm:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                      <blockquote className="text-sm sm:text-base italic font-medium leading-relaxed">
                        &ldquo;Kami tidak sekadar menyewakan mobil, kami menghadirkan rasa aman dan ketenangan di setiap kilometer perjalanan Anda di Wonogiri.&rdquo;
                      </blockquote>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                          RMS
                        </div>
                        <div>
                          <div className="font-semibold text-sm">Tim Manajemen</div>
                          <div className="text-xs text-slate-300">Rental Mobil Sahabat Wonogiri</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CORE ADVANTAGES (4-COLUMN GRID) */}
          <section className="py-16 lg:py-24 bg-muted/40 border-y border-border/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-bold tracking-wider text-primary uppercase">
                  Mengapa Memilih Kami
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-foreground">
                  4 Keunggulan Utama yang Dipercaya Pelanggan
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                  Standar pelayanan tinggi untuk memastikan pengalaman sewa mobil terbaik di Wonogiri.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {advantages.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div>
                        <div
                          className={`inline-flex size-12 items-center justify-center rounded-xl border bg-gradient-to-br ${item.color} mb-5 transition-transform group-hover:scale-110`}
                        >
                          <Icon className="size-6" strokeWidth={1.75} />
                        </div>
                        <h3 className="font-display text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold text-primary">
                        <span>Layanan Standar RMS</span>
                        <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* STATIC GALLERY PLACEHOLDER */}
          <section className="py-16 lg:py-24 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
                    <Camera className="size-4" />
                    Galeri Dokumentasi
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-foreground">
                    Momen Perjalanan Bersama Pelanggan
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                    Dokumentasi serah terima unit armada dan momen bahagia pelanggan kami selama menjelajahi rute Wonogiri.
                  </p>
                </div>
                <Button variant="outlineBrand" size="sm" className="shrink-0 self-start md:self-auto" asChild>
                  <a href="/#armada">Lihat Pilihan Armada</a>
                </Button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                      <span className="absolute top-3 left-3 rounded-full bg-primary/90 backdrop-blur px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-sm">
                        {item.badge}
                      </span>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[11px] font-medium text-amber-300 uppercase tracking-wide">
                          {item.category}
                        </span>
                        <h4 className="font-display text-base font-bold leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between text-xs text-muted-foreground bg-card">
                      <span className="flex items-center gap-1.5 truncate">
                        <MapPin className="size-3.5 text-primary shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </span>
                      <span className="shrink-0 text-[11px] font-medium bg-muted px-2 py-0.5 rounded-md">
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TRUST BADGE / STATS BANNER */}
          <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,oklch(0.623_0.214_259.8/0.25),transparent_60%)]" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-primary-foreground/15">
                {statsData.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col items-center text-center ${idx !== 0 ? "pt-6 sm:pt-0 sm:pl-6" : ""}`}
                  >
                    <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                      {stat.value}
                    </span>
                    <span className="mt-1 text-base font-semibold text-white/90">
                      {stat.label}
                    </span>
                    <span className="mt-1 text-xs text-primary-foreground/75 max-w-[200px]">
                      {stat.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* CALL TO ACTION BANNER */}
              <div className="mt-14 rounded-2xl border border-primary-foreground/20 bg-white/10 backdrop-blur-md p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                    Siap Memulai Perjalanan Anda Bersama Rental Mobil Sahabat?
                  </h3>
                  <p className="mt-2 text-sm text-primary-foreground/80 max-w-xl">
                    Hubungi tim kami sekarang untuk booking armada impian Anda atau konsultasi rute terbaik di Wonogiri.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="size-4 mr-2" />
                      Chat WhatsApp
                    </a>
                  </Button>
                  <Button variant="outlineBrand" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                    <a href="/#pesan">
                      Pesan via Form
                    </a>
                  </Button>
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
