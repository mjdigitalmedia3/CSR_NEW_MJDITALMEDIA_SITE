import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Users, TrendingUp, Clock, UserPlus, ArrowRight, Building2, Mail, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Client } from "@shared/schema";

interface Stats {
  totalLeads: number;
  newThisWeek: number;
  inProgress: number;
  converted: number;
}

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
    default:
      return "secondary";
  }
}

function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon,
  isLoading,
  testId
}: { 
  title: string; 
  value: number; 
  description: string; 
  icon: typeof Users;
  isLoading?: boolean;
  testId: string;
}) {
  return (
    <Card className="border-card-border" data-testid={`card-stat-${testId}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 gap-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-9 w-20" />
        ) : (
          <div className="text-3xl font-bold" data-testid={`text-stat-${testId}`}>{value}</div>
        )}
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function RecentLeadCard({ client }: { client: Client }) {
  return (
    <Link href={`/clients/${client.id}`} data-testid={`link-recent-lead-${client.id}`}>
      <Card className="hover-elevate cursor-pointer border-card-border" data-testid={`card-recent-lead-${client.id}`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate" data-testid={`text-client-name-${client.id}`}>{client.name}</h3>
                <Badge variant={getStatusColor(client.status)} className="flex-shrink-0" data-testid={`badge-status-${client.id}`}>
                  {client.status}
                </Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                {client.company && (
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {client.company}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  {client.email}
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {client.projectType}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {client.budgetRange}
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDistanceToNow(new Date(client.createdAt), { addSuffix: true })}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function RecentLeadSkeleton() {
  return (
    <Card className="border-card-border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const { data: clients, isLoading: clientsLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const recentClients = clients?.slice(0, 5) || [];

  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of your client leads and activity.
            </p>
          </div>
          <Link href="/submit">
            <Button className="gap-2" data-testid="button-add-client">
              <UserPlus className="h-4 w-4" />
              Add New Lead
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Leads"
            value={stats?.totalLeads || 0}
            description="All time submissions"
            icon={Users}
            isLoading={statsLoading}
            testId="total-leads"
          />
          <StatCard
            title="New This Week"
            value={stats?.newThisWeek || 0}
            description="Recent submissions"
            icon={Clock}
            isLoading={statsLoading}
            testId="new-this-week"
          />
          <StatCard
            title="In Progress"
            value={stats?.inProgress || 0}
            description="Active projects"
            icon={TrendingUp}
            isLoading={statsLoading}
            testId="in-progress"
          />
          <StatCard
            title="Converted"
            value={stats?.converted || 0}
            description="Successful conversions"
            icon={UserPlus}
            isLoading={statsLoading}
            testId="converted"
          />
        </div>

        <div>
          <Card className="border-card-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-2">
              <div>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Latest client submissions</CardDescription>
              </div>
              <Link href="/clients">
                <Button variant="outline" size="sm" className="gap-1" data-testid="button-view-all">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {clientsLoading ? (
                <>
                  <RecentLeadSkeleton />
                  <RecentLeadSkeleton />
                  <RecentLeadSkeleton />
                </>
              ) : recentClients.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No leads yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start capturing client information to see them here.
                  </p>
                  <Link href="/submit">
                    <Button className="gap-2" data-testid="button-add-first-lead">
                      <UserPlus className="h-4 w-4" />
                      Add Your First Lead
                    </Button>
                  </Link>
                </div>
              ) : (
                recentClients.map((client) => (
                  <RecentLeadCard key={client.id} client={client} />
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
