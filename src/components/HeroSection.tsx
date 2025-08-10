import { ArrowDown, Play } from 'lucide-react';
import StatsSection from './StatsSection';

const HeroSection = () => {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-glow rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-glow rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-glow rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in-up">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6" style={{ fontFamily: 'cursive' }}>
            <span className="text-gradient">MOEEZ</span>
            <br />
            <span className="text-foreground">IMRAN</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-3xl font-light text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional <span className="text-brand-green font-semibold">Thumbnail Designer</span>
            <br />
            Creating eye-catching designs that boost your content's performance
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={scrollToPortfolio}
              className="btn-primary group flex items-center gap-2"
            >
              <Play size={20} />
              View My Work
              <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary"
            >
              Get In Touch
            </button>
          </div>

          {/* Stats */}
          <StatsSection />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-brand-green" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;