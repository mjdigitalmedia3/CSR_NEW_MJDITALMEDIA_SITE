import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Pencil, Trash2, Save, AlertCircle } from "lucide-react";
import { upsellFeatureSchema, type UpsellFeature } from "@shared/schema";
import { z } from "zod";

const categoryOptions = ["CRM", "Lead Management", "Marketing", "Analytics", "Other"] as const;

const upsellFormSchema = upsellFeatureSchema.omit({ id: true });
type UpsellFormData = z.infer<typeof upsellFormSchema>;

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

const categoryColors: Record<string, string> = {
  "CRM": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "Lead Management": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "Marketing": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "Analytics": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  "Other": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
};

export default function UpsellManager() {
  const [upsells, setUpsells] = useState<UpsellFeature[]>(defaultUpsells);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUpsell, setEditingUpsell] = useState<UpsellFeature | null>(null);

  const form = useForm<UpsellFormData>({
    resolver: zodResolver(upsellFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "Other",
      requiresWebApp: false,
      isActive: true,
      stripePriceId: "",
    },
  });

  const openCreateDialog = () => {
    setEditingUpsell(null);
    form.reset({
      name: "",
      description: "",
      price: 0,
      category: "Other",
      requiresWebApp: false,
      isActive: true,
      stripePriceId: "",
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (upsell: UpsellFeature) => {
    setEditingUpsell(upsell);
    form.reset({
      name: upsell.name,
      description: upsell.description,
      price: upsell.price,
      category: upsell.category,
      requiresWebApp: upsell.requiresWebApp,
      isActive: upsell.isActive,
      stripePriceId: upsell.stripePriceId || "",
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: UpsellFormData) => {
    if (editingUpsell) {
      setUpsells(prev => prev.map(u => 
        u.id === editingUpsell.id 
          ? { ...u, ...data, id: editingUpsell.id }
          : u
      ));
    } else {
      const newUpsell: UpsellFeature = {
        ...data,
        id: `upsell-${Date.now()}`,
      };
      setUpsells(prev => [...prev, newUpsell]);
    }
    setIsDialogOpen(false);
  };

  const deleteUpsell = (id: string) => {
    if (confirm("Are you sure you want to delete this upsell feature?")) {
      setUpsells(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Upsell Features</h1>
            <p className="text-muted-foreground">Manage add-on features and upgrades</p>
          </div>
          <Button onClick={openCreateDialog} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Feature
          </Button>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="py-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">How Upsells Work</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Features marked as "Requires Web App" will only be available to customers who select the "Website + Web App Package". 
                This encourages upgrades and ensures proper functionality.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Upsells List */}
        <div className="grid md:grid-cols-2 gap-4">
          {upsells.map((upsell) => (
            <Card key={upsell.id} className={!upsell.isActive ? "opacity-60" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{upsell.name}</h3>
                      <Badge className={categoryColors[upsell.category]}>
                        {upsell.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {upsell.description}
                    </p>
                  </div>
                  <p className="text-lg font-bold">+${upsell.price}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {upsell.requiresWebApp && (
                    <Badge variant="outline" className="text-xs">
                      Requires Web App
                    </Badge>
                  )}
                  {upsell.stripePriceId && (
                    <Badge variant="outline" className="text-xs">Stripe</Badge>
                  )}
                  <Badge variant={upsell.isActive ? "default" : "secondary"} className="text-xs">
                    {upsell.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(upsell)} className="gap-1">
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive gap-1"
                    onClick={() => deleteUpsell(upsell.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingUpsell ? "Edit Upsell Feature" : "Create Upsell Feature"}</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CRM Integration" {...field} />
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
                          placeholder="Describe what this feature does..."
                          className="min-h-[80px]"
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
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryOptions.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="requiresWebApp"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Requires Web App Package</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Only available with Website + Web App
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

                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Active</FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Show this feature to customers
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
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-2">
                    <Save className="h-4 w-4" />
                    {editingUpsell ? "Save Changes" : "Create Feature"}
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
