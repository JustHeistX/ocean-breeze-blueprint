import { Link } from "@tanstack/react-router";
import { HelpCircle, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const DEFAULT_PHONE = "6281234567890";

const faqData = [
  {
    id: "faq-1",
    question: "Apakah bisa sewa lepas kunci?",
    answer:
      "Bisa, dengan melengkapi syarat dokumen seperti KTP, KK, dan jaminan sepeda motor asli.",
  },
  {
    id: "faq-2",
    question: "Apakah harga sudah termasuk bensin dan driver?",
    answer:
      "Kami menyediakan pilihan paket lepas kunci (mobil saja) atau paket lengkap dengan sopir profesional. Biaya bensin menyesuaikan rute perjalanan Anda.",
  },
  {
    id: "faq-3",
    question: "Bagaimana sistem pembayaran dan pemesanan?",
    answer:
      "Pemesanan dapat dilakukan langsung via WhatsApp. Pembayaran DP bisa ditransfer dan pelunasan saat serah terima kendaraan.",
  },
];

export function FaqSection() {
  const whatsappUrl = `https://wa.me/${DEFAULT_PHONE}?text=${encodeURIComponent(
    "Halo Rental Mobil Sahabat, saya ingin bertanya lebih lanjut mengenai layanan sewa mobil di Wonogiri."
  )}`;

  return (
    <section id="faq" className="scroll-mt-20 bg-secondary/5 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
            <HelpCircle className="size-3.5 text-secondary" />
            FAQ & Informasi
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Berikut adalah beberapa pertanyaan umum mengenai syarat, harga, dan proses sewa mobil di
            Rental Mobil Sahabat Wonogiri.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="mt-10">
          <Accordion type="single" collapsible defaultValue="faq-1" className="space-y-4">
            {faqData.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="rounded-2xl border border-border bg-card px-6 py-1 shadow-sm transition-all duration-200 hover:border-secondary/40 hover:shadow-md"
              >
                <AccordionTrigger className="text-base font-bold text-primary hover:no-underline py-4 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground pt-1 pb-5 border-t border-border/40 mt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-center shadow-xs sm:p-8">
          <h3 className="text-lg font-bold text-primary sm:text-xl">
            Masih Punya Pertanyaan Lain?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Tim layanan pelanggan kami siap melayani Anda 24 jam melalui konsultasi langsung via WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
            <Button
              variant="brand"
              size="lg"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold shadow-sm"
              asChild
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4 fill-current" />
                Tanya via WhatsApp
              </a>
            </Button>
            <Button
              variant="outlineBrand"
              size="lg"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold"
              asChild
            >
              <Link to="/faq">
                Lihat Selengkapnya FAQ &amp; Ulasan
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
