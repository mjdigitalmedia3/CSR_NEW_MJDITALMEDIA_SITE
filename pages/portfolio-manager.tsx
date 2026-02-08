import PortfolioManager from '../client/src/pages/portfolio-manager';
import { AdminGuard } from '@/components/admin-guard';

export default function PortfolioManagerPage() {
  return (
    <AdminGuard>
      <PortfolioManager />
    </AdminGuard>
  );
}
