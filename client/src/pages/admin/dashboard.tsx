import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Sparkles, 
  FileText, 
  Briefcase, 
  FolderOpen,
  ArrowRight,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Save,
  Plus
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "closed";
  date: string;
  message?: string;
}

interface WebsiteSection {
  id: string;
  name: string;
  title: string;
  content: string;
  isActive: boolean;
  lastModified: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isActive: boolean;
  salesCount: number;
}

interface Upsell {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  requiresWebApp: boolean;
  isActive: boolean;
  salesCount: number;
}

// Mock Data
const mockLeads: Lead[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    company: "Tech Solutions Inc",
    projectType: "website",
    budget: "$5,000 - $10,000",
    timeline: "1-2 months",
    status: "new",
    date: "2024-01-15",
    message: "Looking for a complete redesign of our corporate website."
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@startup.com",
    phone: "(555) 987-6543",
    company: "StartupXYZ",
    projectType: "web_app",
    budget: "$10,000 - $25,000",
    timeline: "2-3 months",
    status: "contacted",
    date: "2024-01-14",
    message: "Need a custom CRM with lead management features."
  },
  {
    id: "3",
    name: "Mike Williams",
    email: "mike@retail.com",
    phone: "(555) 456-7890",
    company: "Retail Pro",
    projectType: "ecommerce",
    budget: "$15,000+",
    timeline: "3+ months",
    status: "qualified",
    date: "2024-01-13",
    message: "E-commerce platform with inventory management."
  }
];

const mockWebsiteSections: WebsiteSection[] = [
  { id: "hero", name: "Hero Section", title: "Transform Your Digital Presence", content: "We build powerful websites and web applications that drive real results for your business.", isActive: true, lastModified: "2024-01-10" },
  { id: "about", name: "About Section", title: "Your Partner in Digital Growth", content: "At MJ Digital Media, we believe every business deserves a powerful online presence.", isActive: true, lastModified: "2024-01-10" },
  { id: "services", name: "Services Overview", title: "What We Do", content: "From custom websites to complex web applications, we deliver solutions that scale.", isActive: true, lastModified: "2024-01-08" },
  { id: "why-us", name: "Why Choose Us", title: "Why Businesses Choose MJ Digital Media", content: "We combine technical expertise with creative vision.", isActive: true, lastModified: "2024-01-08" },
  { id: "process", name: "Process Section", title: "Our Proven Process", content: "A streamlined approach to delivering exceptional results.", isActive: true, lastModified: "2024-01-05" },
  { id: "testimonials", name: "Testimonials", title: "What Our Clients Say", content: "Client testimonials and success stories.", isActive: true, lastModified: "2024-01-05" },
  { id: "cta", name: "Call to Action", title: "Ready to Grow Your Business?", content: "Let's discuss how we can help transform your digital presence.", isActive: true, lastModified: "2024-01-05" }
];

const mockProducts: Product[] = [
  { id: "base-website", name: "Base Website Package", description: "Professional website with unlimited pages", price: 2500, features: ["Unlimited Pages", "Contact Form", "Responsive Design"], isActive: true, salesCount: 12 },
  { id: "webapp-combo", name: "Website + Web App Package", description: "Complete solution with database and features", price: 3500, features: ["Everything in Base", "Database", "User Auth", "Admin Dashboard"], isActive: true, salesCount: 8 }
];

const mockUpsells: Upsell[] = [
  { id: "crm", name: "CRM + Lead Generation", description: "Complete CRM with lead capture", price: 500, category: "CRM", requiresWebApp: true, isActive: true, salesCount: 5 },
  { id: "lead-mgmt", name: "Lead Management System", description: "Advanced lead tracking", price: 400, category: "Lead Management", requiresWebApp: true, isActive: true, salesCount: 3 },
  { id: "email", name: "Email Marketing", description: "Automated email campaigns", price: 350, category: "Marketing", requiresWebApp: true, isActive: true, salesCount: 4 },
  { id: "analytics", name: "Advanced Analytics", description: "Deep insights and reports", price: 300, category: "Analytics", requiresWebApp: false, isActive: true, salesCount: 6 },
  { id: "social", name: "Social Media Scheduler", description: "Plan and automate posts", price: 200, category: "Marketing", requiresWebApp: false, isActive: true, salesCount: 2 }
];

// Stats Card Component
function StatCard({ title, value, change, icon: Icon, href }: { title: string; value: string | number; change?: string; icon: any; href?: string }) {
  const content = (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {change && (
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {change}
              </p>
            )}
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

// Status Badge Component
function StatusBadge({ status }: { status: Lead["status"] }) {
  const colors: Record<string, string> = {
    new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    qualified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    proposal: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  };

  return (
    <Badge className={colors[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [websiteSections, setWebsiteSections] = useState<WebsiteSection[]>(mockWebsiteSections);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [upsells, setUpsells] = useState<Upsell[]>(mockUpsells);
  
  // Dialog states
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [editingSection, setEditingSection] = useState<WebsiteSection | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingUpsell, setEditingUpsell] = useState<Upsell | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddUpsell, setShowAddUpsell] = useState(false);

  // Form states
  const [sectionForm, setSectionForm] = useState({ title: "", content: "", isActive: true });
  const [productForm, setProductForm] = useState({ name: "", description: "", price: 0, features: "", isActive: true });
  const [upsellForm, setUpsellForm] = useState({ name: "", description: "", price: 0, category: "CRM", requiresWebApp: false, isActive: true });

  // Calculate stats
  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter(l => l.status === "new").length,
    totalRevenue: products.reduce((acc, p) => acc + (p.price * p.salesCount), 0),
    activeProducts: products.filter(p => p.isActive).length,
    activeUpsells: upsells.filter(u => u.isActive).length,
    totalSales: [...products, ...upsells].reduce((acc, item) => acc + item.salesCount, 0)
  };

  // Handlers
  const updateLeadStatus = (id: string, status: Lead["status"]) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const saveSection = () => {
    if (editingSection) {
      setWebsiteSections(prev => prev.map(s => 
        s.id === editingSection.id 
          ? { ...s, ...sectionForm, lastModified: new Date().toISOString().split('T')[0] }
          : s
      ));
      setEditingSection(null);
    }
  };

  const saveProduct = () => {
    const features = productForm.features.split('\n').filter(f => f.trim());
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productForm, features }
          : p
      ));
      setEditingProduct(null);
    } else {
      const newProduct: Product = {
        id: `product-${Date.now()}`,
        ...productForm,
        features,
        salesCount: 0
      };
      setProducts(prev => [...prev, newProduct]);
      setShowAddProduct(false);
    }
  };

  const saveUpsell = () => {
    if (editingUpsell) {
      setUpsells(prev => prev.map(u => 
        u.id === editingUpsell.id 
          ? { ...u, ...upsellForm }
          : u
      ));
      setEditingUpsell(null);
    } else {
      const newUpsell: Upsell = {
        id: `upsell-${Date.now()}`,
        ...upsellForm,
        salesCount: 0
      };
      setUpsells(prev => [...prev, newUpsell]);
      setShowAddUpsell(false);
    }
  };

  const deleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const deleteUpsell = (id: string) => {
    if (confirm("Are you sure you want to delete this upsell?")) {
      setUpsells(prev => prev.filter(u => u.id !== id));
    }
  };

  const openSectionEdit = (section: WebsiteSection) => {
    setEditingSection(section);
    setSectionForm({ title: section.title, content: section.content, isActive: section.isActive });
  };

  const openProductEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm({ 
      name: product.name, 
      description: product.description, 
      price: product.price, 
      features: product.features.join('\n'), 
      isActive: product.isActive 
    });
  };

  const openUpsellEdit = (upsell: Upsell) => {
    setEditingUpsell(upsell);
    setUpsellForm({ 
      name: upsell.name, 
      description: upsell.description, 
      price: upsell.price, 
      category: upsell.category, 
      requiresWebApp: upsell.requiresWebApp, 
      isActive: upsell.isActive 
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your website content, leads, and products</p>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <Eye className="h-4 w-4" />
                View Site
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Leads" value={stats.totalLeads} change="+3 this week" icon={Users} href="#leads" />
          <StatCard title="New Leads" value={stats.newLeads} icon={AlertCircle} />
          <StatCard title="Active Products" value={stats.activeProducts} icon={Package} />
          <StatCard title="Active Upsells" value={stats.activeUpsells} icon={Sparkles} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} change="+15% this month" icon={DollarSign} />
          <StatCard title="Total Sales" value={stats.totalSales} icon={ShoppingCart} />
          <StatCard title="Website Sections" value={websiteSections.filter(s => s.isActive).length} icon={FileText} />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-2">
              <Users className="h-4 w-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Leads */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Leads</CardTitle>
                    <CardDescription>Latest inquiries from your website</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("leads")}>
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.company}</p>
                          <p className="text-xs text-muted-foreground">{lead.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={lead.status} />
                          <Button variant="ghost" size="icon" onClick={() => setSelectedLead(lead)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your website and products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <Link href="/admin/products">
                      <Button variant="outline" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Manage Products
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/admin/upsells">
                      <Button variant="outline" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Manage Upsells
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/portfolio-manager">
                      <Button variant="outline" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <FolderOpen className="h-4 w-4" />
                          Manage Portfolio
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/services">
                      <Button variant="outline" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          View Services Page
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Sales overview of your packages and upsells</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="p-4 rounded-lg border">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-2xl font-bold mt-1">{product.salesCount} sales</p>
                      <p className="text-sm text-muted-foreground">
                        ${(product.price * product.salesCount).toLocaleString()} revenue
                      </p>
                    </div>
                  ))}
                  {upsells.slice(0, 2).map((upsell) => (
                    <div key={upsell.id} className="p-4 rounded-lg border">
                      <p className="font-medium">{upsell.name}</p>
                      <p className="text-2xl font-bold mt-1">{upsell.salesCount} sales</p>
                      <p className="text-sm text-muted-foreground">
                        ${(upsell.price * upsell.salesCount).toLocaleString()} revenue
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Leads</CardTitle>
                  <CardDescription>Manage and track your sales pipeline</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setLeads(mockLeads)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-medium">{lead.name}</p>
                          <StatusBadge status={lead.status} />
                        </div>
                        <p className="text-sm text-muted-foreground">{lead.company} • {lead.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">Project: {lead.projectType} • Budget: {lead.budget}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead["status"])}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="proposal">Proposal</option>
                          <option value="closed">Closed</option>
                        </select>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedLead(lead)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Products Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage your service packages</CardDescription>
                </div>
                <Button onClick={() => {
                  setEditingProduct(null);
                  setProductForm({ name: "", description: "", price: 0, features: "", isActive: true });
                  setShowAddProduct(true);
                }} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{product.name}</p>
                          <Badge variant={product.isActive ? "default" : "secondary"}>
                            {product.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                        <p className="text-sm font-medium mt-1">${product.price.toLocaleString()} • {product.salesCount} sales</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openProductEdit(product)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteProduct(product.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upsells Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upsell Features</CardTitle>
                  <CardDescription>Manage add-on features</CardDescription>
                </div>
                <Button onClick={() => {
                  setEditingUpsell(null);
                  setUpsellForm({ name: "", description: "", price: 0, category: "CRM", requiresWebApp: false, isActive: true });
                  setShowAddUpsell(true);
                }} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Upsell
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {upsells.map((upsell) => (
                    <div key={upsell.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{upsell.name}</p>
                          <Badge variant={upsell.isActive ? "default" : "secondary"}>
                            {upsell.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {upsell.requiresWebApp && (
                            <Badge variant="outline">Requires Web App</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{upsell.description}</p>
                        <p className="text-sm font-medium mt-1">${upsell.price.toLocaleString()} • {upsell.salesCount} sales</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openUpsellEdit(upsell)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteUpsell(upsell.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Content</CardTitle>
                <CardDescription>Edit text content on your website pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {websiteSections.map((section) => (
                    <div key={section.id} className="flex items-start justify-between p-4 rounded-lg border">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium">{section.name}</p>
                          <Badge variant={section.isActive ? "default" : "secondary"}>
                            {section.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{section.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">{section.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">Last modified: {section.lastModified}</p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => openSectionEdit(section)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Lead Detail Dialog */}
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Lead Details</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="font-medium">{selectedLead.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Company</Label>
                    <p className="font-medium">{selectedLead.company}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedLead.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{selectedLead.phone}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Project Type</Label>
                    <p className="font-medium capitalize">{selectedLead.projectType.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Budget</Label>
                    <p className="font-medium">{selectedLead.budget}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Timeline</Label>
                  <p className="font-medium">{selectedLead.timeline}</p>
                </div>
                <Separator />
                <div>
                  <Label className="text-muted-foreground">Message</Label>
                  <p className="text-sm mt-1">{selectedLead.message || "No additional message provided."}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-2">
                    <StatusBadge status={selectedLead.status} />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      const statuses: Lead["status"][] = ["new", "contacted", "qualified", "proposal", "closed"];
                      const currentIndex = statuses.indexOf(selectedLead.status);
                      const nextStatus = statuses[currentIndex + 1] || "closed";
                      updateLeadStatus(selectedLead.id, nextStatus);
                      setSelectedLead({ ...selectedLead, status: nextStatus });
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Advance Status
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Section Dialog */}
        <Dialog open={!!editingSection} onOpenChange={() => setEditingSection(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit {editingSection?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Title</Label>
                <Input 
                  value={sectionForm.title} 
                  onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Content</Label>
                <Textarea 
                  value={sectionForm.content} 
                  onChange={(e) => setSectionForm({ ...sectionForm, content: e.target.value })}
                  className="mt-2 min-h-[120px]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={sectionForm.isActive} 
                  onCheckedChange={(checked) => setSectionForm({ ...sectionForm, isActive: checked })}
                />
                <Label>Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingSection(null)}>Cancel</Button>
              <Button onClick={saveSection} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Product Dialog */}
        <Dialog open={showAddProduct || !!editingProduct} onOpenChange={() => { setShowAddProduct(false); setEditingProduct(null); }}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Name</Label>
                <Input 
                  value={productForm.name} 
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="mt-2"
                  placeholder="Product name"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  value={productForm.description} 
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="mt-2"
                  placeholder="Product description"
                />
              </div>
              <div>
                <Label>Price ($)</Label>
                <Input 
                  type="number"
                  value={productForm.price} 
                  onChange={(e) => setProductForm({ ...productForm, price: parseInt(e.target.value) || 0 })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Features (one per line)</Label>
                <Textarea 
                  value={productForm.features} 
                  onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                  className="mt-2 min-h-[100px]"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={productForm.isActive} 
                  onCheckedChange={(checked) => setProductForm({ ...productForm, isActive: checked })}
                />
                <Label>Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowAddProduct(false); setEditingProduct(null); }}>Cancel</Button>
              <Button onClick={saveProduct} className="gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Upsell Dialog */}
        <Dialog open={showAddUpsell || !!editingUpsell} onOpenChange={() => { setShowAddUpsell(false); setEditingUpsell(null); }}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingUpsell ? "Edit Upsell" : "Add Upsell"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Name</Label>
                <Input 
                  value={upsellForm.name} 
                  onChange={(e) => setUpsellForm({ ...upsellForm, name: e.target.value })}
                  className="mt-2"
                  placeholder="Upsell name"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  value={upsellForm.description} 
                  onChange={(e) => setUpsellForm({ ...upsellForm, description: e.target.value })}
                  className="mt-2"
                  placeholder="Upsell description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price ($)</Label>
                  <Input 
                    type="number"
                    value={upsellForm.price} 
                    onChange={(e) => setUpsellForm({ ...upsellForm, price: parseInt(e.target.value) || 0 })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input 
                    value={upsellForm.category} 
                    onChange={(e) => setUpsellForm({ ...upsellForm, category: e.target.value })}
                    className="mt-2"
                    placeholder="CRM, Marketing, etc."
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={upsellForm.requiresWebApp} 
                    onCheckedChange={(checked) => setUpsellForm({ ...upsellForm, requiresWebApp: checked })}
                  />
                  <Label>Requires Web App Package</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={upsellForm.isActive} 
                    onCheckedChange={(checked) => setUpsellForm({ ...upsellForm, isActive: checked })}
                  />
                  <Label>Active</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setShowAddUpsell(false); setEditingUpsell(null); }}>Cancel</Button>
              <Button onClick={saveUpsell} className="gap-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
