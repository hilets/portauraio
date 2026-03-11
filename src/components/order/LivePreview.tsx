import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
}

const LivePreview = ({ data }: Props) => (
  <div className="relative w-full h-full overflow-hidden">
    <div
      className="absolute top-0 left-0 origin-top-left"
      style={{ width: '1280px', transform: 'scale(var(--preview-scale))' }}
    >
      <div style={{ '--preview-scale': '0.5' } as React.CSSProperties}>
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
    </div>
  </div>
);

export default LivePreview;
