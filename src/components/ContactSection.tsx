import { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, Star, CheckCircle, Clock, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import ScrollReveal from './ui/ScrollReveal';
import SpotlightCard from './ui/SpotlightCard';
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon."
    });
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const benefits = [{
    icon: CheckCircle,
    text: "500+ Successful Designs",
    color: "text-green-400"
  }, {
    icon: Clock,
    text: "24h Fast Delivery",
    color: "text-blue-400"
  }, {
    icon: Users,
    text: "100+ Happy Clients",
    color: "text-purple-400"
  }, {
    icon: Award,
    text: "5★ Quality Rating",
    color: "text-yellow-400"
  }];
  return <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Let's Work Together
            </h2>
          </ScrollReveal>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto leading-relaxed">
            Ready to create stunning thumbnails that will boost your content's performance? 
            Let's discuss your project and bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Contact Info - 2 columns */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <SpotlightCard spotlightColor="rgba(82, 39, 255, 0.15)">
                  <div className="flex items-center gap-4 p-4 sm:p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">Email</p>
                      <p className="text-muted-foreground text-sm">moeezdesign@gmail.com</p>
                    </div>
                  </div>
                </SpotlightCard>
                
                <SpotlightCard spotlightColor="rgba(82, 39, 255, 0.15)">
                  <div className="flex items-center gap-4 p-4 sm:p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">Phone</p>
                      <p className="text-muted-foreground text-sm">+92 3278610021</p>
                    </div>
                  </div>
                </SpotlightCard>
                
                <SpotlightCard spotlightColor="rgba(82, 39, 255, 0.15)">
                  <div className="flex items-center gap-4 p-4 sm:p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MessageCircle className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">Discord</p>
                      <p className="text-muted-foreground text-sm">Available for quick chats</p>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </div>

            {/* Why Choose Me */}
            <SpotlightCard spotlightColor="rgba(82, 39, 255, 0.1)">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-4 sm:p-6 rounded-xl border border-border/50 backdrop-blur-sm">
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">Why Choose Me?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                  {benefits.map((benefit, index) => <div key={index} className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-background/50">
                        <benefit.icon className={`${benefit.color} flex-shrink-0`} size={16} />
                      </div>
                      <span className="text-muted-foreground text-sm sm:text-base">{benefit.text}</span>
                    </div>)}
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Contact Form - 3 columns */}
          <div className="lg:col-span-3">
            <SpotlightCard spotlightColor="rgba(82, 39, 255, 0.2)">
              <div className="bg-card/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-border/50 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" className="bg-background/50 border-border/50 focus:border-primary transition-colors" />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className="bg-background/50 border-border/50 focus:border-primary transition-colors" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Project Details
                    </label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell me about your project, style preferences, and any specific requirements..." rows={6} className="bg-background/50 border-border/50 focus:border-primary resize-none transition-colors" />
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group">
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </Button>
                </form>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;