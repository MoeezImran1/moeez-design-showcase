-- Create projects table for portfolio thumbnails
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'thumbnail',
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Projects are viewable by everyone" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create policies for authenticated admin access
CREATE POLICY "Admin can insert projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can update projects" 
ON public.projects 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can delete projects" 
ON public.projects 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create about_content table for editable about section
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- Create policies for about content
CREATE POLICY "About content is viewable by everyone" 
ON public.about_content 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can update about content" 
ON public.about_content 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin can insert about content" 
ON public.about_content 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Create contact_messages table for contact form submissions
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for contact messages
CREATE POLICY "Admin can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can insert contact messages" 
ON public.contact_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at
  BEFORE UPDATE ON public.about_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default about content
INSERT INTO public.about_content (content) VALUES (
  'I''m Moeez Imran, a professional thumbnail designer specializing in creating eye-catching, clickable thumbnails that boost your content''s performance. With years of experience in visual design and a deep understanding of what makes viewers click, I help content creators, YouTubers, and businesses stand out in the crowded digital landscape.'
);

-- Insert sample projects
INSERT INTO public.projects (title, description, image_url, featured, order_index) VALUES
('YouTube Gaming Thumbnail', 'High-energy gaming thumbnail with bold text and vibrant colors', '/lovable-uploads/b63008fc-7d52-4034-b75b-7af2f3b49ea9.png', true, 1),
('Tech Review Thumbnail', 'Clean and professional tech product showcase thumbnail', '/lovable-uploads/b63008fc-7d52-4034-b75b-7af2f3b49ea9.png', true, 2),
('Educational Content Thumbnail', 'Engaging educational thumbnail with clear messaging', '/lovable-uploads/b63008fc-7d52-4034-b75b-7af2f3b49ea9.png', true, 3),
('Business Vlog Thumbnail', 'Professional business content thumbnail design', '/lovable-uploads/b63008fc-7d52-4034-b75b-7af2f3b49ea9.png', false, 4),
('Travel Content Thumbnail', 'Inspiring travel thumbnail with scenic visuals', '/lovable-uploads/b63008fc-7d52-4034-b75b-7af2f3b49ea9.png', false, 5),
('Lifestyle Thumbnail', 'Trendy lifestyle content thumbnail design', '/lovable-uploads/b63008fc-7d52-4034-b75b-7af2f3b49ea9.png', false, 6);