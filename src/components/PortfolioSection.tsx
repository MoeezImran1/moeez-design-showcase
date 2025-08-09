import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
}

const PortfolioSection = () => {
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
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              My <span className="text-gradient">Portfolio</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-video bg-surface-elevated rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            My <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            A showcase of eye-catching thumbnails that drive engagement and boost click-through rates
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mt-8"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
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

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
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
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-bold mb-4">Ready to boost your content?</h3>
          <p className="text-text-secondary mb-8">Let's create thumbnails that get clicks and grow your audience</p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;