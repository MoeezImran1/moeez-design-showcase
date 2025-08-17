-- Remove the overly permissive policy that allows public read access
DROP POLICY IF EXISTS "Enable all operations for contact messages" ON public.contact_messages;

-- Create secure policies for contact messages
-- Allow authenticated users (admins) to read and manage contact messages
CREATE POLICY "Authenticated users can manage contact messages" 
ON public.contact_messages 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- The existing "Allow public insert to contact_messages" policy remains unchanged
-- This ensures the contact form continues to work for public users