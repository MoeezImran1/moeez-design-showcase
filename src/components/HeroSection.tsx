import { ArrowDown, Play } from 'lucide-react';
import StatsSection from './StatsSection';
import DotGrid from './ui/DotGrid';

const HeroSection = () => {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Interactive Dot Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <DotGrid
          dotSize={8}
          gap={25}
          baseColor="#5227FF"
          activeColor="#5227FF"
          proximity={100}
          shockRadius={200}
          shockStrength={3}
          resistance={500}
          returnDuration={1.2}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="animate-fade-in-up max-w-5xl mx-auto">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 sm:mb-6 leading-tight" style={{ fontFamily: 'cursive' }}>
            <span className="text-gradient block">MOEEZ</span>
            <span className="text-foreground block">IMRAN</span>
          </h1>

          {/* Subtitle */}
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-light text-muted-foreground mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            <p className="mb-2">Professional <span className="text-primary font-semibold">Thumbnail Designer</span></p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">Creating eye-catching designs that boost your content's performance</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4">
            <button 
              onClick={scrollToPortfolio}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Play size={18} />
              View My Work
              <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          {/* Stats */}
          <div className="px-4">
            <StatsSection />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-primary" size={20} />
      </div>
    </section>
  );
};

export default HeroSection;