import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Pencil, Trash2, GripVertical, Save, X } from "lucide-react";
import { productSchema, type Product } from "@shared/schema";
import { z } from "zod";

// Extended schema for form
const productFormSchema = productSchema.omit({ id: true });
type ProductFormData = z.infer<typeof productFormSchema>;

const defaultProducts: Product[] = [
  {
    id: "base-website",
    name: "Base Website Package",
    description: "Professional website with unlimited pages, contact forms, and responsive design. Perfect for businesses looking to establish their online presence.",
    price: 2500,
    features: ["Unlimited Pages", "Contact Form Integration", "Mobile Responsive Design", "SEO Optimization", "Social Media Integration", "Analytics Setup", "3 Months Support", "SSL Certificate"],
    stripePriceId: "",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "website-plus-app",
    name: "Website + Web App Package",
    description: "Everything in Base Website plus a custom web application with database management. Ideal for businesses needing dynamic functionality.",
    price: 3500,
    features: ["Everything in Base Website", "Custom Web Application", "Database Management", "User Authentication System", "Admin Dashboard", "API Integration Ready", "6 Months Support", "Priority Development"],
    stripePriceId: "",
    isActive: true,
    sortOrder: 2
  }
];

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newFeature, setNewFeature] = useState("");

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      features: [],
      stripePriceId: "",
      isActive: true,
      sortOrder: 0,
    },
  });

  const openCreateDialog = () => {
    setEditingProduct(null);
    form.reset({
      name: "",
      description: "",
      price: 0,
      features: [],
      stripePriceId: "",
      isActive: true,
      sortOrder: products.length + 1,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      description: product.description,
      price: product.price,
      features: product.features,
      stripePriceId: product.stripePriceId || "",
      isActive: product.isActive,
      sortOrder: product.sortOrder,
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...data, id: editingProduct.id }
          : p
      ));
    } else {
      const newProduct: Product = {
        ...data,
        id: `product-${Date.now()}`,
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setIsDialogOpen(false);
  };

  const deleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    const currentFeatures = form.getValues("features") || [];
    form.setValue("features", [...currentFeatures, newFeature.trim()]);
    setNewFeature("");
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features") || [];
    form.setValue("features", currentFeatures.filter((_, i) => i !== index));
  };

  const moveProduct = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= products.length) return;
    
    const newProducts = [...products];
    [newProducts[index], newProducts[newIndex]] = [newProducts[newIndex], newProducts[index]];
    
    // Update sortOrder
    newProducts.forEach((p, i) => p.sortOrder = i + 1);
    setProducts(newProducts);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Product Manager</h1>
            <p className="text-muted-foreground">Manage your website packages</p>
          </div>
          <Button onClick={openCreateDialog} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Products List */}
        <div className="space-y-4">
          {products
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((product, index) => (
            <Card key={product.id} className={!product.isActive ? "opacity-60" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={index === 0}
                      onClick={() => moveProduct(index, "up")}
                    >
                      <GripVertical className="h-4 w-4 -rotate-90" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      disabled={index === products.length - 1}
                      onClick={() => moveProduct(index, "down")}
                    >
                      <GripVertical className="h-4 w-4 rotate-90" />
                    </Button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">${product.price.toLocaleString()}</p>
                        {product.stripePriceId && (
                          <Badge variant="outline" className="text-xs">Stripe Connected</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.slice(0, 4).map((feature, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{feature}</Badge>
                      ))}
                      {product.features.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{product.features.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant={product.isActive ? "default" : "secondary"}>
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteProduct(product.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Create Product"}</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Base Website Package" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what's included in this package..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            min={0}
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stripePriceId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stripe Price ID (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="price_xxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="features"
                  render={() => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a feature (e.g., 'Unlimited Pages')"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                          />
                          <Button type="button" onClick={addFeature} variant="outline">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {form.watch("features")?.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="gap-1 pr-1">
                              {feature}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-1 hover:bg-transparent"
                                onClick={() => removeFeature(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Make this product visible to customers
                        </p>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" />
                    {editingProduct ? "Save Changes" : "Create Product"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
