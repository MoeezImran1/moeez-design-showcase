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
  Save
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
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

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image_url: '',
    category: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [projectsRes, messagesRes] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
      ]);

      if (projectsRes.data) setProjects(projectsRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
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

      setNewProject({ title: '', description: '', image_url: '', category: '' });
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
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gradient">Admin Panel</h1>
              <p className="text-text-muted">Manage your portfolio and messages</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary flex items-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'projects'
                ? 'bg-brand-green text-background'
                : 'bg-surface text-text-secondary hover:bg-surface-elevated'
            }`}
          >
            <BarChart3 className="inline mr-2" size={20} />
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'messages'
                ? 'bg-brand-green text-background'
                : 'bg-surface text-text-secondary hover:bg-surface-elevated'
            }`}
          >
            <Mail className="inline mr-2" size={20} />
            Messages ({messages.filter(m => m.status === 'unread').length} unread)
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Portfolio Projects</h2>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add Project
                  </button>
                </div>

                {/* Add Project Form */}
                {showAddForm && (
                  <div className="bg-card border border-border rounded-lg p-6 mb-8 animate-fade-in">
                    <h3 className="text-xl font-semibold mb-4">Add New Project</h3>
                    <form onSubmit={handleAddProject} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={newProject.title}
                          onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                          className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green"
                          required
                        />
                        <select
                          value={newProject.category}
                          onChange={(e) => setNewProject(prev => ({ ...prev, category: e.target.value }))}
                          className="bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="url"
                        placeholder="Image URL"
                        value={newProject.image_url}
                        onChange={(e) => setNewProject(prev => ({ ...prev, image_url: e.target.value }))}
                        className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green"
                        required
                      />
                      <textarea
                        placeholder="Project Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-green"
                        rows={3}
                      />
                      <div className="flex gap-4">
                        <button type="submit" className="btn-primary flex items-center gap-2">
                          <Save size={20} />
                          Add Project
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="btn-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            onClick={() => handleDeleteProject(project.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-brand-green/10 text-brand-green text-xs px-2 py-1 rounded-full">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                        {project.description && (
                          <p className="text-text-muted text-sm">{project.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`bg-card border rounded-lg p-6 transition-all ${
                        message.status === 'unread' 
                          ? 'border-brand-green bg-brand-green/5' 
                          : 'border-border'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{message.name}</h3>
                          <p className="text-text-muted text-sm">{message.email}</p>
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
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
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
                      
                      <div className="bg-surface p-4 rounded-lg">
                        <p className="text-text-secondary whitespace-pre-wrap">{message.message}</p>
                      </div>
                      
                      <div className="mt-4">
                        <a
                          href={`mailto:${message.email}?subject=Re: Your Thumbnail Design Inquiry`}
                          className="btn-primary inline-flex items-center gap-2"
                        >
                          <Mail size={16} />
                          Reply via Email
                        </a>
                      </div>
                    </div>
                  ))}
                  
                  {messages.length === 0 && (
                    <div className="text-center py-12">
                      <Mail className="mx-auto mb-4 text-text-muted" size={48} />
                      <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
                      <p className="text-text-muted">Contact messages will appear here.</p>
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

export default Admin;