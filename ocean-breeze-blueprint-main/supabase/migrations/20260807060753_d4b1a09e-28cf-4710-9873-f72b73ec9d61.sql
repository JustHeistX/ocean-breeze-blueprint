CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  price_per_day NUMERIC(12,2) NOT NULL,
  transmission TEXT NOT NULL CHECK (transmission IN ('manual','matic')),
  capacity INTEGER NOT NULL,
  fuel_type TEXT NOT NULL,
  availability_status BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.cars TO anon;
GRANT SELECT ON public.cars TO authenticated;
GRANT ALL ON public.cars TO service_role;

ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cars are viewable by everyone" ON public.cars FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.cars (name, image_url, price_per_day, transmission, capacity, fuel_type, availability_status) VALUES
('Toyota Avanza', 'car-avanza', 350000, 'manual', 7, 'Bensin', true),
('Toyota Innova Zenix', 'car-innova', 600000, 'matic', 7, 'Hybrid', true),
('Toyota Alphard', 'hero-car', 1500000, 'matic', 7, 'Bensin', true),
('Honda Brio', 'car-hatchback', 300000, 'matic', 5, 'Bensin', false);