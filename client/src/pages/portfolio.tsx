import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioProject } from "@shared/schema";

const randomAnimations = [
  {
    initial: { scale: 1, rotate: 0, x: 0, y: 0 },
    animate: { scale: [1, 1.1, 0.9, 1.05, 1], rotate: [0, 5, -5, 3, 0], x: 0, y: 0 },
  },
  {
    initial: { scale: 1, rotate: 0, x: 0, y: 0 },
    animate: { scale: [1, 0.95, 1.15, 1], rotate: [0, -10, 10, 0], x: [0, -10, 10, 0], y: 0 },
  },
  {
    initial: { scale: 1, rotate: 0, x: 0, y: 0 },
    animate: { scale: [1, 1.2, 0.8, 1.1, 1], rotate: [0, 0, 0, 0, 0], x: 0, y: [0, -20, 10, -5, 0] },
  },
  {
    initial: { scale: 1, rotate: 0, x: 0, y: 0 },
    animate: { scale: [1, 1.05, 1.1, 1.15, 1], rotate: [0, 15, -15, 8, 0], x: 0, y: 0 },
  },
  {
    initial: { scale: 1, rotate: 0, x: 0, y: 0 },
    animate: { scale: [1, 0.9, 1.2, 1], rotate: [0, -5, 5, 0], x: [0, 15, -15, 0], y: [0, -10, 10, 0] },
  },
  {
    initial: { scale: 1, rotate: 0, x: 0, y: 0 },
    animate: { scale: [1, 1.3, 0.85, 1.1, 1], rotate: [0, 8, -8, 4, 0], x: 0, y: 0 },
  },
];

function getRandomAnimation() {
  return randomAnimations[Math.floor(Math.random() * randomAnimations.length)];
}

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

  const [selectedMedia, setSelectedMedia] = useState<{ type: "image" | "video"; url: string; title: string } | null>(null);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [currentAnimation, setCurrentAnimation] = useState(randomAnimations[0]);

  const handleMediaClick = (id: string, type: "image" | "video", url: string, title: string) => {
    const animation = getRandomAnimation();
    setCurrentAnimation(animation);
    setAnimatingId(id);
    
    setTimeout(() => {
      setAnimatingId(null);
      setSelectedMedia({ type, url, title });
    }, 500);
  };

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
                className="overflow-visible hover-elevate border-card-border group"
                data-testid={`card-portfolio-${project.id}`}
              >
                {project.videoUrl ? (
                  <motion.div 
                    className="relative aspect-video overflow-hidden bg-muted cursor-pointer rounded-t-lg"
                    onClick={() => handleMediaClick(project.id, "video", project.videoUrl!, project.title)}
                    data-testid={`media-portfolio-${project.id}`}
                    initial={currentAnimation.initial}
                    animate={animatingId === project.id ? currentAnimation.animate : currentAnimation.initial}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <video
                      src={project.videoUrl}
                      className="w-full h-full object-contain"
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                        Click to enlarge
                      </span>
                    </div>
                  </motion.div>
                ) : project.imageUrl ? (
                  <motion.div 
                    className="relative aspect-video overflow-hidden bg-muted cursor-pointer rounded-t-lg"
                    onClick={() => handleMediaClick(project.id, "image", project.imageUrl!, project.title)}
                    data-testid={`media-portfolio-${project.id}`}
                    initial={currentAnimation.initial}
                    animate={animatingId === project.id ? currentAnimation.animate : currentAnimation.initial}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                        Click to enlarge
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="aspect-video bg-muted flex items-center justify-center rounded-t-lg">
                    <span className="text-muted-foreground">No media</span>
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

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black/95 border-none">
          <DialogTitle className="sr-only">{selectedMedia?.title || "Media preview"}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
            onClick={() => setSelectedMedia(null)}
            data-testid="button-close-lightbox"
          >
            <X className="h-6 w-6" />
          </Button>
          <AnimatePresence>
            {selectedMedia && (
              <motion.div 
                className="flex items-center justify-center min-h-[50vh] max-h-[90vh] p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {selectedMedia.type === "video" ? (
                  <video
                    src={selectedMedia.url}
                    className="max-w-full max-h-[85vh] object-contain"
                    controls
                    autoPlay
                    loop
                    data-testid="video-lightbox"
                  />
                ) : (
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    className="max-w-full max-h-[85vh] object-contain"
                    data-testid="image-lightbox"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
