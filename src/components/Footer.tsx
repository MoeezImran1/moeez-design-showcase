import { Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <h3 className="text-3xl font-black font-poppins text-gradient mb-2">
              MOEEZ IMRAN
            </h3>
            <p className="text-text-secondary">Professional Thumbnail Designer</p>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <a 
              href="mailto:moeezdesign@gmail.com"
              className="inline-flex items-center gap-2 text-brand-green hover:text-brand-green-light transition-colors"
            >
              <Mail size={20} />
              moeezdesign@gmail.com
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-text-secondary hover:text-brand-green transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-text-secondary hover:text-brand-green transition-colors"
            >
              Portfolio
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-text-secondary hover:text-brand-green transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-border mb-8"></div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-muted text-sm mb-4 md:mb-0">
              © 2024 Moeez Imran. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={scrollToTop}
                className="bg-surface hover:bg-surface-elevated border border-border rounded-full p-3 transition-all duration-300 hover:border-brand-green group"
              >
                <ArrowUp className="text-text-secondary group-hover:text-brand-green" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
