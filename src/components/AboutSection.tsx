import { useState } from 'react';
import { CheckCircle, Zap, Target, Award } from 'lucide-react';

const AboutSection = () => {
  const [aboutContent] = useState("I'm Moeez Imran, a professional thumbnail designer specializing in creating eye-catching, clickable thumbnails that boost your content's performance. With years of experience in visual design and a deep understanding of what makes viewers click, I help content creators, YouTubers, and businesses stand out in the crowded digital landscape.");

  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Get your thumbnails within 24 hours"
    },
    {
      icon: Target,
      title: "High CTR Focus",
      description: "Designs optimized for maximum click-through rates"
    },
    {
      icon: CheckCircle,
      title: "Unlimited Revisions",
      description: "Perfect your thumbnail until you're 100% satisfied"
    },
    {
      icon: Award,
      title: "Professional Quality",
      description: "Industry-standard designs that stand out"
    }
  ];

  return (
    <section id="about" className="py-20 bg-surface">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-slide-in">
              <p className="text-lg text-text-secondary leading-relaxed mb-8">
                {aboutContent}
              </p>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground mb-4">Why Choose Me?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-brand-green flex-shrink-0" size={20} />
                    <span className="text-text-secondary">5+ years of design experience</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-brand-green flex-shrink-0" size={20} />
                    <span className="text-text-secondary">Specialized in YouTube thumbnails</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-brand-green flex-shrink-0" size={20} />
                    <span className="text-text-secondary">Understanding of platform algorithms</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="text-brand-green flex-shrink-0" size={20} />
                    <span className="text-text-secondary">Data-driven design approach</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="bg-card p-6 rounded-lg border border-border hover:border-brand-green transition-all duration-300 hover:shadow-glow animate-scale-in"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="bg-brand-green/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="text-brand-green" size={24} />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-text-muted text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;