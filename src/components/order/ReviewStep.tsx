import { motion } from 'framer-motion';
import { Palette, User, Type, Globe, Lock, Check, AlertCircle } from 'lucide-react';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
}

const themeNames: Record<string, string> = {
  'cyber-bento': 'The Aura Pro',
  'minimalist-zen': 'The Minimalist Zen',
  'dynamic-pro': 'The Dynamic Pro',
  'creative-studio': 'The Creative Studio',
  'executive': 'The Executive',
};

const ReviewStep = ({ data }: Props) => {
  const filledSocials = data.socialLinks.filter(l => l.url.trim());

  return (
    <div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">Review & Publish</h2>
      <p className="text-muted-foreground mb-8">
        Everything looks good? Hit publish to make your portfolio live!
      </p>

      <div className="space-y-4">
        {/* Theme */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border/50 bg-card/50 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Template</span>
          </div>
          <p className="font-heading font-bold">{themeNames[data.theme] || data.theme}</p>
        </motion.div>

        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border/50 bg-card/50 p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Profile</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{data.name || <span className="text-destructive italic">Required</span>}</span>
            </div>
            {data.title && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Title</span>
                <span>{data.title}</span>
              </div>
            )}
            {data.email && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>{data.email}</span>
              </div>
            )}
            {data.bio && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bio</span>
                <span className="text-right max-w-[200px] truncate">{data.bio}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Design */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border/50 bg-card/50 p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Type className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Design</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg border border-border" style={{ backgroundColor: data.primaryColor }} />
              <span className="text-sm font-mono">{data.primaryColor}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm">{data.font}</span>
          </div>
        </motion.div>

        {/* Social Links */}
        {filledSocials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-border/50 bg-card/50 p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Social Links</span>
            </div>
            <div className="space-y-1.5">
              {filledSocials.map((link, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-3 h-3 text-primary" />
                  <span className="text-muted-foreground">{link.platform || 'Link'}:</span>
                  <span className="truncate">{link.url}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Admin */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-border/50 bg-card/50 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Admin Access</span>
          </div>
          <p className="text-sm">
            {data.adminPassword ? (
              <span className="flex items-center gap-1.5 text-green-400"><Check className="w-3.5 h-3.5" /> Password set</span>
            ) : (
              <span className="flex items-center gap-1.5 text-muted-foreground"><AlertCircle className="w-3.5 h-3.5" /> No password — can be set later</span>
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-muted-foreground/60 text-center pt-4"
        >
          All fields (except name) are optional and editable from the admin panel after publishing.
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewStep;
