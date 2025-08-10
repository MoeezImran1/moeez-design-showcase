import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  thumbnails_created: string;
  happy_clients: string;
  delivery_time: string;
  rating: string;
}

const StatsSection = () => {
  const [stats, setStats] = useState<Stats>({
    thumbnails_created: '500+',
    happy_clients: '100+',
    delivery_time: '24h',
    rating: '5★'
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .single();

      if (error) throw error;
      if (data) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
      <div className="text-center animate-scale-in" style={{ animationDelay: '0.5s' }}>
        <div className="text-3xl md:text-4xl font-bold text-brand-green mb-2">{stats.thumbnails_created}</div>
        <div className="text-text-muted text-sm">Thumbnails Created</div>
      </div>
      <div className="text-center animate-scale-in" style={{ animationDelay: '0.7s' }}>
        <div className="text-3xl md:text-4xl font-bold text-brand-green mb-2">{stats.happy_clients}</div>
        <div className="text-text-muted text-sm">Happy Clients</div>
      </div>
      <div className="text-center animate-scale-in" style={{ animationDelay: '0.9s' }}>
        <div className="text-3xl md:text-4xl font-bold text-brand-green mb-2">{stats.delivery_time}</div>
        <div className="text-text-muted text-sm">Fast Delivery</div>
      </div>
      <div className="text-center animate-scale-in" style={{ animationDelay: '1.1s' }}>
        <div className="text-3xl md:text-4xl font-bold text-brand-green mb-2">{stats.rating}</div>
        <div className="text-text-muted text-sm">Rating</div>
      </div>
    </div>
  );
};

export default StatsSection;