import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  Search, 
  UserPlus, 
  Users, 
  ArrowUpDown, 
  Building2, 
  Mail, 
  Phone,
  Calendar,
  Filter,
  X
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { projectTypes, statusOptions, budgetRanges, type Client } from "@shared/schema";

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

function ClientSkeleton() {
  return (
    <TableRow>
      <TableCell><Skeleton className="h-5 w-32" /></TableCell>
      <TableCell><Skeleton className="h-5 w-40" /></TableCell>
      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
      <TableCell><Skeleton className="h-5 w-28" /></TableCell>
      <TableCell><Skeleton className="h-5 w-16" /></TableCell>
      <TableCell><Skeleton className="h-5 w-20" /></TableCell>
    </TableRow>
  );
}

export default function Clients() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ["/api/clients"],
  });

  const filteredClients = (clients || [])
    .filter((client) => {
      const matchesSearch = 
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        (client.company?.toLowerCase().includes(search.toLowerCase()));
      
      const matchesStatus = statusFilter === "all" || client.status === statusFilter;
      const matchesProject = projectFilter === "all" || client.projectType === projectFilter;
      
      return matchesSearch && matchesStatus && matchesProject;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  const hasFilters = search || statusFilter !== "all" || projectFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setProjectFilter("all");
  };

  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Client Leads</h1>
            <p className="text-muted-foreground mt-1">
              Manage and view all your potential clients.
            </p>
          </div>
          <Link href="/submit">
            <Button className="gap-2" data-testid="button-add-new-lead">
              <UserPlus className="h-4 w-4" />
              Add New Lead
            </Button>
          </Link>
        </div>

        <Card className="border-card-border">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]" data-testid="filter-status">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={projectFilter} onValueChange={setProjectFilter}>
                  <SelectTrigger className="w-[160px]" data-testid="filter-project">
                    <SelectValue placeholder="Project Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                  data-testid="button-sort"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>

                {hasFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-1"
                    data-testid="button-clear-filters"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-card-border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Project Type</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <>
                    <ClientSkeleton />
                    <ClientSkeleton />
                    <ClientSkeleton />
                    <ClientSkeleton />
                    <ClientSkeleton />
                  </>
                ) : filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          {hasFilters ? "No matching clients" : "No clients yet"}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {hasFilters
                            ? "Try adjusting your filters or search query."
                            : "Start by adding your first client lead."}
                        </p>
                        {hasFilters ? (
                          <Button variant="outline" onClick={clearFilters} data-testid="button-clear-empty">
                            Clear Filters
                          </Button>
                        ) : (
                          <Link href="/submit">
                            <Button data-testid="button-add-first-client">
                              <UserPlus className="h-4 w-4 mr-2" />
                              Add Your First Lead
                            </Button>
                          </Link>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow 
                      key={client.id} 
                      className="cursor-pointer hover-elevate"
                      onClick={() => window.location.href = `/clients/${client.id}`}
                      data-testid={`row-client-${client.id}`}
                    >
                      <TableCell>
                        <div>
                          <div className="font-medium">{client.name}</div>
                          {client.company && (
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {client.company}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {client.email}
                          </div>
                          {client.phone && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {client.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{client.projectType}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{client.budgetRange}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(client.createdAt), "MMM d, yyyy")}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {!isLoading && filteredClients.length > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            Showing {filteredClients.length} of {clients?.length || 0} clients
          </div>
        )}
      </div>
    </div>
  );
}
