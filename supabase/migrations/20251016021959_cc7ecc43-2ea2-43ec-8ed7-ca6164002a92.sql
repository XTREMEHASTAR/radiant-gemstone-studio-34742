-- Add occasion and category support
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
  description TEXT,
  image TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS for categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
ON public.categories FOR SELECT
USING (true);

CREATE POLICY "Admins can manage categories"
ON public.categories FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Add occasion type enum
CREATE TYPE occasion_type AS ENUM (
  'wedding',
  'engagement',
  'festival',
  'daily_wear',
  'anniversary',
  'birthday',
  'party',
  'office'
);

-- Extend products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS occasion occasion_type[],
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id),
ADD COLUMN IF NOT EXISTS subcategory TEXT,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS model_3d_url TEXT,
ADD COLUMN IF NOT EXISTS sku TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS is_bestseller BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS care_instructions TEXT;

-- Add order tracking
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS tracking_number TEXT,
ADD COLUMN IF NOT EXISTS delivery_method TEXT DEFAULT 'standard',
ADD COLUMN IF NOT EXISTS estimated_delivery TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS actual_delivery TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS packaging_type TEXT DEFAULT 'standard';

-- Create authenticity certificates table
CREATE TABLE IF NOT EXISTS public.authenticity_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  order_item_id UUID REFERENCES public.order_items(id),
  certificate_number TEXT UNIQUE NOT NULL,
  certificate_url TEXT,
  nft_token_id TEXT,
  blockchain_hash TEXT,
  issued_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  metal_weight NUMERIC,
  gem_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.authenticity_certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their certificates"
ON public.authenticity_certificates FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.order_items oi
    JOIN public.orders o ON o.id = oi.order_id
    WHERE oi.id = order_item_id AND o.user_id = auth.uid()
  )
);

-- Create blog/content table for care hub
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES auth.users(id),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts"
ON public.blog_posts FOR SELECT
USING (published = true);

CREATE POLICY "Admins can manage posts"
ON public.blog_posts FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Create email campaigns table
CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  segment JSONB,
  status TEXT DEFAULT 'draft',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  recipients_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.email_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage campaigns"
ON public.email_campaigns FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Create social media posts table
CREATE TABLE IF NOT EXISTS public.social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  post_url TEXT NOT NULL,
  embed_code TEXT,
  product_ids UUID[],
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view social posts"
ON public.social_posts FOR SELECT
USING (true);

CREATE POLICY "Admins can manage social posts"
ON public.social_posts FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Create push subscriptions table
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  keys JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their subscriptions"
ON public.push_subscriptions FOR ALL
USING (auth.uid() = user_id);

-- Add loyalty tier benefits
ALTER TABLE public.loyalty_points
ADD COLUMN IF NOT EXISTS lifetime_points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

-- Create inventory tracking
CREATE TABLE IF NOT EXISTS public.inventory_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  change_type TEXT NOT NULL,
  quantity_change INTEGER NOT NULL,
  previous_stock INTEGER,
  new_stock INTEGER,
  reason TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.inventory_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view inventory history"
ON public.inventory_history FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Create update triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();