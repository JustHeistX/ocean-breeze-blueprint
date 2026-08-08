import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  HelpCircle,
  MessageCircle,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  Phone,
  Car,
  FileCheck,
  ShieldCheck,
  CreditCard,
  UserCheck,
  Sparkles,
  MapPin,
  ThumbsUp,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FavoritesProvider } from "@/components/favorites-provider";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ & Testimonial Pelanggan — Rental Mobil Sahabat Wonogiri" },
      {
        name: "description",
        content:
          "Pertanyaan yang sering diajukan mengenai syarat sewa, harga, armada, dan testimoni ulasan asli pelanggan Rental Mobil Sahabat Wonogiri.",
      },
      { property: "og:title", content: "FAQ & Testimonial Pelanggan — Rental Mobil Sahabat Wonogiri" },
      {
        property: "og:description",
        content:
          "Temukan jawaban lengkap seputar sewa mobil di Wonogiri & baca ulasan kepuasan dari pelanggan kami.",
      },
    ],
  }),
  component: FaqPage,
});

const faqCategories = [
  {
    id: "syarat",
    title: "Syarat & Ketentuan Sewa",
    icon: FileCheck,
    items: [
      {
        q: "Apakah tersedia pilihan sewa mobil lepas kunci?",
        a: "Ya, kami menyediakan sewa lepas kunci untuk penggunaan harian, mingguan, maupun bulanan. Penyewa cukup melengkapi dokumen e-KTP asli, SIM A aktif, jaminan sepeda motor + STNK asli, serta verifikasi domisili/tempat menginap di Wonogiri.",
      },
      {
        q: "Bagaimana jika saya belum pernah sewa di Rental Mobil Sahabat?",
        a: "Proses verifikasi untuk pelanggan baru sangat cepat dan mudah! Anda cukup mengirimkan foto KTP & SIM A via WhatsApp untuk proses survei singkat (biasanya hanya 10–15 menit).",
      },
      {
        q: "Apakah bisa sewa mobil sekaligus dengan sopir (driver)?",
        a: "Sangat bisa. Kami menyediakan driver berpengalaman yang ramah, sopan, bersertifikasi, dan sangat memahami seluruh rute jalan serta medan perbukitan di Wonogiri & sekitarnya.",
      },
      {
        q: "Apa saja dokumen yang dibutuhkan untuk sewa instansi / perusahaan (corporate)?",
        a: "Untuk klien corporate atau instansi, kami menyediakan persyaratan yang lebih simpel: SIUP/NIB, KTP penanggung jawab, serta surat perintah kerja/kunjungan dinas. Kami mendukung pembayaran via invoice resmi.",
      },
    ],
  },
  {
    id: "harga",
    title: "Harga & Pembayaran",
    icon: CreditCard,
    items: [
      {
        q: "Apakah harga rental sudah termasuk BBM, tol, dan biaya driver?",
        a: "Kami menyediakan 2 skema paket fleksibel: (1) Paket Lepas Kunci (hanya sewa unit mobil) atau (2) Paket All-In (Mobil + Driver + BBM + Tol + Parkir). Anda dapat memilih sesuai kebutuhan anggaran perjalanan.",
      },
      {
        q: "Bagaimana sistem DP dan pelunasan pembayaran?",
        a: "Booking unit dapat mengamankan jadwal dengan DP mulai dari Rp 100.000 via transfer bank / QRRIS. Pelunasan sisa pembayaran dilakukan saat serah terima kendaraan di lokasi Anda.",
      },
      {
        q: "Apakah ada biaya tersembunyi (hidden fees)?",
        a: "Tidak ada sama sekali. Seluruh komponen rincian harga (durasi sewa, batas waktu harian, ongkos kirim unit jika ada) diinformasikan secara transparan diawal sebelum Anda melakukan DP.",
      },
      {
        q: "Bagaimana jika terjadi overtime (kelebihan waktu sewa)?",
        a: "Kelebihan waktu sewa (overtime) dikenakan biaya 10% per jam dari tarif harian unit. Jika overtime melebihi 5 jam, maka akan dihitung tarif 1 hari penuh.",
      },
    ],
  },
  {
    id: "armada",
    title: "Armada & Jaminan Kondisi",
    icon: ShieldCheck,
    items: [
      {
        q: "Bagaimana kondisi kebersihan dan kelayakan mesin mobil?",
        a: "Seluruh unit armada kami wajib melewati 15 poin pemeriksaan teknis rutin, servis berkala bengkel resmi, serta pembersihan deep cleaning & sanitasi interior sebelum diserahkan ke tangan Anda.",
      },
      {
        q: "Bagaimana jika terjadi kendala teknis atau mogok di jalan?",
        a: "Anda dilindungi oleh Layanan Darurat 24/7. Jika terjadi kendala mesin yang tidak bisa diatasi di tempat, tim kami akan segera mengirimkan unit mobil pengganti gratis tanpa biaya tambahan.",
      },
      {
        q: "Apakah mobil dilengkapi dengan proteksi asuransi?",
        a: "Ya, seluruh unit kendaraan kami telah dilindungi oleh asuransi komprehensif untuk ketenangan pikiran ekstra selama Anda berkendara.",
      },
    ],
  },
  {
    id: "layanan",
    title: "Layanan Antar-Jemput & Rute",
    icon: UserCheck,
    items: [
      {
        q: "Apakah unit mobil bisa diantar langsung ke rumah atau hotel saya?",
        a: "Bisa! Kami melayani gratis antar-jemput unit untuk area Wonogiri Kota (radius <10 km dari pool), stasiun, dan terminal bus. Untuk kecamatan luar kota, dikenakan ongkos kirim terjangkau.",
      },
      {
        q: "Apakah melayani penjemputan dari Bandara Solo (SOC) & YIA Jogja?",
        a: "Ya, kami menyediakan layanan shuttle privat 24 jam dari dan ke Bandara Adi Soemarmo Solo (SOC), Bandara YIA Kulon Progo Yogyakarta, Stasiun Solo Balapan, dan Stasiun Purwosari.",
      },
      {
        q: "Apakah armada boleh digunakan untuk luar kota (Solo, Jogja, Semarang, Surabaya)?",
        a: "Boleh! Anda bebas mengendarai unit sewa kami untuk perjalanan luar kota di seluruh Pulau Jawa dengan mengonfirmasikan rute tujuan saat pemesanan.",
      },
    ],
  },
];

const customerReviews = [
  {
    id: 1,
    name: "Budi Santoso",
    origin: "Wisatawan asal Jakarta",
    car: "Sewa Innova Zenix + Driver",
    rating: 5,
    date: "Agustus 2026",
    avatar: "BS",
    review:
      "Sangat puas dengan pelayanan Rental Mobil Sahabat! Driver Pak Bambang sangat tepat waktu menjemput di Bandara Solo, ramah, dan paham rute wisata ke Watu Cenik & Waduk Gajah Mungkur. Mobil bersih harum seperti baru!",
    badge: "Verified Booking",
  },
  {
    id: 2,
    name: "Siti Rahmawati",
    origin: "Warga Baturetno, Wonogiri",
    car: "Sewa Honda Brio Lepas Kunci",
    rating: 5,
    date: "Agustus 2026",
    avatar: "SR",
    review:
      "Proses sewa lepas kunci sangat cepat dan tidak ribet. Kondisi Brio sangat prima saat dibawa ke area perbukitan Pracimantoro. AC dingin, BBM terhitung irit. Pasti akan sewa di sini lagi!",
    badge: "Verified Customer",
  },
  {
    id: 3,
    name: "Hendra Wijaya",
    origin: "Karyawan Instansi (Semarang)",
    car: "Sewa Toyota Avanza Veloz + Driver",
    rating: 5,
    date: "Juli 2026",
    avatar: "HW",
    review:
      "Kunjungan dinas ke Wonogiri berjalan sukses berkat armada yang nyaman dan kwitansi pembayaran yang rapi. Komunikasi WhatsApp respon cepat 24 jam. Sangat profesional!",
    badge: "Corporate Client",
  },
  {
    id: 4,
    name: "Dewi Anggraini",
    origin: "Rombongan Keluarga (Surabaya)",
    car: "Sewa HiAce Luxury 15 Seat",
    rating: 5,
    date: "Juli 2026",
    avatar: "DA",
    review:
      "Acara syukuran keluarga berjalan lancar. Mobil HiAce sangat bersih dan suspensinya empuk. Driver sabar menunggu rombongan kami saat wisata kuliner di Wonogiri Kota.",
    badge: "Family Trip",
  },
  {
    id: 5,
    name: "Agung Prasetyo",
    origin: "Pemudik asal Bandung",
    car: "Sewa Mitsubishi Xpander Lepas Kunci",
    rating: 5,
    date: "Juni 2026",
    avatar: "AP",
    review:
      "Antar-jemput unit gratis langsung di Stasiun Wonogiri. Mobil Xpander dalam kondisi bersih dan fit untuk tanjakan pedalaman. Kualitas layanan bintang lima!",
    badge: "Verified Customer",
  },
  {
    id: 6,
    name: "Maya Kusuma",
    origin: "Wisatawan asal Jogja",
    car: "Sewa Toyota Fortuner VRZ + Driver",
    rating: 5,
    date: "Juni 2026",
    avatar: "MK",
    review:
      "Paket VIP dengan Fortuner sangat elegan untuk pengantaran tamu pernikahan di Wonogiri. Driver tampil rapi, sopan, dan mengemudi dengan sangat aman.",
    badge: "VIP Guest",
  },
];

function FaqPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <FavoritesProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />

        <main className="flex-1">
          {/* HEADER BANNER */}
          <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/10 via-primary/5 to-background py-16 lg:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,oklch(0.623_0.214_259.8/0.08),transparent_70%)] pointer-events-none" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
              <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Link to="/" className="hover:text-primary transition-colors">
                  Beranda
                </Link>
                <ChevronRight className="size-3.5" />
                <span className="text-foreground font-semibold">FAQ &amp; Ulasan</span>
              </nav>

              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                  <HelpCircle className="size-3.5" />
                  Pusat Bantuan &amp; Informasi Layanan
                </span>

                <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
                  Pertanyaan Umum &amp; Testimonial Pelanggan
                </h1>

                <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Temukan jawaban lengkap seputar syarat sewa, harga, prosedur pembayaran, dan jaminan armada kami.
                  Lihat juga pengalaman nyata ratusan pelanggan yang puas menggunakan Rental Mobil Sahabat.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-sm">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span><strong>4.9 / 5.0</strong> Rating Kepuasan (500+ Ulasan)</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-sm">
                    <ThumbsUp className="size-4 text-primary" />
                    <span>99% Pelanggan Merekomendasikan Kami</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ ACCORDION SECTION */}
          <section className="py-16 lg:py-24 bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold tracking-wider text-primary uppercase">
                  Pusat Informasi
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
                  Semua Hal yang Perlu Anda Ketahui
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Klik pada kategori pertanyaan di bawah untuk menemukan jawaban yang Anda cari.
                </p>
              </div>

              {/* CATEGORY TABS / GRID ACCORDIONS */}
              <div className="space-y-10">
                {faqCategories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs"
                    >
                      <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <CategoryIcon className="size-5" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-card-foreground">
                            {category.title}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {category.items.length} Pertanyaan Populer
                          </span>
                        </div>
                      </div>

                      <Accordion type="single" collapsible defaultValue={`${category.id}-0`} className="space-y-3">
                        {category.items.map((item, idx) => (
                          <AccordionItem
                            key={idx}
                            value={`${category.id}-${idx}`}
                            className="rounded-2xl border border-border/70 bg-background px-5 py-0.5 transition-all hover:border-primary/40"
                          >
                            <AccordionTrigger className="text-sm sm:text-base font-bold text-foreground hover:no-underline py-4 text-left">
                              {item.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-sm leading-relaxed text-muted-foreground pt-1 pb-4 border-t border-border/40 mt-1">
                              {item.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CUSTOMER REVIEWS & TESTIMONIALS SECTION */}
          <section className="py-16 lg:py-24 bg-muted/40 border-y border-border/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-primary uppercase">
                  <Sparkles className="size-4" />
                  Kepercayaan Pelanggan
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-foreground">
                  Ulasan &amp; Testimonial Pelanggan
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                  Pengalaman jujur dari para wisatawan, keluarga, dan instansi yang memilih Rental Mobil Sahabat Wonogiri.
                </p>
              </div>

              {/* RATING SUMMARY HIGHLIGHT BOX */}
              <div className="mb-12 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="flex size-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                    <span className="font-display text-3xl font-extrabold text-primary">4.9</span>
                    <span className="text-[10px] font-bold text-muted-foreground">dari 5.0</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-5 fill-amber-400" />
                      ))}
                    </div>
                    <h3 className="font-bold text-foreground text-base sm:text-lg">
                      Ulasan Sangat Memuaskan (500+ Testimoni)
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Berdasarkan masukan langsung dari pelanggan sewa harian, perjalanan dinas, &amp; tour wisata.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <span className="rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-600 border border-emerald-500/20">
                    ✓ Kebersihan 100% Terjaga
                  </span>
                  <span className="rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-primary border border-blue-500/20">
                    ✓ Driver On-Time
                  </span>
                  <span className="rounded-full bg-purple-500/10 px-3.5 py-1.5 text-xs font-semibold text-purple-600 border border-purple-500/20">
                    ✓ Tanpa Hidden Fees
                  </span>
                </div>
              </div>

              {/* REVIEWS GRID (6 CARDS) */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {customerReviews.map((rev) => (
                  <Card
                    key={rev.id}
                    className="relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Header: Avatar + Info */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-xs">
                            {rev.avatar}
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground text-sm leading-snug">
                              {rev.name}
                            </h4>
                            <span className="block text-xs text-muted-foreground">
                              {rev.origin}
                            </span>
                          </div>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary shrink-0">
                          {rev.badge}
                        </span>
                      </div>

                      {/* Car Badge */}
                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                        <Car className="size-3.5 text-secondary" />
                        <span>{rev.car}</span>
                      </div>

                      {/* Star Rating */}
                      <div className="mt-3 flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, idx) => (
                          <Star key={idx} className="size-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Review Text */}
                      <blockquote className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                        &ldquo;{rev.review}&rdquo;
                      </blockquote>
                    </div>

                    <div className="mt-6 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1 font-medium text-emerald-600">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        Ulasan Terverifikasi
                      </span>
                      <span>{rev.date}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* WHATSAPP CTA BANNER AT BOTTOM */}
          <section className="py-16 bg-background">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-accent/30 p-8 sm:p-12 text-center shadow-xl">
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary mb-4">
                  <MessageCircle className="size-7" />
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                  Masih Punya Pertanyaan atau Ingin Cek Ketersediaan Armada?
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-muted-foreground">
                  Tim customer support kami siap melayani pertanyaan sewa, rekomendasi rute, serta simulasi harga 24 jam nonstop via WhatsApp.
                </p>

                <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
                  <Button variant="brand" size="lg" className="px-8 font-semibold shadow-md" asChild>
                    <a
                      href="https://wa.me/6281234567890?text=Halo%20Rental%20Mobil%20Sahabat,%20saya%20ingin%20bertanya%20mengenai%20sewa%20mobil%20di%20Wonogiri"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="size-4 mr-2" />
                      Konsultasi via WhatsApp (24 Jam)
                    </a>
                  </Button>
                  <Button variant="outlineBrand" size="lg" className="px-8 font-semibold" asChild>
                    <a href="/#pesan">
                      Form Pemesanan Online
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
