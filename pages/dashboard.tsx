import Dashboard from '../client/src/pages/dashboard';
import { AdminGuard } from '@/components/admin-guard';

export default function DashboardPage() {
  return (
    <AdminGuard>
      <Dashboard />
    </AdminGuard>
  );
}
