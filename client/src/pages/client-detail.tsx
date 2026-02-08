import { useQuery, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  ArrowLeft, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  DollarSign,
  Layers,
  Sparkles,
  FileText,
  Edit2,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { statusOptions, type Client } from "@shared/schema";

function getStatusColor(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "New":
      return "default";
    case "Contacted":
      return "secondary";
    case "In Progress":
      return "outline";
    case "Converted":
      return "default";
    case "Archived":
      return "secondary";
    default:
      return "secondary";
  }
}

function InfoItem({ icon: Icon, label, value, testId }: { icon: typeof Mail; label: string; value: string | null | undefined; testId?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3" data-testid={testId}>
      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-8 w-32" />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientDetail() {
  const router = useRouter();
  const id = router.query.id as string;
  const navigate = (path: string) => router.push(path);
  const { toast } = useToast();

  const { data: client, isLoading, error } = useQuery<Client>({
    queryKey: ["/api/clients", id],
    enabled: !!id,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const response = await apiRequest("PATCH", `/api/clients/${id}`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients", id] });
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "Status Updated",
        description: "Client status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/clients/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "Client Deleted",
        description: "The client has been removed successfully.",
      });
      navigate("/clients");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete client. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !client) {
    return (
      <div className="py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Client Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The client you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/clients">
            <Button data-testid="button-back-to-clients">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Clients
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/clients">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-client-name">{client.name}</h1>
              <Badge variant={getStatusColor(client.status)} className="text-sm" data-testid="badge-client-status">
                {client.status}
              </Badge>
            </div>
            {client.company && (
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <Building2 className="h-4 w-4" />
                {client.company}
              </p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-6">
                <InfoItem icon={Mail} label="Email Address" value={client.email} testId="info-email" />
                <InfoItem icon={Phone} label="Phone Number" value={client.phone} testId="info-phone" />
                <InfoItem icon={Building2} label="Company" value={client.company} testId="info-company" />
                <InfoItem 
                  icon={Calendar} 
                  label="Submitted On" 
                  value={format(new Date(client.createdAt), "MMMM d, yyyy 'at' h:mm a")} 
                  testId="info-submitted"
                />
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-6">
                <InfoItem icon={Layers} label="Project Type" value={client.projectType} testId="info-project-type" />
                <InfoItem icon={DollarSign} label="Budget Range" value={client.budgetRange} testId="info-budget" />
                <InfoItem icon={Clock} label="Timeline" value={client.timeline} testId="info-timeline" />
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Desired Features
                </CardTitle>
                <CardDescription>Features requested for the project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2" data-testid="container-features">
                  {client.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="gap-1" data-testid={`badge-feature-${feature.toLowerCase().replace(/\s+/g, "-")}`}>
                      <CheckCircle2 className="h-3 w-3" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {client.requirements && (
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Additional Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap" data-testid="text-requirements">
                    {client.requirements}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>Update the client's status</CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={client.status}
                  onValueChange={(value) => updateStatusMutation.mutate(value)}
                  disabled={updateStatusMutation.isPending}
                >
                  <SelectTrigger data-testid="select-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      className="w-full gap-2"
                      data-testid="button-delete"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Client
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Client?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the client 
                        record for {client.name}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate()}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        data-testid="button-confirm-delete"
                      >
                        {deleteMutation.isPending ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            <Card className="border-card-border bg-primary/5">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Lead submitted</p>
                  <p className="font-semibold">
                    {format(new Date(client.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
