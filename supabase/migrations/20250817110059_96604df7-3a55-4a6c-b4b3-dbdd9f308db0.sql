-- SECURITY FIX: Remove the vulnerable admin_credentials table entirely
-- This table was publicly readable and stored plain text passwords
DROP TABLE IF EXISTS public.admin_credentials;

-- Create the client_reviews table for the admin panel
CREATE TABLE public.client_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  review_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.client_reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to reviews (for displaying on website)
CREATE POLICY "Public can view client reviews" 
ON public.client_reviews 
FOR SELECT 
USING (true);

-- Only authenticated users can manage reviews (admin operations)
CREATE POLICY "Authenticated users can manage reviews" 
ON public.client_reviews 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_client_reviews_updated_at
  BEFORE UPDATE ON public.client_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();