import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';
import { PreviewModeProvider } from '@/contexts/PreviewModeContext';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
}

const LivePreview = ({ data }: Props) => (
  <PreviewModeProvider>
    <div className="w-[1280px] origin-top-left" style={{ transform: 'scale(0.305)' }}>
      <PortfolioRenderer
        name={data.name || 'Your Name'}
        title={data.title || 'Creative Professional'}
        bio={data.bio || 'Crafting exceptional digital experiences through thoughtful design, clean code, and strategic thinking.'}
        email={data.email || 'hello@studio.com'}
        phone={data.phone}
        socialLinks={data.socialLinks}
        primaryColor={data.primaryColor}
        font={data.font}
        template={data.template}
      />
    </div>
  </PreviewModeProvider>
);

export default LivePreview;
