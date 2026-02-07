import { useState, useEffect } from "react";
import { ExternalLink, X, Play } from "lucide-react";
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

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
  duration?: string;
  channelName?: string;
  channelUrl?: string;
}

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

function VideoSkeleton() {
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
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const [currentAnimation, setCurrentAnimation] = useState(randomAnimations[0]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/data/youtube-videos.json');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (video: YouTubeVideo) => {
    const animation = getRandomAnimation();
    setCurrentAnimation(animation);
    setAnimatingId(video.id);
    
    setTimeout(() => {
      setAnimatingId(null);
      setSelectedVideo(video);
    }, 500);
  };

  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-portfolio-heading">Our YouTube Videos</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our latest videos and see what we can create for you.
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <VideoSkeleton />
            <VideoSkeleton />
            <VideoSkeleton />
          </div>
        ) : videos?.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground text-lg">
                No videos to display yet. Check back soon!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos?.map((video) => (
              <Card 
                key={video.id} 
                className="overflow-visible hover-elevate border-card-border group"
                data-testid={`card-portfolio-${video.id}`}
              >
                <motion.div 
                  className="relative aspect-video overflow-hidden bg-muted cursor-pointer rounded-t-lg"
                  onClick={() => handleVideoClick(video)}
                  data-testid={`media-portfolio-${video.id}`}
                  initial={currentAnimation.initial}
                  animate={animatingId === video.id ? currentAnimation.animate : currentAnimation.initial}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-primary rounded-full p-3">
                          <Play className="h-8 w-8 text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    )}
                  </div>
                </motion.div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2" data-testid={`text-portfolio-title-${video.id}`}>
                      {video.title}
                    </h3>
                    <Badge variant="secondary" className="flex-shrink-0">
                      YouTube
                    </Badge>
                  </div>
                  
                  {video.description && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {video.description}
                    </p>
                  )}
                  
                  {video.channelName && (
                    <p className="text-xs text-muted-foreground mb-3">
                      Channel: {video.channelName}
                    </p>
                  )}
                  
                  <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <a 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      data-testid={`link-portfolio-view-${video.id}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Watch on YouTube
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-black/95 border-none">
          <DialogTitle className="sr-only">{selectedVideo?.title || "Video preview"}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 text-white hover:bg-white/20"
            onClick={() => setSelectedVideo(null)}
            data-testid="button-close-lightbox"
          >
            <X className="h-6 w-6" />
          </Button>
          <AnimatePresence>
            {selectedVideo && (
              <motion.div 
                className="flex items-center justify-center min-h-[50vh] max-h-[90vh] p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="w-full max-w-3xl aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                    className="w-full h-full"
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
