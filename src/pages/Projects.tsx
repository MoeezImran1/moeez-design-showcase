import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink, ArrowLeft, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  show_on_home: boolean;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-text-muted">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gradient">All Projects</h1>
              <p className="text-text-muted">Complete portfolio collection</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-brand-green text-background'
                  : 'bg-surface text-text-secondary hover:bg-surface-elevated hover:text-foreground'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group cursor-pointer animate-scale-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="relative overflow-hidden rounded-lg bg-card border border-border hover:border-brand-green transition-all duration-300 thumbnail-hover">
                {/* Thumbnail Image */}
                <div className="aspect-video relative">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/lovable-uploads/b63008fc-7d52-4034-b75b-7af2f3b49ea9.png';
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <div>
                      {project.description && (
                        <p className="text-text-muted text-sm">{project.description}</p>
                      )}
                    </div>
                    <div className="bg-brand-green/20 backdrop-blur-sm p-2 rounded-full">
                      <ExternalLink className="text-brand-green" size={16} />
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-background/80 backdrop-blur-sm text-brand-green text-xs font-medium px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Show on Home Badge */}
                {project.show_on_home && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-brand-green/80 backdrop-blur-sm text-background text-xs font-medium px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="mx-auto mb-4 text-text-muted" size={48} />
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-text-muted">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;