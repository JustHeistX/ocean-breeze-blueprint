import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type Car = Database["public"]["Tables"]["cars"]["Row"] & {
  category?: "Family/MPV" | "City Car" | "SUV/Premium";
};

export const defaultCars: Car[] = [
  {
    id: "car-avanza-1",
    name: "Toyota Avanza Grand",
    category: "Family/MPV",
    image_url: "car-avanza",
    price_per_day: 350000,
    transmission: "Manual",
    capacity: 7,
    fuel_type: "Bensin",
    availability_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "car-innova-reborn-2",
    name: "Toyota Innova Reborn",
    category: "Family/MPV",
    image_url: "car-innova",
    price_per_day: 500000,
    transmission: "Otomatis",
    capacity: 7,
    fuel_type: "Diesel",
    availability_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "car-innova-zenix-3",
    name: "Toyota Innova Zenix",
    category: "Family/MPV",
    image_url: "car-innova",
    price_per_day: 650000,
    transmission: "Hybrid / CVT",
    capacity: 7,
    fuel_type: "Hybrid",
    availability_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "car-xenia-4",
    name: "Daihatsu Xenia All New",
    category: "Family/MPV",
    image_url: "car-avanza",
    price_per_day: 350000,
    transmission: "Manual",
    capacity: 7,
    fuel_type: "Bensin",
    availability_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "car-ertiga-5",
    name: "Suzuki Ertiga Hybrid",
    category: "Family/MPV",
    image_url: "car-avanza",
    price_per_day: 350000,
    transmission: "Otomatis",
    capacity: 7,
    fuel_type: "Bensin",
    availability_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "car-brio-6",
    name: "Honda Brio RS",
    category: "City Car",
    image_url: "car-hatchback",
    price_per_day: 300000,
    transmission: "Otomatis / CVT",
    capacity: 5,
    fuel_type: "Bensin",
    availability_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "car-agya-7",
    name: "Toyota Agya GR Sport",
    category: "City Car",
    image_url: "car-hatchback",
    price_per_day: 280000,
    transmission: "Manual",
    capacity: 5,
    fuel_type: "Bensin",
    availability_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "car-ayla-8",
    name: "Daihatsu Ayla New",
    category: "City Car",
    image_url: "car-hatchback",
    price_per_day: 270000,
    transmission: "Manual",
    capacity: 5,
    fuel_type: "Bensin",
    availability_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "car-fortuner-9",
    name: "Toyota Fortuner VRZ",
    category: "SUV/Premium",
    image_url: "hero-car",
    price_per_day: 1100000,
    transmission: "Otomatis 4x4",
    capacity: 7,
    fuel_type: "Diesel",
    availability_status: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "car-pajero-10",
    name: "Mitsubishi Pajero Sport",
    category: "SUV/Premium",
    image_url: "hero-car",
    price_per_day: 1200000,
    transmission: "Otomatis 4x4",
    capacity: 7,
    fuel_type: "Diesel",
    availability_status: true,
    created_at: new Date().toISOString(),
  },
];

export const getCars = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const supabaseUrl = process.env["SUPABASE_URL"];
    const supabaseKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (supabaseUrl && supabaseKey) {
      const supabasePublic = createClient<Database>(
        supabaseUrl,
        supabaseKey,
        { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
      );

      const { data } = await supabasePublic
        .from("cars")
        .select("id, name, image_url, price_per_day, transmission, capacity, fuel_type, availability_status")
        .order("price_per_day", { ascending: true });

      if (data && data.length >= 10) {
        return data as Car[];
      }
    }
  } catch {
    // fallback
  }
  return defaultCars;
});
