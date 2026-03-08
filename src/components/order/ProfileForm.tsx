import { motion } from 'framer-motion';
import { User, Briefcase, FileText, Mail, Phone, Globe, Lock, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
  updateData: (updates: Partial<PortfolioData>) => void;
}

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

const ProfileForm = ({ data, updateData }: Props) => {
  const addSocialLink = () => {
    updateData({
      socialLinks: [...data.socialLinks, { platform: '', url: '' }],
    });
  };

  const removeSocialLink = (index: number) => {
    updateData({
      socialLinks: data.socialLinks.filter((_, i) => i !== index),
    });
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const updated = [...data.socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    updateData({ socialLinks: updated });
  };

  return (
    <div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Your Profile</h2>
      <p className="text-muted-foreground mb-8">
        Fill in your details. Only <span className="text-primary font-medium">Name</span> is required — everything else can be added later from the admin panel.
      </p>

      <div className="space-y-5">
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
          placeholder="UI/UX Designer & Creative Director"
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
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all min-h-[100px] resize-none placeholder:text-muted-foreground/40"
              placeholder="Tell the world about yourself..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            icon={Mail}
            label="Email"
            value={data.email}
            onChange={(v) => updateData({ email: v })}
            placeholder="john@example.com"
            type="email"
          />
          <InputField
            icon={Phone}
            label="Phone"
            value={data.phone}
            onChange={(v) => updateData({ phone: v })}
            placeholder="+880 1234 567890"
          />
        </div>

        {/* Social Links */}
        <div>
          <label className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
            Social Links <span className="text-muted-foreground/50 text-[10px]">Optional</span>
          </label>
          <div className="space-y-3">
            {data.socialLinks.map((link, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2"
              >
                <input
                  value={link.platform}
                  onChange={(e) => updateSocialLink(i, 'platform', e.target.value)}
                  className="w-28 sm:w-32 px-3 py-2.5 rounded-lg border border-border bg-card/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground/40"
                  placeholder="Platform"
                />
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    value={link.url}
                    onChange={(e) => updateSocialLink(i, 'url', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card/80 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground/40"
                    placeholder="https://..."
                  />
                </div>
                <button
                  onClick={() => removeSocialLink(i)}
                  className="p-2.5 rounded-lg border border-border hover:border-destructive/50 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={addSocialLink} className="mt-3 gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" /> Add Link
          </Button>
        </div>

        {/* Admin Password */}
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

export default ProfileForm;
