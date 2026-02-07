import { useQuery, useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
  channelName?: string;
  channelUrl?: string;
  isVisible: boolean;
}

function VideoSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Skeleton className="h-20 w-32 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PortfolioManager() {
  const { toast } = useToast();

  const { data: videos, isLoading } = useQuery<YouTubeVideo[]>({
    queryKey: ["/api/youtube-videos"],
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, isVisible }: { id: string; isVisible: boolean }) => {
      const response = await apiRequest("PATCH", `/api/youtube-videos/${id}`, { isVisible });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/youtube-videos"] });
      toast({ title: "Updated", description: "Video visibility has been updated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update video visibility.", variant: "destructive" });
    },
  });

  const toggleVisibility = (video: YouTubeVideo) => {
    toggleMutation.mutate({ id: video.id, isVisible: !video.isVisible });
  };

  const visibleCount = videos?.filter(v => v.isVisible).length ?? 0;
  const hiddenCount = videos?.filter(v => !v.isVisible).length ?? 0;

  return (
    <div className="py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-portfolio-title">Portfolio Manager</h1>
            <p className="text-muted-foreground mt-1">
              Control which YouTube videos are shown on the Portfolio page
            </p>
          </div>
          {videos && videos.length > 0 && (
            <div className="flex items-center gap-3 text-sm">
              <Badge variant="secondary" className="gap-1">
                <Eye className="h-3 w-3" /> {visibleCount} visible
              </Badge>
              <Badge variant="outline" className="gap-1">
                <EyeOff className="h-3 w-3" /> {hiddenCount} hidden
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <>
              <VideoSkeleton />
              <VideoSkeleton />
              <VideoSkeleton />
            </>
          ) : !videos || videos.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">No YouTube videos found</p>
                <p className="text-muted-foreground text-sm">
                  Run the fetch script to pull videos from your YouTube channel.
                </p>
              </CardContent>
            </Card>
          ) : (
            videos.map((video) => (
              <Card
                key={video.id}
                className={`border-card-border transition-opacity ${!video.isVisible ? "opacity-60" : ""}`}
                data-testid={`card-video-${video.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-full sm:w-40 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-lg truncate" data-testid={`text-video-title-${video.id}`}>
                            {video.title}
                          </h3>
                          {video.channelName && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {video.channelName}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {video.isVisible ? (
                            <Eye className="h-4 w-4 text-green-500" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          )}
                          <Switch
                            checked={video.isVisible}
                            onCheckedChange={() => toggleVisibility(video)}
                            data-testid={`switch-visibility-${video.id}`}
                          />
                        </div>
                      </div>

                      {video.description && (
                        <p className="text-muted-foreground text-sm mt-2 line-clamp-1">
                          {video.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant={video.isVisible ? "secondary" : "outline"} className="text-xs">
                          {video.isVisible ? "Visible" : "Hidden"}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <a href={video.url} target="_blank" rel="noopener noreferrer" data-testid={`link-video-${video.id}`}>
                            <ExternalLink className="h-3 w-3 mr-1" />
                            YouTube
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
