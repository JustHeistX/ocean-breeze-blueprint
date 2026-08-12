import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import carInnova from "@/assets/car-innova.jpg";
import carAvanza from "@/assets/car-avanza.jpg";
import carHatchback from "@/assets/car-hatchback.jpg";

const slides = [
  { src: heroCar, name: "Toyota Alphard", alt: "Toyota Alphard putih untuk sewa mobil mewah di Wonogiri" },
  { src: carInnova, name: "Innova Zenix", alt: "Innova Zenix silver siap disewa di Wonogiri" },
  { src: carAvanza, name: "Toyota Avanza", alt: "Toyota Avanza abu-abu untuk rental keluarga di Wonogiri" },
  { src: carHatchback, name: "City Hatchback", alt: "Mobil hatchback kota putih untuk rental harian di Wonogiri" },
];

const INTERVAL = 4500;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStart.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStart.current === null) return;
        const end = e.changedTouches[0]?.clientX;
        if (end === undefined) return;
        const delta = end - touchStart.current;
        if (Math.abs(delta) > 40) go(index + (delta < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className="pointer-events-none absolute inset-x-6 bottom-6 h-40 rounded-[2.5rem] bg-accent blur-2xl" />

      <div
        className="relative overflow-hidden rounded-[1.75rem] bg-background"
        role="region"
        aria-roledescription="carousel"
        aria-label="Armada Rental Mobil Sahabat"
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={slide.name} className="w-full shrink-0 aspect-[4/3] sm:aspect-[16/10]">
              <img
                src={slide.src}
                alt={slide.alt}
                width={1408}
                height={1008}
                loading={i === 0 ? "eager" : "lazy"}
                aria-hidden={i !== index}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <span className="absolute left-5 top-5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-accent-foreground shadow-[var(--shadow-soft)]">
          {slides[index]?.name}
        </span>

        <button
          type="button"
          aria-label="Mobil sebelumnya"
          onClick={() => go(index - 1)}
          className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-primary shadow-[var(--shadow-soft)] backdrop-blur transition-colors hover:bg-secondary hover:text-secondary-foreground"
        >
          <ChevronLeft className="size-5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Mobil berikutnya"
          onClick={() => go(index + 1)}
          className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-primary shadow-[var(--shadow-soft)] backdrop-blur transition-colors hover:bg-secondary hover:text-secondary-foreground"
        >
          <ChevronRight className="size-5" strokeWidth={1.75} />
        </button>

        <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.name}
              type="button"
              aria-label={`Tampilkan ${slide.name}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-primary" : "w-2 bg-primary/25 hover:bg-secondary/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
