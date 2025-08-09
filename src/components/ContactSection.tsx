import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageCircle, Send, Clock, CheckCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const services = [
    'YouTube Thumbnails',
    'Gaming Thumbnails', 
    'Tech Review Thumbnails',
    'Educational Content Thumbnails',
    'Lifestyle Thumbnails',
    'Custom Package'
  ];

  const budgetRanges = [
    '$5 - $15 (Basic)',
    '$15 - $30 (Standard)',
    '$30 - $50 (Premium)',
    '$50+ (Custom)'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
        }]);

      if (error) throw error;

      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        service: '',
        budget: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-surface">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Let's <span className="text-gradient">Work Together</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Ready to create thumbnails that drive results? Get in touch and let's discuss your project!
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mt-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-slide-in">
              <h3 className="text-2xl font-bold mb-8">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-green/10 p-3 rounded-lg">
                    <Mail className="text-brand-green" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email Me</h4>
                    <p className="text-text-secondary">moeezdesigner@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-green/10 p-3 rounded-lg">
                    <Clock className="text-brand-green" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Response Time</h4>
                    <p className="text-text-secondary">Within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-green/10 p-3 rounded-lg">
                    <CheckCircle className="text-brand-green" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">What I Provide</h4>
                    <ul className="text-text-secondary space-y-1">
                      <li>• Custom thumbnail designs</li>
                      <li>• High-resolution files (1920x1080)</li>
                      <li>• Source files included</li>
                      <li>• Unlimited revisions</li>
                      <li>• Fast 24-hour delivery</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-foreground font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-foreground font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="service" className="block text-foreground font-medium mb-2">
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-colors"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-foreground font-medium mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-colors"
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-foreground font-medium mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent transition-colors resize-none"
                    placeholder="Tell me about your project, content type, style preferences, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;