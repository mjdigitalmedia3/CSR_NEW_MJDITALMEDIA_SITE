import ClientDetail from '../../client/src/pages/client-detail';
import { AdminGuard } from '@/components/admin-guard';

export default function ClientDetailPage() {
  return (
    <AdminGuard>
      <ClientDetail />
    </AdminGuard>
  );
}
