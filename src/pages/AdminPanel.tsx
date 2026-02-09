import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Mail, 
  Image, 
  Save,
  Plus,
  Trash2,
  Eye
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const AdminPanel = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with 5+ years of experience building web applications.',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    location: 'New York, USA',
    avatar: '/placeholder.svg',
  });

  const [experiences, setExperiences] = useState([
    { id: 1, company: 'Tech Corp', role: 'Senior Developer', duration: '2021 - Present', description: 'Led frontend development team' },
    { id: 2, company: 'StartUp Inc', role: 'Full Stack Developer', duration: '2019 - 2021', description: 'Built scalable web applications' },
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: 'React', level: 90 },
    { id: 2, name: 'TypeScript', level: 85 },
    { id: 3, name: 'Node.js', level: 80 },
    { id: 4, name: 'Python', level: 75 },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, title: 'E-commerce Platform', description: 'Full-stack e-commerce solution', image: '/placeholder.svg', visible: true },
    { id: 2, title: 'Task Management App', description: 'Collaborative project management tool', image: '/placeholder.svg', visible: true },
  ]);

  const addExperience = () => {
    setExperiences([...experiences, { id: Date.now(), company: '', role: '', duration: '', description: '' }]);
  };

  const addSkill = () => {
    setSkills([...skills, { id: Date.now(), name: '', level: 50 }]);
  };

  const addProject = () => {
    setProjects([...projects, { id: Date.now(), title: '', description: '', image: '/placeholder.svg', visible: true }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
              Admin <span className="text-gradient">Panel</span>
            </h1>
            <p className="text-muted-foreground">
              Manage your portfolio content with ease
            </p>
          </motion.div>

          {/* Preview Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 flex gap-4"
          >
            <Button variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview Portfolio
            </Button>
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Save All Changes
            </Button>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 h-auto p-2 bg-card">
                <TabsTrigger value="profile" className="gap-2 py-3">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="gap-2 py-3">
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="gap-2 py-3">
                  <Code className="w-4 h-4" />
                  <span className="hidden sm:inline">Skills</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="gap-2 py-3">
                  <Image className="w-4 h-4" />
                  <span className="hidden sm:inline">Projects</span>
                </TabsTrigger>
                <TabsTrigger value="contact" className="gap-2 py-3">
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Contact</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card className="border-border/50 bg-card/50">
                  <CardHeader>
                    <CardTitle className="font-heading">Personal Information</CardTitle>
                    <CardDescription>Update your basic profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-2xl bg-muted flex items-center justify-center overflow-hidden">
                          <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <Button variant="outline" size="sm" className="mt-3 w-full">
                          Change Photo
                        </Button>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Full Name</label>
                            <Input 
                              value={profile.name} 
                              onChange={(e) => setProfile({...profile, name: e.target.value})}
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Job Title</label>
                            <Input 
                              value={profile.title} 
                              onChange={(e) => setProfile({...profile, title: e.target.value})}
                              placeholder="e.g. Full Stack Developer"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Bio</label>
                          <Textarea 
                            value={profile.bio} 
                            onChange={(e) => setProfile({...profile, bio: e.target.value})}
                            placeholder="Tell us about yourself"
                            rows={4}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Location</label>
                            <Input 
                              value={profile.location} 
                              onChange={(e) => setProfile({...profile, location: e.target.value})}
                              placeholder="City, Country"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience">
                <Card className="border-border/50 bg-card/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="font-heading">Work Experience</CardTitle>
                      <CardDescription>Add your professional experience</CardDescription>
                    </div>
                    <Button onClick={addExperience} size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {experiences.map((exp, index) => (
                      <div key={exp.id} className="p-4 rounded-xl bg-muted/50 border border-border/30 space-y-4">
                        <div className="flex justify-between items-start">
                          <span className="text-sm text-muted-foreground">Experience {index + 1}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => setExperiences(experiences.filter(e => e.id !== exp.id))}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input 
                            value={exp.company} 
                            onChange={(e) => {
                              const updated = experiences.map(ex => 
                                ex.id === exp.id ? {...ex, company: e.target.value} : ex
                              );
                              setExperiences(updated);
                            }}
                            placeholder="Company Name"
                          />
                          <Input 
                            value={exp.role} 
                            onChange={(e) => {
                              const updated = experiences.map(ex => 
                                ex.id === exp.id ? {...ex, role: e.target.value} : ex
                              );
                              setExperiences(updated);
                            }}
                            placeholder="Your Role"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input 
                            value={exp.duration} 
                            onChange={(e) => {
                              const updated = experiences.map(ex => 
                                ex.id === exp.id ? {...ex, duration: e.target.value} : ex
                              );
                              setExperiences(updated);
                            }}
                            placeholder="e.g. 2021 - Present"
                          />
                          <Input 
                            value={exp.description} 
                            onChange={(e) => {
                              const updated = experiences.map(ex => 
                                ex.id === exp.id ? {...ex, description: e.target.value} : ex
                              );
                              setExperiences(updated);
                            }}
                            placeholder="Brief description"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills">
                <Card className="border-border/50 bg-card/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="font-heading">Skills & Expertise</CardTitle>
                      <CardDescription>Showcase your technical abilities</CardDescription>
                    </div>
                    <Button onClick={addSkill} size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/30">
                        <div className="flex-1">
                          <Input 
                            value={skill.name} 
                            onChange={(e) => {
                              const updated = skills.map(s => 
                                s.id === skill.id ? {...s, name: e.target.value} : s
                              );
                              setSkills(updated);
                            }}
                            placeholder="Skill name"
                          />
                        </div>
                        <div className="w-32">
                          <Input 
                            type="number"
                            min="0"
                            max="100"
                            value={skill.level} 
                            onChange={(e) => {
                              const updated = skills.map(s => 
                                s.id === skill.id ? {...s, level: parseInt(e.target.value) || 0} : s
                              );
                              setSkills(updated);
                            }}
                            placeholder="Level %"
                          />
                        </div>
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => setSkills(skills.filter(s => s.id !== skill.id))}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects">
                <Card className="border-border/50 bg-card/50">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="font-heading">Projects & Work</CardTitle>
                      <CardDescription>Showcase your best work</CardDescription>
                    </div>
                    <Button onClick={addProject} size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="p-4 rounded-xl bg-muted/50 border border-border/30 space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-24 h-24 rounded-xl bg-muted overflow-hidden flex-shrink-0">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <Input 
                              value={project.title} 
                              onChange={(e) => {
                                const updated = projects.map(p => 
                                  p.id === project.id ? {...p, title: e.target.value} : p
                                );
                                setProjects(updated);
                              }}
                              placeholder="Project Title"
                            />
                            <Textarea 
                              value={project.description} 
                              onChange={(e) => {
                                const updated = projects.map(p => 
                                  p.id === project.id ? {...p, description: e.target.value} : p
                                );
                                setProjects(updated);
                              }}
                              placeholder="Project Description"
                              rows={2}
                            />
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Visible</span>
                              <Switch 
                                checked={project.visible}
                                onCheckedChange={(checked) => {
                                  const updated = projects.map(p => 
                                    p.id === project.id ? {...p, visible: checked} : p
                                  );
                                  setProjects(updated);
                                }}
                              />
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => setProjects(projects.filter(p => p.id !== project.id))}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact">
                <Card className="border-border/50 bg-card/50">
                  <CardHeader>
                    <CardTitle className="font-heading">Contact Information</CardTitle>
                    <CardDescription>How people can reach you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input 
                          type="email"
                          value={profile.email} 
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Phone</label>
                        <Input 
                          value={profile.phone} 
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          placeholder="+1 234 567 890"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPanel;
