import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Briefcase, Code, Mail, Image, Save, Plus, Trash2, Eye,
  MessageSquare, Send, Bot, Sparkles, Palette, Type, MapPin, Phone,
  Link2, ArrowLeft, Undo2, ChevronDown, ChevronUp, X
} from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';

// Portfolio data shape
interface PortfolioState {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  primaryColor: string;
  font: 'Inter' | 'Playfair Display' | 'JetBrains Mono';
  skills: { id: number; name: string; level: number }[];
  experiences: { id: number; company: string; role: string; duration: string; description: string }[];
  projects: { id: number; title: string; description: string; image: string; visible: boolean }[];
  socialLinks: { platform: string; url: string }[];
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const STORAGE_KEY = 'portaura_admin_portfolio';

const defaultPortfolio: PortfolioState = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  bio: 'Passionate developer with 5+ years of experience building web applications.',
  email: 'john@example.com',
  phone: '+1 234 567 890',
  location: 'New York, USA',
  primaryColor: '#00e5ff',
  font: 'Inter',
  skills: [
    { id: 1, name: 'React', level: 90 },
    { id: 2, name: 'TypeScript', level: 85 },
    { id: 3, name: 'Node.js', level: 80 },
  ],
  experiences: [
    { id: 1, company: 'Tech Corp', role: 'Senior Developer', duration: '2021 - Present', description: 'Led frontend development team' },
  ],
  projects: [
    { id: 1, title: 'E-commerce Platform', description: 'Full-stack e-commerce solution', image: '/placeholder.svg', visible: true },
  ],
  socialLinks: [
    { platform: 'GitHub', url: '' },
    { platform: 'LinkedIn', url: '' },
    { platform: 'Twitter', url: '' },
  ],
};

const presetColors = [
  '#00e5ff', '#6366f1', '#f43f5e', '#22c55e', '#f59e0b', '#ec4899',
  '#8b5cf6', '#14b8a6', '#ff6b35', '#3b82f6', '#a855f7', '#ef4444',
];

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [portfolio, setPortfolio] = useState<PortfolioState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultPortfolio;
    } catch {
      return defaultPortfolio;
    }
  });
  const [history, setHistory] = useState<PortfolioState[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Auto-save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
    } catch {}
  }, [portfolio]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const pushHistory = useCallback(() => {
    setHistory(prev => [...prev.slice(-20), { ...portfolio }]);
  }, [portfolio]);

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setPortfolio(prev);
    toast({ title: 'Undone!', description: 'Reverted to previous state.' });
  };

  const updatePortfolio = (updates: Partial<PortfolioState>) => {
    pushHistory();
    setPortfolio(prev => ({ ...prev, ...updates }));
  };

  // AI Chat
  const sendMessage = async () => {
    if (!chatInput.trim() || isStreaming) return;
    const userMsg: ChatMessage = { role: 'user', content: chatInput.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setChatInput('');
    setIsStreaming(true);

    let assistantContent = '';

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: allMessages.map(m => ({ role: m.role, content: m.content })),
            portfolioData: portfolio,
          }),
        }
      );

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || `Error ${resp.status}`);
      }

      if (!resp.body) throw new Error('No response body');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      const updateAssistant = (content: string) => {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return prev.map((m, i) => i === prev.length - 1 ? { ...m, content } : m);
          }
          return [...prev, { role: 'assistant', content }];
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;
          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              updateAssistant(assistantContent);
            }
          } catch {}
        }
      }

      // Parse JSON updates from assistant response
      const jsonMatch = assistantContent.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          if (parsed.action === 'update_portfolio' && parsed.updates) {
            pushHistory();
            setPortfolio(prev => {
              const next = { ...prev };
              const u = parsed.updates;
              if (u.name !== undefined) next.name = u.name;
              if (u.title !== undefined) next.title = u.title;
              if (u.bio !== undefined) next.bio = u.bio;
              if (u.email !== undefined) next.email = u.email;
              if (u.phone !== undefined) next.phone = u.phone;
              if (u.location !== undefined) next.location = u.location;
              if (u.primaryColor !== undefined) next.primaryColor = u.primaryColor;
              if (u.font !== undefined) next.font = u.font;
              if (u.skills !== undefined) next.skills = u.skills.map((s: any, i: number) => ({ id: Date.now() + i, name: s.name || s, level: s.level || 80 }));
              if (u.experiences !== undefined) next.experiences = u.experiences.map((e: any, i: number) => ({ id: Date.now() + i, ...e }));
              if (u.projects !== undefined) next.projects = u.projects.map((p: any, i: number) => ({ id: Date.now() + i, image: '/placeholder.svg', visible: true, ...p }));
              if (u.socialLinks !== undefined) next.socialLinks = u.socialLinks;
              return next;
            });
            toast({ title: '✨ Changes Applied!', description: 'Your portfolio has been updated by AI.' });
          }
        } catch {}
      }
    } catch (e: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `❌ Error: ${e.message}` }]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container-custom max-w-5xl">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-1">
                Admin <span className="text-gradient">Dashboard</span>
              </h1>
              <p className="text-muted-foreground text-sm">Manage your portfolio — manually or with AI</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleUndo} disabled={history.length === 0} className="gap-1.5">
                <Undo2 className="w-4 h-4" /> Undo
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5" onClick={() => navigate('/p/preview')}>
                <Eye className="w-4 h-4" /> Preview
              </Button>
              <Button size="sm" className="gap-1.5" onClick={() => toast({ title: 'Saved!', description: 'All changes saved.' })}>
                <Save className="w-4 h-4" /> Save
              </Button>
            </div>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1 h-auto p-1.5 bg-card">
              <TabsTrigger value="profile" className="gap-1.5 py-2.5 text-xs">
                <User className="w-3.5 h-3.5" /> Profile
              </TabsTrigger>
              <TabsTrigger value="experience" className="gap-1.5 py-2.5 text-xs">
                <Briefcase className="w-3.5 h-3.5" /> Experience
              </TabsTrigger>
              <TabsTrigger value="skills" className="gap-1.5 py-2.5 text-xs">
                <Code className="w-3.5 h-3.5" /> Skills
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-1.5 py-2.5 text-xs">
                <Image className="w-3.5 h-3.5" /> Projects
              </TabsTrigger>
              <TabsTrigger value="design" className="gap-1.5 py-2.5 text-xs">
                <Palette className="w-3.5 h-3.5" /> Design
              </TabsTrigger>
              <TabsTrigger value="links" className="gap-1.5 py-2.5 text-xs">
                <Link2 className="w-3.5 h-3.5" /> Links
              </TabsTrigger>
            </TabsList>

            {/* Profile */}
            <TabsContent value="profile">
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="font-heading">Personal Information</CardTitle>
                  <CardDescription>Update your basic profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name</label>
                      <Input value={portfolio.name} onChange={e => updatePortfolio({ name: e.target.value })} placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Job Title</label>
                      <Input value={portfolio.title} onChange={e => updatePortfolio({ title: e.target.value })} placeholder="e.g. Full Stack Developer" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bio</label>
                    <Textarea value={portfolio.bio} onChange={e => updatePortfolio({ bio: e.target.value })} placeholder="Tell us about yourself" rows={4} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Location</label>
                      <Input value={portfolio.location} onChange={e => updatePortfolio({ location: e.target.value })} placeholder="City, Country" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input value={portfolio.email} onChange={e => updatePortfolio({ email: e.target.value })} placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input value={portfolio.phone} onChange={e => updatePortfolio({ phone: e.target.value })} placeholder="+1 234 567 890" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience */}
            <TabsContent value="experience">
              <Card className="border-border/50 bg-card/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-heading">Work Experience</CardTitle>
                    <CardDescription>Add your professional experience</CardDescription>
                  </div>
                  <Button onClick={() => updatePortfolio({ experiences: [...portfolio.experiences, { id: Date.now(), company: '', role: '', duration: '', description: '' }] })} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Add
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolio.experiences.map((exp, index) => (
                    <div key={exp.id} className="p-4 rounded-xl bg-muted/50 border border-border/30 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-muted-foreground">Experience {index + 1}</span>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => updatePortfolio({ experiences: portfolio.experiences.filter(e => e.id !== exp.id) })}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input value={exp.company} onChange={e => { const u = portfolio.experiences.map(ex => ex.id === exp.id ? { ...ex, company: e.target.value } : ex); updatePortfolio({ experiences: u }); }} placeholder="Company Name" />
                        <Input value={exp.role} onChange={e => { const u = portfolio.experiences.map(ex => ex.id === exp.id ? { ...ex, role: e.target.value } : ex); updatePortfolio({ experiences: u }); }} placeholder="Your Role" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input value={exp.duration} onChange={e => { const u = portfolio.experiences.map(ex => ex.id === exp.id ? { ...ex, duration: e.target.value } : ex); updatePortfolio({ experiences: u }); }} placeholder="e.g. 2021 - Present" />
                        <Input value={exp.description} onChange={e => { const u = portfolio.experiences.map(ex => ex.id === exp.id ? { ...ex, description: e.target.value } : ex); updatePortfolio({ experiences: u }); }} placeholder="Brief description" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills */}
            <TabsContent value="skills">
              <Card className="border-border/50 bg-card/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-heading">Skills & Expertise</CardTitle>
                    <CardDescription>Showcase your abilities</CardDescription>
                  </div>
                  <Button onClick={() => updatePortfolio({ skills: [...portfolio.skills, { id: Date.now(), name: '', level: 50 }] })} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Add
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {portfolio.skills.map(skill => (
                    <div key={skill.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/30">
                      <Input className="flex-1" value={skill.name} onChange={e => { const u = portfolio.skills.map(s => s.id === skill.id ? { ...s, name: e.target.value } : s); updatePortfolio({ skills: u }); }} placeholder="Skill name" />
                      <Input className="w-20" type="number" min="0" max="100" value={skill.level} onChange={e => { const u = portfolio.skills.map(s => s.id === skill.id ? { ...s, level: parseInt(e.target.value) || 0 } : s); updatePortfolio({ skills: u }); }} />
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden hidden sm:block">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${skill.level}%` }} />
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => updatePortfolio({ skills: portfolio.skills.filter(s => s.id !== skill.id) })}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Projects */}
            <TabsContent value="projects">
              <Card className="border-border/50 bg-card/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-heading">Projects</CardTitle>
                    <CardDescription>Showcase your best work</CardDescription>
                  </div>
                  <Button onClick={() => updatePortfolio({ projects: [...portfolio.projects, { id: Date.now(), title: '', description: '', image: '/placeholder.svg', visible: true }] })} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Add
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolio.projects.map(project => (
                    <div key={project.id} className="p-4 rounded-xl bg-muted/50 border border-border/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <Input className="flex-1 mr-3" value={project.title} onChange={e => { const u = portfolio.projects.map(p => p.id === project.id ? { ...p, title: e.target.value } : p); updatePortfolio({ projects: u }); }} placeholder="Project Title" />
                        <div className="flex items-center gap-2">
                          <Switch checked={project.visible} onCheckedChange={checked => { const u = portfolio.projects.map(p => p.id === project.id ? { ...p, visible: checked } : p); updatePortfolio({ projects: u }); }} />
                          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => updatePortfolio({ projects: portfolio.projects.filter(p => p.id !== project.id) })}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea value={project.description} onChange={e => { const u = portfolio.projects.map(p => p.id === project.id ? { ...p, description: e.target.value } : p); updatePortfolio({ projects: u }); }} placeholder="Project Description" rows={2} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Design */}
            <TabsContent value="design">
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="font-heading">Design & Theme</CardTitle>
                  <CardDescription>Customize your portfolio's look</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Brand Color */}
                  <div>
                    <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                      <Palette className="w-4 h-4 text-primary" /> Brand Color
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {presetColors.map(color => (
                        <button
                          key={color}
                          onClick={() => updatePortfolio({ primaryColor: color })}
                          className="relative w-9 h-9 rounded-lg border-2 transition-all hover:scale-110"
                          style={{
                            backgroundColor: color,
                            borderColor: portfolio.primaryColor === color ? 'white' : 'transparent',
                            boxShadow: portfolio.primaryColor === color ? `0 0 16px ${color}60` : 'none',
                          }}
                        />
                      ))}
                      <input type="color" value={portfolio.primaryColor} onChange={e => updatePortfolio({ primaryColor: e.target.value })} className="w-9 h-9 rounded-lg cursor-pointer border-0 bg-transparent" />
                    </div>
                  </div>

                  {/* Font */}
                  <div>
                    <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                      <Type className="w-4 h-4 text-primary" /> Typography
                    </label>
                    <div className="flex gap-3">
                      {([
                        { id: 'Inter' as const, name: 'Inter', style: 'font-sans' },
                        { id: 'Playfair Display' as const, name: 'Playfair', style: 'font-serif' },
                        { id: 'JetBrains Mono' as const, name: 'Mono', style: 'font-mono' },
                      ]).map(font => (
                        <button
                          key={font.id}
                          onClick={() => updatePortfolio({ font: font.id })}
                          className={`flex-1 text-center rounded-xl border-2 py-3 px-2 transition-all ${
                            portfolio.font === font.id ? 'border-primary bg-primary/5' : 'border-border/50 bg-card/50 hover:border-primary/30'
                          }`}
                        >
                          <p className={`text-sm font-bold ${font.style}`}>{font.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Social Links */}
            <TabsContent value="links">
              <Card className="border-border/50 bg-card/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-heading">Social Links</CardTitle>
                    <CardDescription>Connect your social profiles</CardDescription>
                  </div>
                  <Button onClick={() => updatePortfolio({ socialLinks: [...portfolio.socialLinks, { platform: '', url: '' }] })} size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Add
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {portfolio.socialLinks.map((link, i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <Input className="w-32" value={link.platform} onChange={e => { const u = [...portfolio.socialLinks]; u[i] = { ...u[i], platform: e.target.value }; updatePortfolio({ socialLinks: u }); }} placeholder="Platform" />
                      <Input className="flex-1" value={link.url} onChange={e => { const u = [...portfolio.socialLinks]; u[i] = { ...u[i], url: e.target.value }; updatePortfolio({ socialLinks: u }); }} placeholder="https://..." />
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => updatePortfolio({ socialLinks: portfolio.socialLinks.filter((_, idx) => idx !== i) })}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* AI Chatbot FAB */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Chat Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-120px)] rounded-2xl border-2 border-border/50 bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">PortAura AI</p>
                  <p className="text-[10px] text-muted-foreground">Edit your portfolio with chat</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Hi! I'm your AI assistant</p>
                  <p className="text-xs text-muted-foreground mb-4">Tell me what to change on your portfolio</p>
                  <div className="space-y-2">
                    {[
                      'Change my brand color to purple',
                      'Update my bio to sound more professional',
                      'Add React and Node.js to my skills',
                    ].map(suggestion => (
                      <button
                        key={suggestion}
                        onClick={() => { setChatInput(suggestion); chatInputRef.current?.focus(); }}
                        className="block w-full text-left text-xs px-3 py-2 rounded-lg border border-border/30 bg-muted/20 text-muted-foreground hover:bg-primary/5 hover:text-foreground hover:border-primary/30 transition-all"
                      >
                        "{suggestion}"
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-muted/50 text-foreground border border-border/30 rounded-bl-md'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_pre]:bg-background/50 [&_pre]:rounded-lg [&_pre]:p-2 [&_code]:text-xs">
                        <ReactMarkdown>{msg.content.replace(/```json\n[\s\S]*?\n```/g, '✅ *Changes applied*')}</ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 border border-border/30 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-border/30 bg-muted/20">
              <div className="flex gap-2">
                <input
                  ref={chatInputRef}
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Tell AI what to change..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border/50 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground/40"
                  disabled={isStreaming}
                />
                <Button size="sm" onClick={sendMessage} disabled={!chatInput.trim() || isStreaming} className="px-3">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default AdminPanel;
