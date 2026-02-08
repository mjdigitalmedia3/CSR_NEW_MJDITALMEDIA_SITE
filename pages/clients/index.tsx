import Clients from '../../client/src/pages/clients';
import { AdminGuard } from '@/components/admin-guard';

export default function ClientsPage() {
  return (
    <AdminGuard>
      <Clients />
    </AdminGuard>
  );
}
