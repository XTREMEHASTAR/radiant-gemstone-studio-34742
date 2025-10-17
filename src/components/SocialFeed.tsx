import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Facebook, Twitter } from "lucide-react";

export const SocialFeed = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["social-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_posts")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-square bg-muted animate-pulse" />
          </Card>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "facebook":
        return <Facebook className="w-5 h-5" />;
      case "twitter":
        return <Twitter className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Follow Our Journey</h2>
          <p className="text-muted-foreground">
            See how our jewelry shines in real life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden group cursor-pointer">
              <CardContent className="p-0">
                <a
                  href={post.post_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                >
                  {post.embed_code ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: post.embed_code }}
                      className="aspect-square"
                    />
                  ) : (
                    <div className="aspect-square bg-muted flex items-center justify-center">
                      <div className="text-center">
                        {getPlatformIcon(post.platform)}
                        <p className="mt-2 text-sm text-muted-foreground">
                          View on {post.platform}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {getPlatformIcon(post.platform)}
                  </div>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
