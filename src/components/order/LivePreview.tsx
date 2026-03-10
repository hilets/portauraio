import PortfolioRenderer from '@/components/portfolio/PortfolioRenderer';
import type { PortfolioData } from '@/pages/OrderWizard';

interface Props {
  data: PortfolioData;
}

const LivePreview = ({ data }: Props) => (
  <PortfolioRenderer
    name={data.name}
    title={data.title}
    bio={data.bio}
    email={data.email}
    phone={data.phone}
    socialLinks={data.socialLinks}
    primaryColor={data.primaryColor}
    font={data.font}
    template={data.template}
    compact
  />
);

export default LivePreview;
