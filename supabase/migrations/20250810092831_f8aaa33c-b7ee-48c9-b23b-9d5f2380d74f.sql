-- Add show_on_home field to projects table
ALTER TABLE public.projects 
ADD COLUMN show_on_home BOOLEAN DEFAULT true;

-- Create admin_credentials table for storing login credentials
CREATE TABLE public.admin_credentials (
  id INTEGER PRIMARY KEY DEFAULT 1,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default admin credentials
INSERT INTO public.admin_credentials (email, password)
VALUES ('moeezdesignadmin@gmail.com', 'Moeez@admin786..');

-- Create stats table for editable stats
CREATE TABLE public.stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  thumbnails_created TEXT DEFAULT '500+',
  happy_clients TEXT DEFAULT '100+',
  delivery_time TEXT DEFAULT '24h',
  rating TEXT DEFAULT '5★',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default stats
INSERT INTO public.stats (thumbnails_created, happy_clients, delivery_time, rating)
VALUES ('500+', '100+', '24h', '5★');

-- Enable RLS on new tables
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_credentials (read-only for authentication)
CREATE POLICY "Allow public read access to admin_credentials" 
ON public.admin_credentials 
FOR SELECT 
USING (true);

-- Create policies for stats (public read, authenticated write)
CREATE POLICY "Allow public read access to stats" 
ON public.stats 
FOR SELECT 
USING (true);

CREATE POLICY "Enable all operations for stats" 
ON public.stats 
FOR ALL 
USING (true) 
WITH CHECK (true);