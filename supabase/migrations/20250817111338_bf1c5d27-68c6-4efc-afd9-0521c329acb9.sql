-- Harden timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Ensure RLS is enabled (no-op if already enabled)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_reviews ENABLE ROW LEVEL SECURITY;

-- Remove overly permissive policies
DROP POLICY IF EXISTS "Enable all operations for projects" ON public.projects;
DROP POLICY IF EXISTS "Enable all operations for stats" ON public.stats;

-- Restrict data changes to authenticated users only, keep public read via existing SELECT policies
CREATE POLICY "Authenticated users can manage projects"
ON public.projects
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage stats"
ON public.stats
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Add updated_at triggers where applicable
DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_stats_updated_at ON public.stats;
CREATE TRIGGER set_stats_updated_at
BEFORE UPDATE ON public.stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS set_client_reviews_updated_at ON public.client_reviews;
CREATE TRIGGER set_client_reviews_updated_at
BEFORE UPDATE ON public.client_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();