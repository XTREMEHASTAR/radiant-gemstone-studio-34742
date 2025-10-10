-- Live metal prices table
CREATE TABLE IF NOT EXISTS public.metal_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metal_type TEXT NOT NULL,
  price_per_gram NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(metal_type, currency)
);

ALTER TABLE public.metal_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view metal prices"
  ON public.metal_prices FOR SELECT
  USING (true);

-- Insert initial prices (these will be updated via edge function)
INSERT INTO public.metal_prices (metal_type, price_per_gram, currency) VALUES
  ('gold-24k', 6500, 'INR'),
  ('gold-22k', 6000, 'INR'),
  ('gold-18k', 4900, 'INR'),
  ('silver', 80, 'INR'),
  ('platinum', 3200, 'INR')
ON CONFLICT (metal_type, currency) DO NOTHING;