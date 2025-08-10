import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Mail,
  BarChart3,
  Upload,
  Eye,
  EyeOff,
  Save,
  Settings,
  ToggleLeft,
  ToggleRight,
  Link as LinkIcon
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  show_on_home: boolean;
  created_at: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  service: string | null;
  budget: string | null;
  message: string;
  status: string;
  created_at: string;
}

interface Stats {
  id: number;
  thumbnails_created: string;
  happy_clients: string;
  delivery_time: string;
  rating: string;
}

const EnhancedAdmin = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStats, setEditingStats] = useState(false);
  const { toast } = useToast();

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image_url: '',
    category: '',
    show_on_home: true
  });

  const [tempStats, setTempStats] = useState({
    thumbnails_created: '500+',
    happy_clients: '100+',
    delivery_time: '24h',
    rating: '5★'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [projectsRes, messagesRes, statsRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('stats').select('*').single()
      ]);

      if (projectsRes.data) setProjects(projectsRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
      if (statsRes.data) {
        setStats(statsRes.data);
        setTempStats({
          thumbnails_created: statsRes.data.thumbnails_created,
          happy_clients: statsRes.data.happy_clients,
          delivery_time: statsRes.data.delivery_time,
          rating: statsRes.data.rating
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error fetching data",
        description: "Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('projects')
        .insert([newProject]);

      if (error) throw error;

      toast({
        title: "Project added successfully!",
        description: "The new project has been added to your portfolio.",
      });

      setNewProject({ title: '', description: '', image_url: '', category: '', show_on_home: true });
      setShowAddForm(false);
      fetchData();
    } catch (error) {
      console.error('Error adding project:', error);
      toast({
        title: "Error adding project",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Project deleted",
        description: "The project has been removed from your portfolio.",
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error deleting project",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleShowOnHome = async (id: number, currentValue: boolean) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ show_on_home: !currentValue })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: `Project ${!currentValue ? 'shown on' : 'hidden from'} home page`,
        description: "Changes have been saved.",
      });

      fetchData();
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error updating project",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStats = async () => {
    try {
      const { error } = await supabase
        .from('stats')
        .update(tempStats)
        .eq('id', 1);

      if (error) throw error;

      toast({
        title: "Stats updated successfully!",
        description: "The statistics have been updated.",
      });

      setEditingStats(false);
      fetchData();
    } catch (error) {
      console.error('Error updating stats:', error);
      toast({
        title: "Error updating stats",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMarkMessageAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const categories = ['Gaming', 'Technology', 'Lifestyle', 'Education', 'Food', 'Business', 'Travel'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gradient">Admin Panel</h1>
              <p className="text-text-muted text-sm">Manage your portfolio and messages</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
              activeTab === 'projects'
                ? 'bg-brand-green text-background'
                : 'bg-surface text-text-secondary hover:bg-surface-elevated'
            }`}
          >
            <BarChart3 className="inline mr-1 sm:mr-2" size={16} />
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
              activeTab === 'messages'
                ? 'bg-brand-green text-background'
                : 'bg-surface text-text-secondary hover:bg-surface-elevated'
            }`}
          >
            <Mail className="inline mr-1 sm:mr-2" size={16} />
            Messages ({messages.filter(m => m.status === 'unread').length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
              activeTab === 'stats'
                ? 'bg-brand-green text-background'
                : 'bg-surface text-text-secondary hover:bg-surface-elevated'
            }`}
          >
            <Settings className="inline mr-1 sm:mr-2" size={16} />
            Stats
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-text-muted">Loading...</p>
          </div>
        ) : (
          <>
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold">Portfolio Projects</h2>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    <Plus size={16} />
                    Add Project
                  </button>
                </div>

                {/* Add Project Form */}
                {showAddForm && (
                  <div className="bg-card border border-border rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in">
                    <h3 className="text-lg sm:text-xl font-semibold mb-4">Add New Project</h3>
                    <form onSubmit={handleAddProject} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={newProject.title}
                          onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                          className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
                          required
                        />
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject(prev => ({ ...prev, category: e.target.value }))}
                          className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <input
                          type="url"
                          placeholder="Image URL or Link"
                          value={newProject.image_url}
                          onChange={(e) => setNewProject(prev => ({ ...prev, image_url: e.target.value }))}
                          className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
                          required
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="showOnHome"
                            checked={newProject.show_on_home}
                            onChange={(e) => setNewProject(prev => ({ ...prev, show_on_home: e.target.checked }))}
                            className="w-4 h-4 text-brand-green bg-surface border-border rounded focus:ring-brand-green"
                          />
                          <label htmlFor="showOnHome" className="text-sm text-foreground">
                            Show on home
                          </label>
                        </div>
                      </div>
                      
                      <textarea
                        placeholder="Project Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
                        rows={3}
                      />
                      
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <button type="submit" className="btn-primary flex items-center gap-2 justify-center text-sm">
                          <Save size={16} />
                          Add Project
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="btn-secondary text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-card border border-border rounded-lg overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/lovable-uploads/b63008fc-7d52-4034-b75b-7af2f3b49ea9.png';
                          }}
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            onClick={() => handleToggleShowOnHome(project.id, project.show_on_home)}
                            className={`p-2 rounded-full transition-colors ${
                              project.show_on_home 
                                ? 'bg-brand-green text-background' 
                                : 'bg-gray-500 text-white'
                            }`}
                            title={project.show_on_home ? 'Hide from home' : 'Show on home'}
                          >
                            {project.show_on_home ? <Eye size={14} /> : <EyeOff size={14} />}
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-brand-green/10 text-brand-green text-xs px-2 py-1 rounded-full">
                            {project.category}
                          </span>
                          {project.show_on_home && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Home
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground mb-1 text-sm">{project.title}</h3>
                        {project.description && (
                          <p className="text-text-muted text-xs">{project.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Tab */}
            {activeTab === 'stats' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold">Statistics</h2>
                  <button
                    onClick={() => setEditingStats(!editingStats)}
                    className="btn-primary flex items-center gap-2 text-sm"
                  >
                    <Edit size={16} />
                    {editingStats ? 'Cancel' : 'Edit Stats'}
                  </button>
                </div>

                <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                  {editingStats ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Thumbnails Created</label>
                          <input
                            type="text"
                            value={tempStats.thumbnails_created}
                            onChange={(e) => setTempStats(prev => ({ ...prev, thumbnails_created: e.target.value }))}
                            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Happy Clients</label>
                          <input
                            type="text"
                            value={tempStats.happy_clients}
                            onChange={(e) => setTempStats(prev => ({ ...prev, happy_clients: e.target.value }))}
                            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Delivery Time</label>
                          <input
                            type="text"
                            value={tempStats.delivery_time}
                            onChange={(e) => setTempStats(prev => ({ ...prev, delivery_time: e.target.value }))}
                            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Rating</label>
                          <input
                            type="text"
                            value={tempStats.rating}
                            onChange={(e) => setTempStats(prev => ({ ...prev, rating: e.target.value }))}
                            className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <button
                          onClick={handleUpdateStats}
                          className="btn-primary flex items-center gap-2 justify-center text-sm"
                        >
                          <Save size={16} />
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingStats(false)}
                          className="btn-secondary text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-brand-green mb-2">{stats?.thumbnails_created}</div>
                        <div className="text-text-muted text-xs sm:text-sm">Thumbnails Created</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-brand-green mb-2">{stats?.happy_clients}</div>
                        <div className="text-text-muted text-xs sm:text-sm">Happy Clients</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-brand-green mb-2">{stats?.delivery_time}</div>
                        <div className="text-text-muted text-xs sm:text-sm">Fast Delivery</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-brand-green mb-2">{stats?.rating}</div>
                        <div className="text-text-muted text-xs sm:text-sm">Rating</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-6">Contact Messages</h2>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`bg-card border rounded-lg p-4 sm:p-6 transition-all ${
                        message.status === 'unread' 
                          ? 'border-brand-green bg-brand-green/5' 
                          : 'border-border'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-sm sm:text-base">{message.name}</h3>
                          <p className="text-text-muted text-xs sm:text-sm">{message.email}</p>
                          <p className="text-text-muted text-xs">
                            {new Date(message.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {message.status === 'unread' && (
                            <span className="bg-brand-green text-background text-xs px-2 py-1 rounded-full">
                              New
                            </span>
                          )}
                          <button
                            onClick={() => handleMarkMessageAsRead(message.id)}
                            className="text-text-muted hover:text-brand-green transition-colors"
                          >
                            {message.status === 'read' ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      {(message.service || message.budget) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-xs sm:text-sm">
                          {message.service && (
                            <div>
                              <span className="text-text-muted">Service:</span>
                              <span className="ml-2 text-foreground">{message.service}</span>
                            </div>
                          )}
                          {message.budget && (
                            <div>
                              <span className="text-text-muted">Budget:</span>
                              <span className="ml-2 text-foreground">{message.budget}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="bg-surface p-3 sm:p-4 rounded-lg mb-4">
                        <p className="text-text-secondary whitespace-pre-wrap text-xs sm:text-sm">{message.message}</p>
                      </div>
                      
                      <div>
                        <a
                          href={`mailto:${message.email}?subject=Re: Your Thumbnail Design Inquiry`}
                          className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm"
                        >
                          <Mail size={14} />
                          Reply via Email
                        </a>
                      </div>
                    </div>
                  ))}
                  
                  {messages.length === 0 && (
                    <div className="text-center py-12">
                      <Mail className="mx-auto mb-4 text-text-muted" size={48} />
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">No messages yet</h3>
                      <p className="text-text-muted text-sm">Contact messages will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EnhancedAdmin;