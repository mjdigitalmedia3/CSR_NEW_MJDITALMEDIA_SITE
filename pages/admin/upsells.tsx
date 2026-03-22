import { AdminGuard } from "@/components/admin-guard";
import UpsellManager from "@/pages/admin/upsells";

export default function AdminUpsellsPage() {
  return (
    <AdminGuard>
      <UpsellManager />
    </AdminGuard>
  );
}
