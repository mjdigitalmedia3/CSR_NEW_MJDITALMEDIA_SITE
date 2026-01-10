import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { PortfolioProject } from "@shared/schema";

function ProjectSkeleton() {
  return (
    <Card>
      <Skeleton className="h-48 w-full rounded-t-lg" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
}

export default function Portfolio() {
  const { data: projects, isLoading } = useQuery<PortfolioProject[]>({
    queryKey: ["/api/portfolio/public"],
  });

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-portfolio-heading">Our Portfolio</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our latest projects and see what we can create for you.
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
            <ProjectSkeleton />
          </div>
        ) : projects?.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground text-lg">
                No projects to display yet. Check back soon!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project) => (
              <Card 
                key={project.id} 
                className="overflow-hidden hover-elevate border-card-border group"
                data-testid={`card-portfolio-${project.id}`}
              >
                {project.imageUrl ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1" data-testid={`text-portfolio-title-${project.id}`}>
                      {project.title}
                    </h3>
                    {project.category && (
                      <Badge variant="secondary" className="flex-shrink-0">
                        {project.category}
                      </Badge>
                    )}
                  </div>
                  
                  {project.description && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                  )}
                  
                  {project.projectUrl && (
                    <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                      <a 
                        href={project.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        data-testid={`link-portfolio-view-${project.id}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Project
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
