import { AdminGuard } from "@/components/admin-guard";
import ProductManager from "@/pages/admin/products";

export default function AdminProductsPage() {
  return (
    <AdminGuard>
      <ProductManager />
    </AdminGuard>
  );
}
