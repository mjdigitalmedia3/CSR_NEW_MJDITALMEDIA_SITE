import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Check, ShoppingCart, ArrowRight, Sparkles, Database, Users, BarChart3, Mail, Target, Zap } from "lucide-react";
import type { Product, UpsellFeature } from "@shared/schema";

// Default products
const defaultProducts: Product[] = [
  {
    id: "base-website",
    name: "Base Website Package",
    description: "Professional website with unlimited pages, contact forms, and responsive design. Perfect for businesses looking to establish their online presence.",
    price: 2500,
    features: [
      "Unlimited Pages",
      "Contact Form Integration",
      "Mobile Responsive Design",
      "SEO Optimization",
      "Social Media Integration",
      "Analytics Setup",
      "3 Months Support",
      "SSL Certificate"
    ],
    stripePriceId: "",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "website-plus-app",
    name: "Website + Web App Package",
    description: "Everything in Base Website plus a custom web application with database management. Ideal for businesses needing dynamic functionality.",
    price: 3500,
    features: [
      "Everything in Base Website",
      "Custom Web Application",
      "Database Management",
      "User Authentication System",
      "Admin Dashboard",
      "API Integration Ready",
      "6 Months Support",
      "Priority Development"
    ],
    stripePriceId: "",
    isActive: true,
    sortOrder: 2
  }
];

// Default upsell features
const defaultUpsells: UpsellFeature[] = [
  {
    id: "crm-lead-gen",
    name: "CRM + Lead Generation",
    description: "Complete customer relationship management with automated lead capture and nurturing",
    price: 500,
    category: "CRM",
    requiresWebApp: true,
    isActive: true
  },
  {
    id: "lead-management",
    name: "Lead Management System",
    description: "Advanced lead tracking, scoring, and pipeline management",
    price: 400,
    category: "Lead Management",
    requiresWebApp: true,
    isActive: true
  },
  {
    id: "email-marketing",
    name: "Email Marketing Automation",
    description: "Automated email campaigns, newsletters, and drip sequences",
    price: 350,
    category: "Marketing",
    requiresWebApp: true,
    isActive: true
  },
  {
    id: "advanced-analytics",
    name: "Advanced Analytics Dashboard",
    description: "Deep insights with custom reports, funnel tracking, and conversion analytics",
    price: 300,
    category: "Analytics",
    requiresWebApp: false,
    isActive: true
  },
  {
    id: "social-scheduler",
    name: "Social Media Scheduler",
    description: "Plan and automate posts across all social platforms",
    price: 200,
    category: "Marketing",
    requiresWebApp: false,
    isActive: true
  }
];

const categoryIcons: Record<string, React.ReactNode> = {
  "CRM": <Users className="h-4 w-4" />,
  "Lead Management": <Target className="h-4 w-4" />,
  "Marketing": <Mail className="h-4 w-4" />,
  "Analytics": <BarChart3 className="h-4 w-4" />,
  "Other": <Sparkles className="h-4 w-4" />
};

export default function Products() {
  const { items, addToCart, itemCount } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedUpsells([]);
    setIsDialogOpen(true);
  };

  const toggleUpsell = (upsellId: string) => {
    setSelectedUpsells(prev =>
      prev.includes(upsellId)
        ? prev.filter(id => id !== upsellId)
        : [...prev, upsellId]
    );
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    const upsells = defaultUpsells.filter(u => selectedUpsells.includes(u.id!));
    addToCart(selectedProduct, upsells);
    setIsDialogOpen(false);
  };

  const getUpsellRecommendation = () => {
    if (!selectedProduct) return null;
    if (selectedProduct.id === "base-website") {
      return defaultProducts.find(p => p.id === "website-plus-app");
    }
    return null;
  };

  const getAvailableUpsells = () => {
    if (!selectedProduct) return [];
    return defaultUpsells.filter(u => {
      if (u.requiresWebApp && selectedProduct.id === "base-website") {
        return false;
      }
      return u.isActive;
    });
  };

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    const upsellTotal = selectedUpsells.reduce((sum, id) => {
      const upsell = defaultUpsells.find(u => u.id === id);
      return sum + (upsell?.price || 0);
    }, 0);
    return selectedProduct.price + upsellTotal;
  };

  const recommendation = getUpsellRecommendation();
  const availableUpsells = getAvailableUpsells();
  const total = calculateTotal();

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Website Packages</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the perfect package for your business needs. All packages include our signature quality and support.
          </p>
        </div>

        {/* Cart Summary */}
        {itemCount > 0 && (
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <span className="font-medium">{itemCount} item(s) in cart</span>
              </div>
              <Link href="/checkout">
                <Button variant="outline" size="sm" className="gap-2">
                  View Cart <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {defaultProducts.map((product) => (
            <Card key={product.id} className={`relative overflow-hidden ${
              product.id === "website-plus-app" ? "border-2 border-primary" : ""
            }`}>
              {product.id === "website-plus-app" && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">{product.name}</CardTitle>
                <CardDescription className="text-base">{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <span className="text-4xl font-bold">${product.price.toLocaleString()}</span>
                  <span className="text-muted-foreground"> one-time</span>
                </div>

                <Separator />

                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full gap-2" 
                  size="lg"
                  onClick={() => handleProductSelect(product)}
                >
                  Select Package <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <Zap className="h-10 w-10 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">Quick turnaround without compromising quality</p>
          </div>
          <div className="p-6">
            <Database className="h-10 w-10 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Future-Ready</h3>
            <p className="text-sm text-muted-foreground">Scalable solutions that grow with your business</p>
          </div>
          <div className="p-6">
            <Users className="h-10 w-10 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Dedicated Support</h3>
            <p className="text-sm text-muted-foreground">We're with you every step of the way</p>
          </div>
        </div>
      </div>

      {/* Upsell Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Customize Your Package</DialogTitle>
            <DialogDescription>
              Enhance your {selectedProduct?.name} with powerful add-ons
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Upgrade Recommendation */}
            {recommendation && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Consider Upgrading!</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Get the {recommendation.name} for only ${(recommendation.price - (selectedProduct?.price || 0)).toLocaleString()} more and unlock database features plus all upsell options.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleProductSelect(recommendation)}
                    >
                      Switch to {recommendation.name}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Available Upsells */}
            {availableUpsells.length > 0 ? (
              <div className="space-y-4">
                <h4 className="font-semibold">Available Add-ons</h4>
                {availableUpsells.map((upsell) => (
                  <div 
                    key={upsell.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-colors cursor-pointer ${
                      selectedUpsells.includes(upsell.id!)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleUpsell(upsell.id!)}
                  >
                    <Checkbox 
                      checked={selectedUpsells.includes(upsell.id!)}
                      onCheckedChange={() => toggleUpsell(upsell.id!)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {categoryIcons[upsell.category]}
                        <span className="font-medium">{upsell.name}</span>
                        <Badge variant="secondary" className="text-xs">{upsell.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{upsell.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">+${upsell.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Upgrade to <strong>Website + Web App Package</strong> to unlock powerful add-ons like CRM, Lead Management, and more.
                </p>
              </div>
            )}
          </div>

          <Separator />

          <DialogFooter className="flex-col sm:flex-row gap-4">
            <div className="flex-1 text-left">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">${total.toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddToCart} className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
