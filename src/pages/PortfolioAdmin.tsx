import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Briefcase, Code, Mail, Image, Save, Plus, Trash2, Eye,
  MessageSquare, Send, Bot, Sparkles, Palette, Type, MapPin, Phone,
  Link2, ArrowLeft, Undo2, X
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { getPortfolio, updatePortfolio as persistPortfolio, type StoredPortfolio } from '@/lib/portfolioStore';
import ReactMarkdown from 'react-markdown';

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

const presetColors = [
  '#00e5ff', '#6366f1', '#f43f5e', '#22c55e', '#f59e0b', '#ec4899',
  '#8b5cf6', '#14b8a6', '#ff6b35', '#3b82f6', '#a855f7', '#ef4444',
];

const PortfolioAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notFound, setNotFound] = useState(false);

  const [portfolio, setPortfolio] = useState<PortfolioState | null>(null);
  const [history, setHistory] = useState<PortfolioState[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load portfolio by ID
  useEffect(() => {
    if (!id) { setNotFound(true); return; }
    const stored = getPortfolio(id);
    if (!stored) { setNotFound(true); return; }
    setPortfolio({
      name: stored.name,
      title: stored.title,
      bio: stored.bio,
      email: stored.email,
      phone: stored.phone,
      location: '',
      primaryColor: stored.primaryColor || '#00e5ff',
      font: (stored.font as any) || 'Inter',
      skills: [
        { id: 1, name: 'React', level: 90 },
        { id: 2, name: 'TypeScript', level: 85 },
        { id: 3, name: 'Node.js', level: 80 },
      ],
      experiences: [
        { id: 1, company: 'Tech Corp', role: 'Senior Developer', duration: '2021 - Present', description: 'Led frontend development' },
      ],
      projects: [
        { id: 1, title: 'Portfolio Site', description: 'Personal portfolio', image: '/placeholder.svg', visible: true },
      ],
      socialLinks: stored.socialLinks || [],
    });
  }, [id]);

  // Auto-save to main portfolio store
  useEffect(() => {
    if (!portfolio || !id) return;
    persistPortfolio(id, {
      name: portfolio.name,
      title: portfolio.title,
      bio: portfolio.bio,
      email: portfolio.email,
      phone: portfolio.phone,
      primaryColor: portfolio.primaryColor,
      font: portfolio.font,
      socialLinks: portfolio.socialLinks,
    });
  }, [portfolio, id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const pushHistory = useCallback(() => {
    if (!portfolio) return;
    setHistory(prev => [...prev.slice(-20), { ...portfolio }]);
  }, [portfolio]);

  const handleUndo = () => {
    if (history.length === 0) return;
    setHistory(h => h.slice(0, -1));
    setPortfolio(history[history.length - 1]);
    toast({ title: 'Undone!', description: 'Reverted to previous state.' });
  };

  const updatePortfolio = (updates: Partial<PortfolioState>) => {
    pushHistory();
    setPortfolio(prev => prev ? { ...prev, ...updates } : prev);
  };

  // AI Chat
  const sendMessage = async () => {
    if (!chatInput.trim() || isStreaming || !portfolio) return;
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

      if (resp.status === 429) {
        toast({ title: 'Rate Limited', description: 'Too many requests. Please wait a moment.', variant: 'destructive' });
        throw new Error('Rate limited');
      }
      if (resp.status === 402) {
        toast({ title: 'Credits Exhausted', description: 'Please add funds to continue.', variant: 'destructive' });
        throw new Error('Credits exhausted');
      }
      if (!resp.ok || !resp.body) throw new Error('Failed to connect');

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

        let idx: number;
        while ((idx = buffer.indexOf('\n')) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
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

      // Parse JSON updates
      const jsonMatch = assistantContent.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          if (parsed.action === 'update_portfolio' && parsed.updates) {
            pushHistory();
            setPortfolio(prev => {
              if (!prev) return prev;
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
            toast({ title: '✨ Changes Applied!', description: 'Portfolio updated by AI.' });
          }
        } catch {}
      }
    } catch (e: any) {
      if (e.message !== 'Rate limited' && e.message !== 'Credits exhausted') {
        setMessages(prev => [...prev, { role: 'assistant', content: `❌ Error: ${e.message}` }]);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-4">404</h1>
          <p className="text-gray-500 mb-8">Portfolio not found</p>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">Go Home</button>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060910] text-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0e18]/90 backdrop-blur-lg border-b border-white/10 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(`/p/${id}`)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Site
            </button>
            <div className="w-px h-5 bg-white/10" />
            <h1 className="text-sm font-semibold">{portfolio.name}'s Admin</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleUndo} disabled={history.length === 0} className="gap-1.5 border-white/20 text-white hover:bg-white/10">
              <Undo2 className="w-4 h-4" /> Undo
            </Button>
            <Button size="sm" className="gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-black" onClick={() => toast({ title: 'Saved!', description: 'All changes saved.' })}>
              <Save className="w-4 h-4" /> Save
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1 h-auto p-1.5 bg-white/5 border border-white/10 rounded-xl">
            <TabsTrigger value="profile" className="gap-1.5 py-2.5 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-white/10">
              <User className="w-3.5 h-3.5" /> Profile
            </TabsTrigger>
            <TabsTrigger value="experience" className="gap-1.5 py-2.5 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-white/10">
              <Briefcase className="w-3.5 h-3.5" /> Experience
            </TabsTrigger>
            <TabsTrigger value="skills" className="gap-1.5 py-2.5 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-white/10">
              <Code className="w-3.5 h-3.5" /> Skills
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-1.5 py-2.5 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-white/10">
              <Image className="w-3.5 h-3.5" /> Projects
            </TabsTrigger>
            <TabsTrigger value="design" className="gap-1.5 py-2.5 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-white/10">
              <Palette className="w-3.5 h-3.5" /> Design
            </TabsTrigger>
            <TabsTrigger value="links" className="gap-1.5 py-2.5 text-xs text-gray-400 data-[state=active]:text-white data-[state=active]:bg-white/10">
              <Link2 className="w-3.5 h-3.5" /> Links
            </TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-gray-400">Update your basic profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-300">Full Name</label>
                    <Input value={portfolio.name} onChange={e => updatePortfolio({ name: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-300">Job Title</label>
                    <Input value={portfolio.title} onChange={e => updatePortfolio({ title: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-300">Bio</label>
                  <Textarea value={portfolio.bio} onChange={e => updatePortfolio({ bio: e.target.value })} rows={4} className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-300">Email</label>
                    <Input value={portfolio.email} onChange={e => updatePortfolio({ email: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-300">Phone</label>
                    <Input value={portfolio.phone} onChange={e => updatePortfolio({ phone: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience */}
          <TabsContent value="experience">
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Work Experience</CardTitle>
                  <CardDescription className="text-gray-400">Add your professional experience</CardDescription>
                </div>
                <Button onClick={() => updatePortfolio({ experiences: [...portfolio.experiences, { id: Date.now(), company: '', role: '', duration: '', description: '' }] })} size="sm" className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-black">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolio.experiences.map((exp, index) => (
                  <div key={exp.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-500">Experience {index + 1}</span>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300" onClick={() => updatePortfolio({ experiences: portfolio.experiences.filter(e => e.id !== exp.id) })}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input value={exp.company} onChange={e => { const u = portfolio.experiences.map(ex => ex.id === exp.id ? { ...ex, company: e.target.value } : ex); updatePortfolio({ experiences: u }); }} placeholder="Company" className="bg-white/5 border-white/10 text-white" />
                      <Input value={exp.role} onChange={e => { const u = portfolio.experiences.map(ex => ex.id === exp.id ? { ...ex, role: e.target.value } : ex); updatePortfolio({ experiences: u }); }} placeholder="Role" className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input value={exp.duration} onChange={e => { const u = portfolio.experiences.map(ex => ex.id === exp.id ? { ...ex, duration: e.target.value } : ex); updatePortfolio({ experiences: u }); }} placeholder="Duration" className="bg-white/5 border-white/10 text-white" />
                      <Input value={exp.description} onChange={e => { const u = portfolio.experiences.map(ex => ex.id === exp.id ? { ...ex, description: e.target.value } : ex); updatePortfolio({ experiences: u }); }} placeholder="Description" className="bg-white/5 border-white/10 text-white" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills">
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Skills & Expertise</CardTitle>
                  <CardDescription className="text-gray-400">Showcase your abilities</CardDescription>
                </div>
                <Button onClick={() => updatePortfolio({ skills: [...portfolio.skills, { id: Date.now(), name: '', level: 50 }] })} size="sm" className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-black">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {portfolio.skills.map(skill => (
                  <div key={skill.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <Input className="flex-1 bg-white/5 border-white/10 text-white" value={skill.name} onChange={e => { const u = portfolio.skills.map(s => s.id === skill.id ? { ...s, name: e.target.value } : s); updatePortfolio({ skills: u }); }} placeholder="Skill name" />
                    <Input className="w-20 bg-white/5 border-white/10 text-white" type="number" min="0" max="100" value={skill.level} onChange={e => { const u = portfolio.skills.map(s => s.id === skill.id ? { ...s, level: parseInt(e.target.value) || 0 } : s); updatePortfolio({ skills: u }); }} />
                    <Button variant="ghost" size="sm" className="text-red-400" onClick={() => updatePortfolio({ skills: portfolio.skills.filter(s => s.id !== skill.id) })}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects */}
          <TabsContent value="projects">
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Projects</CardTitle>
                  <CardDescription className="text-gray-400">Showcase your work</CardDescription>
                </div>
                <Button onClick={() => updatePortfolio({ projects: [...portfolio.projects, { id: Date.now(), title: '', description: '', image: '/placeholder.svg', visible: true }] })} size="sm" className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-black">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {portfolio.projects.map((proj, index) => (
                  <div key={proj.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-500">Project {index + 1}</span>
                      <div className="flex items-center gap-2">
                        <Switch checked={proj.visible} onCheckedChange={checked => { const u = portfolio.projects.map(p => p.id === proj.id ? { ...p, visible: checked } : p); updatePortfolio({ projects: u }); }} />
                        <Button variant="ghost" size="sm" className="text-red-400" onClick={() => updatePortfolio({ projects: portfolio.projects.filter(p => p.id !== proj.id) })}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Input value={proj.title} onChange={e => { const u = portfolio.projects.map(p => p.id === proj.id ? { ...p, title: e.target.value } : p); updatePortfolio({ projects: u }); }} placeholder="Project title" className="bg-white/5 border-white/10 text-white" />
                    <Textarea value={proj.description} onChange={e => { const u = portfolio.projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p); updatePortfolio({ projects: u }); }} placeholder="Description" rows={2} className="bg-white/5 border-white/10 text-white" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design */}
          <TabsContent value="design">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">Design Settings</CardTitle>
                <CardDescription className="text-gray-400">Customize your portfolio's look</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block text-gray-300">Brand Color</label>
                  <div className="flex flex-wrap gap-2">
                    {presetColors.map(color => (
                      <button key={color} className={`w-9 h-9 rounded-full border-2 transition-all ${portfolio.primaryColor === color ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`} style={{ backgroundColor: color }} onClick={() => updatePortfolio({ primaryColor: color })} />
                    ))}
                    <Input type="color" value={portfolio.primaryColor} onChange={e => updatePortfolio({ primaryColor: e.target.value })} className="w-9 h-9 p-0 border-0 rounded-full cursor-pointer" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-3 block text-gray-300">Font Family</label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Inter', 'Playfair Display', 'JetBrains Mono'] as const).map(f => (
                      <button key={f} className={`p-3 rounded-xl border text-sm transition-all ${portfolio.font === f ? 'border-cyan-500 bg-cyan-500/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`} style={{ fontFamily: f }} onClick={() => updatePortfolio({ font: f })}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Links */}
          <TabsContent value="links">
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Social Links</CardTitle>
                  <CardDescription className="text-gray-400">Connect your online presence</CardDescription>
                </div>
                <Button onClick={() => updatePortfolio({ socialLinks: [...portfolio.socialLinks, { platform: '', url: '' }] })} size="sm" className="gap-2 bg-cyan-500 hover:bg-cyan-600 text-black">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {portfolio.socialLinks.map((link, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <Input className="w-32 bg-white/5 border-white/10 text-white" value={link.platform} onChange={e => { const u = [...portfolio.socialLinks]; u[i] = { ...u[i], platform: e.target.value }; updatePortfolio({ socialLinks: u }); }} placeholder="Platform" />
                    <Input className="flex-1 bg-white/5 border-white/10 text-white" value={link.url} onChange={e => { const u = [...portfolio.socialLinks]; u[i] = { ...u[i], url: e.target.value }; updatePortfolio({ socialLinks: u }); }} placeholder="URL" />
                    <Button variant="ghost" size="sm" className="text-red-400" onClick={() => updatePortfolio({ socialLinks: portfolio.socialLinks.filter((_, idx) => idx !== i) })}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* AI Chat FAB */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-cyan-500 text-black shadow-xl shadow-cyan-500/30 flex items-center justify-center hover:bg-cyan-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setChatOpen(!chatOpen)}
      >
        {chatOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </motion.button>

      {/* AI Chat Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-[#0c1120] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ height: '500px' }}
          >
            {/* Chat Header */}
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2 bg-white/5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white">AI Portfolio Editor</span>
              <span className="ml-auto text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">Powered by AI</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm mt-8">
                  <Bot className="w-10 h-10 mx-auto mb-3 text-gray-600" />
                  <p className="font-medium text-gray-400">Hi {portfolio.name}! 👋</p>
                  <p className="mt-1 text-xs">Tell me what to change. E.g. "Make my theme purple" or "Add a new skill: Figma"</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${msg.role === 'user' ? 'bg-cyan-500 text-black' : 'bg-white/10 text-gray-200'}`}>
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-sm prose-invert max-w-none [&_pre]:bg-white/5 [&_code]:text-cyan-300">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    ) : msg.content}
                  </div>
                </div>
              ))}
              {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex gap-1.5 px-3 py-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-white/5">
              <form
                onSubmit={e => { e.preventDefault(); sendMessage(); }}
                className="flex gap-2"
              >
                <Input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask AI to edit your portfolio..."
                  className="flex-1 bg-white/5 border-white/10 text-white text-sm"
                  disabled={isStreaming}
                />
                <Button type="submit" size="sm" disabled={isStreaming || !chatInput.trim()} className="bg-cyan-500 hover:bg-cyan-400 text-black">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioAdmin;
