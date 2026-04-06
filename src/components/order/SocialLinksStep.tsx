import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Dribbble, Globe, Plus, Trash2, User, Briefcase, FileText, Mail, Phone, Lock, Link2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
}

const platformIcons: Record<string, any> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Instagram: Instagram,
  Dribbble: Dribbble,
};

const platformPlaceholders: Record<string, string> = {
  GitHub: 'https://github.com/username',
  LinkedIn: 'https://linkedin.com/in/username',
  Twitter: 'https://twitter.com/username',
  Instagram: 'https://instagram.com/username',
  Dribbble: 'https://dribbble.com/username',
};

const InputField = ({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
}: {
  icon: any;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
}) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1.5">
      {label}
      {required && <span className="text-primary text-[10px]">Required</span>}
      {!required && <span className="text-muted-foreground/50 text-[10px]">Optional</span>}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all placeholder:text-muted-foreground/40"
        placeholder={placeholder}
      />
    </div>
  </div>
);

const SocialLinksStep = ({ data, updateData }: Props) => {
  const filledCount = data.socialLinks.filter((l) => l.url.trim()).length;

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const updated = [...data.socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ socialLinks: updated });
  };

  const addSocialLink = () => {
    updateData({
      socialLinks: [...data.socialLinks, { platform: '', url: '' }],
    });
  };

  const removeSocialLink = (index: number) => {
    if (data.socialLinks.length <= 1) return;
    updateData({
      socialLinks: data.socialLinks.filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      {/* Hero Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4"
        >
          <Link2 className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Step 1 of 2</span>
        </motion.div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
          Paste Your <span className="text-primary">Social Links</span>
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Drop your social media links and we'll build your stunning portfolio. Add at least one link to continue.
        </p>
      </div>

      {/* Social Links - Primary Section */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-heading font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Your Social Profiles
          </h3>
          <span className="text-xs text-primary font-medium bg-primary/10 px-2.5 py-1 rounded-full">
            {filledCount} added
          </span>
        </div>

        <div className="space-y-3">
          {data.socialLinks.map((link, i) => {
            const PlatformIcon = platformIcons[link.platform] || Globe;
            const placeholder = platformPlaceholders[link.platform] || 'https://...';
            const isFilled = link.url.trim().length > 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex gap-2 items-center p-3 rounded-xl border transition-all duration-300 ${
                  isFilled
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-border/50 bg-card/50'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isFilled ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground'
                }`}>
                  <PlatformIcon className="w-4 h-4" />
                </div>

                {platformIcons[link.platform] ? (
                  <span className="text-xs font-medium text-muted-foreground w-16 flex-shrink-0">{link.platform}</span>
                ) : (
                  <input
                    value={link.platform}
                    onChange={(e) => updateSocialLink(i, 'platform', e.target.value)}
                    className="w-20 px-2 py-1.5 rounded-lg border border-border/50 bg-transparent text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/40"
                    placeholder="Platform"
                  />
                )}

                <input
                  value={link.url}
                  onChange={(e) => updateSocialLink(i, 'url', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-border/50 bg-transparent text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 placeholder:text-muted-foreground/40"
                  placeholder={placeholder}
                />

                {isFilled && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}

                <button
                  onClick={() => removeSocialLink(i)}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

        <Button variant="outline" size="sm" onClick={addSocialLink} className="mt-3 gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" /> Add More
        </Button>
      </div>

      {/* Basic Info - Secondary */}
      <div className="space-y-4">
        <h3 className="text-sm font-heading font-semibold text-muted-foreground">Basic Info</h3>

        <InputField
          icon={User}
          label="Full Name"
          value={data.name}
          onChange={(v) => updateData({ name: v })}
          placeholder="John Doe"
          required
        />

        <InputField
          icon={Briefcase}
          label="Professional Title"
          value={data.title}
          onChange={(v) => updateData({ title: v })}
          placeholder="UI/UX Designer & Developer"
        />

        <div>
          <label className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1.5">
            Bio <span className="text-muted-foreground/50 text-[10px]">Optional</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <textarea
              value={data.bio}
              onChange={(e) => updateData({ bio: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all min-h-[80px] resize-none placeholder:text-muted-foreground/40"
              placeholder="Tell the world about yourself..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField icon={Mail} label="Email" value={data.email} onChange={(v) => updateData({ email: v })} placeholder="john@example.com" type="email" />
          <InputField icon={Phone} label="Phone" value={data.phone} onChange={(v) => updateData({ phone: v })} placeholder="+880 1234 567890" />
        </div>

        <div className="pt-2 border-t border-border/30">
          <InputField
            icon={Lock}
            label="Admin Secret Password"
            value={data.adminPassword}
            onChange={(v) => updateData({ adminPassword: v })}
            placeholder="Your admin panel access password"
            type="password"
          />
          <p className="text-[10px] text-muted-foreground/60 mt-1.5 ml-1">
            This password lets you access the admin panel to edit your portfolio later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksStep;
