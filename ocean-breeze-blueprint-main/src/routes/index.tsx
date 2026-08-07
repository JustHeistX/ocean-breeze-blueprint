import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { FleetSection } from "@/components/fleet-section";
import { BookingSection } from "@/components/booking-section";
import { AboutSection } from "@/components/about-section";
import { FavoritesProvider } from "@/components/favorites-provider";

import { getCars } from "@/lib/cars.functions";

export const Route = createFileRoute("/")({
  loader: async () => ({ cars: await getCars() }),
  errorComponent: () => (
    <div className="p-10 text-center text-muted-foreground">Gagal memuat data armada.</div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Halaman tidak ditemukan.</div>,

  head: () => ({
    meta: [
      { title: "Rental Mobil Sahabat — Sewa Mobil Terpercaya di Wonogiri" },
      {
        name: "description",
        content:
          "Sewa mobil di Wonogiri dengan harga transparan, armada terawat, lepas kunci atau dengan sopir. Proses cepat dan layanan profesional.",
      },
      { property: "og:title", content: "Rental Mobil Sahabat — Sewa Mobil Terpercaya di Wonogiri" },
      {
        property: "og:description",
        content:
          "Armada terawat, harga transparan, lepas kunci atau dengan sopir. Rental mobil profesional di Wonogiri.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { cars } = Route.useLoaderData();
  const [selectedCarId, setSelectedCarId] = useState<string | undefined>(cars[0]?.id);

  return (
    <FavoritesProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <FleetSection cars={cars} onSelectCarId={setSelectedCarId} />
          <BookingSection
            cars={cars}
            selectedCarId={selectedCarId}
            onSelectCarId={setSelectedCarId}
          />
          <AboutSection />
        </main>

        <SiteFooter />
      </div>
    </FavoritesProvider>
  );
}
