import { Link } from "@tanstack/react-router";
import { Car, CheckCircle2, Star, Sparkles, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const homepageReviews = [
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
];

export function TestimonialSection() {
  return (
    <section className="bg-background py-16 lg:py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
            <Sparkles className="size-3.5 text-secondary" />
            Kepercayaan Pelanggan
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Apa Kata Mereka? (Testimonial Pelanggan)
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Feedback nyata dari pelanggan yang telah merasakan kenyamanan armada &amp; pelayanan Rental Mobil Sahabat Wonogiri.
          </p>
        </div>

        {/* 3 Review Cards Responsive Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homepageReviews.map((rev) => (
            <Card
              key={rev.id}
              className="relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-lg"
            >
              <div>
                {/* Header: Avatar + Customer Info */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-xs">
                      {rev.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-card-foreground text-sm leading-snug">
                        {rev.name}
                      </h3>
                      <span className="block text-xs text-muted-foreground">
                        {rev.origin}
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary shrink-0">
                    {rev.badge}
                  </span>
                </div>

                {/* Rented Car Badge */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
                  <Car className="size-3.5 text-secondary" />
                  <span>{rev.car}</span>
                </div>

                {/* Stars Rating */}
                <div className="mt-3 flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Quote Text */}
                <blockquote className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{rev.review}&rdquo;
                </blockquote>
              </div>

              {/* Card Footer Info */}
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

        {/* Navigation Button to /faq */}
        <div className="mt-12 text-center">
          <Button variant="outlineBrand" size="lg" className="rounded-xl px-8 font-semibold shadow-sm" asChild>
            <Link to="/faq">
              Lihat Semua FAQ &amp; Ulasan
              <ChevronRight className="ml-1.5 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
