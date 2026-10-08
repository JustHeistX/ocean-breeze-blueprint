import { useId, useMemo, useState } from "react";
import { Calculator, Calendar, Car as CarIcon, Clock, MessageCircle, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FleetCar } from "@/components/fleet-section";

const DRIVER_FEE_PER_DAY = 150000;
const DEFAULT_PHONE = "6281234567890";

const rupiah = (val: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);

const formatDisplayDate = (dateStr: string, timeStr: string) => {
  if (!dateStr) return "-";
  try {
    const [y, m, d] = dateStr.split("-");
    const formattedDate = `${d}/${m}/${y}`;
    return timeStr ? `${formattedDate} ${timeStr}` : formattedDate;
  } catch {
    return dateStr;
  }
};

type BookingSectionProps = {
  cars: FleetCar[];
  selectedCarId?: string;
  onSelectCarId?: (id: string) => void;
};

export function BookingSection({ cars, selectedCarId, onSelectCarId }: BookingSectionProps) {
  // Set default dates: Pickup tomorrow 08:00, Dropoff day after tomorrow 08:00
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDay = new Date(tomorrow);
  nextDay.setDate(nextDay.getDate() + 1);

  const formatDateInput = (d: Date) => d.toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState(formatDateInput(tomorrow));
  const [pickupTime, setPickupTime] = useState("08:00");
  const [dropoffDate, setDropoffDate] = useState(formatDateInput(nextDay));
  const [dropoffTime, setDropoffTime] = useState("08:00");
  const [serviceType, setServiceType] = useState<"Lepas Kunci" | "Dengan Sopir">("Lepas Kunci");
  const [internalSelectedCarId, setInternalSelectedCarId] = useState<string>(
    cars[0]?.id ?? "",
  );

  const activeCarId = selectedCarId ?? internalSelectedCarId;
  const selectedCar = cars.find((c) => c.id === activeCarId) ?? cars[0];

  const carSelectId = useId();
  const pickupDateId = useId();
  const pickupTimeId = useId();
  const dropoffDateId = useId();
  const dropoffTimeId = useId();

  const durationDays = useMemo(() => {
    if (!pickupDate || !dropoffDate) return 1;
    const start = new Date(`${pickupDate}T${pickupTime || "00:00"}`);
    const end = new Date(`${dropoffDate}T${dropoffTime || "00:00"}`);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime]);

  const carTotal = (selectedCar?.price_per_day ?? 0) * durationDays;
  const driverTotal = serviceType === "Dengan Sopir" ? DRIVER_FEE_PER_DAY * durationDays : 0;
  const grandTotal = carTotal + driverTotal;

  const handleCarChange = (id: string) => {
    setInternalSelectedCarId(id);
    onSelectCarId?.(id);
  };

  const whatsappMessage = useMemo(() => {
    if (!selectedCar) return "";
    const pickupFormatted = formatDisplayDate(pickupDate, pickupTime);
    const dropoffFormatted = formatDisplayDate(dropoffDate, dropoffTime);
    const totalFormatted = rupiah(grandTotal);

    const message = `Halo Rental Mobil Sahabat Wonogiri, saya ingin memesan kendaraan dengan detail berikut:
- Mobil: ${selectedCar.name}
- Layanan: ${serviceType}
- Tanggal Jemput: ${pickupFormatted}
- Tanggal Kembali: ${dropoffFormatted}
- Durasi: ${durationDays} Hari
- Estimasi Total: ${totalFormatted}`;

    return message;
  }, [selectedCar, serviceType, pickupDate, pickupTime, dropoffDate, dropoffTime, durationDays, grandTotal]);

  const whatsappUrl = `https://wa.me/${DEFAULT_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="pesan" className="bg-background py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
            <Calculator className="size-3.5 text-secondary" />
            Kalkulator & Form Pemesanan
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Hitung Estimasi & Pesan Langsung
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Pilih kendaraan, atur durasi sewa, dan dapatkan kalkulasi harga secara transparan. Pesan
            langsung via WhatsApp tanpa biaya tersembunyi.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-start">
          {/* Form Controls */}
          <Card className="rounded-[24px] border border-border bg-card p-5 sm:p-6 shadow-sm lg:col-span-7 lg:p-8">
            <h3 className="flex items-center gap-2 text-xl font-bold text-primary">
              <CarIcon className="size-5 text-secondary" />
              Detail Pemesanan
            </h3>

            <div className="mt-6 space-y-5 sm:space-y-6">
              {/* Select Vehicle */}
              <div>
                <Label htmlFor={carSelectId} className="text-sm font-semibold text-foreground">
                  Pilih Mobil
                </Label>
                <select
                  id={carSelectId}
                  value={activeCarId}
                  onChange={(e) => handleCarChange(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm font-medium text-foreground transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                >
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name} ({rupiah(car.price_per_day)}/hari)
                      {!car.availability_status ? " - Tidak Tersedia" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Type */}
              <div>
                <Label className="text-sm font-semibold text-foreground">Jenis Layanan</Label>
                <RadioGroup
                  value={serviceType}
                  onValueChange={(v) => setServiceType(v as "Lepas Kunci" | "Dengan Sopir")}
                  className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  <label
                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border p-4 transition-all ${
                      serviceType === "Lepas Kunci"
                        ? "border-secondary bg-accent/50 ring-1 ring-secondary"
                        : "border-border bg-background hover:bg-accent/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="Lepas Kunci" id="service-lepas-kunci" />
                      <div>
                        <span className="block text-sm font-semibold text-primary">Lepas Kunci</span>
                        <span className="block text-xs text-muted-foreground">Kemudikan sendiri</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-secondary">Termasuk</span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-xl border p-4 transition-all ${
                      serviceType === "Dengan Sopir"
                        ? "border-secondary bg-accent/50 ring-1 ring-secondary"
                        : "border-border bg-background hover:bg-accent/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="Dengan Sopir" id="service-dengan-sopir" />
                      <div>
                        <span className="block text-sm font-semibold text-primary">Dengan Sopir</span>
                        <span className="block text-xs text-muted-foreground">Sopir berpengalaman</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-secondary">
                      +{rupiah(DRIVER_FEE_PER_DAY)}/hari
                    </span>
                  </label>
                </RadioGroup>
              </div>

              {/* Pick-up Date & Time */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor={pickupDateId} className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Calendar className="size-4 text-secondary" />
                    Tanggal Penjemputan
                  </Label>
                  <input
                    type="date"
                    id={pickupDateId}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                <div>
                  <Label htmlFor={pickupTimeId} className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Clock className="size-4 text-secondary" />
                    Jam Penjemputan
                  </Label>
                  <input
                    type="time"
                    id={pickupTimeId}
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>

              {/* Drop-off Date & Time */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor={dropoffDateId} className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Calendar className="size-4 text-secondary" />
                    Tanggal Pengembalian
                  </Label>
                  <input
                    type="date"
                    id={dropoffDateId}
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>

                <div>
                  <Label htmlFor={dropoffTimeId} className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Clock className="size-4 text-secondary" />
                    Jam Pengembalian
                  </Label>
                  <input
                    type="time"
                    id={dropoffTimeId}
                    value={dropoffTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Price Summary & WhatsApp Booking */}
          <Card className="rounded-[24px] border border-border bg-primary text-primary-foreground p-6 shadow-md lg:col-span-5 lg:p-8">
            <h3 className="text-xl font-bold">Ringkasan Estimasi</h3>

            {selectedCar && (
              <div className="mt-6 space-y-4 text-sm text-primary-foreground/85">
                <div className="flex items-center justify-between border-b border-primary-foreground/15 pb-3">
                  <span className="font-medium">Mobil Dipilih</span>
                  <span className="font-bold text-primary-foreground">{selectedCar.name}</span>
                </div>

                <div className="flex items-center justify-between border-b border-primary-foreground/15 pb-3">
                  <span className="font-medium">Tarif Dasar</span>
                  <span>{rupiah(selectedCar.price_per_day)} / hari</span>
                </div>

                <div className="flex items-center justify-between border-b border-primary-foreground/15 pb-3">
                  <span className="font-medium">Layanan</span>
                  <span className="rounded-full bg-primary-foreground/15 px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                    {serviceType}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-primary-foreground/15 pb-3">
                  <span className="font-medium">Durasi Sewa</span>
                  <span className="font-bold text-primary-foreground">{durationDays} Hari</span>
                </div>

                {serviceType === "Dengan Sopir" && (
                  <div className="flex items-center justify-between border-b border-primary-foreground/15 pb-3">
                    <span className="font-medium">Biaya Sopir ({durationDays}x)</span>
                    <span>{rupiah(driverTotal)}</span>
                  </div>
                )}

                <div className="pt-2">
                  <span className="block text-xs uppercase tracking-wider text-primary-foreground/70">
                    Estimasi Total Harga
                  </span>
                  <span className="mt-1 block text-2xl font-extrabold text-white sm:text-3xl">
                    {rupiah(grandTotal)}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-8 space-y-4">
              <Button
                size="xl"
                className="w-full bg-[#25D366] font-semibold text-white transition-transform hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-[0.98]"
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-5 fill-current" />
                  <span className="hidden sm:inline">Pesan Sekarang via WhatsApp</span>
                  <span className="sm:hidden">Pesan via WhatsApp</span>
                </a>
              </Button>

              <ul className="mt-4 space-y-2 text-xs text-primary-foreground/75">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  Tanpa biaya tersembunyi & harga transparan
                </li>
                <li className="flex items-center gap-2">
                  <UserCheck className="size-4 text-emerald-400" />
                  Layanan responsif & ramah 24/7
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
