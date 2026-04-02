import { useRef, useEffect, useState } from 'react';
import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';
import { PreviewModeProvider } from '@/contexts/PreviewModeContext';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
}

const SCALE = 0.305;
const INNER_WIDTH = 1280;

const LivePreview = ({ data }: Props) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const [scaledHeight, setScaledHeight] = useState(1200);

  useEffect(() => {
    if (!innerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setScaledHeight(entry.contentRect.height * SCALE);
      }
    });
    observer.observe(innerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <PreviewModeProvider>
      <div style={{ height: scaledHeight, overflow: 'hidden', position: 'relative' }}>
        <div
          ref={innerRef}
          className="origin-top-left"
          style={{
            width: INNER_WIDTH,
            transform: `scale(${SCALE})`,
          }}
        >
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
    </PreviewModeProvider>
  );
};

export default LivePreview;
