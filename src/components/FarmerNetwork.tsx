import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  MapPin, 
  Trophy, 
  Camera,
  TrendingUp,
  Star,
  Award
} from "lucide-react";

interface Post {
  id: string;
  author: {
    name: string;
    location: string;
    avatar?: string;
    verified: boolean;
    level: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

interface Farmer {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  speciality: string;
  experience: number;
  successRate: number;
  followers: number;
  verified: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "John Kamau",
      location: "Nakuru East",
      verified: true,
      level: "Expert Farmer"
    },
    content: "Just harvested 3.2 tons of maize per acre using the new drought-resistant variety! The secret was proper spacing and organic fertilizer. Happy to share my experience with fellow farmers. 🌽",
    image: "/api/placeholder/400/300",
    likes: 45,
    comments: 12,
    timestamp: "2 hours ago",
    tags: ["maize", "harvest", "organic"]
  },
  {
    id: "2",
    author: {
      name: "Grace Wanjiku",
      location: "Nakuru West",
      verified: false,
      level: "Rising Star"
    },
    content: "My tomato greenhouse is doing amazing! Using drip irrigation and companion planting with basil. Yield increased by 40% compared to last season. Anyone interested in visiting?",
    likes: 32,
    comments: 8,
    timestamp: "5 hours ago",
    tags: ["tomatoes", "greenhouse", "irrigation"]
  },
  {
    id: "3",
    author: {
      name: "Peter Mwangi",
      location: "Nakuru South",
      verified: true,
      level: "Master Farmer"
    },
    content: "Weather alert: Heavy rains expected next week. Perfect time for planting beans! I've prepared my fields and will start planting on Monday. Who's joining me? 🌧️",
    likes: 28,
    comments: 15,
    timestamp: "1 day ago",
    tags: ["weather", "beans", "planting"]
  }
];

const topFarmers: Farmer[] = [
  {
    id: "1",
    name: "John Kamau",
    location: "Nakuru East",
    speciality: "Maize & Beans",
    experience: 15,
    successRate: 94,
    followers: 234,
    verified: true
  },
  {
    id: "2",
    name: "Grace Wanjiku",
    location: "Nakuru West",
    speciality: "Greenhouse Farming",
    experience: 8,
    successRate: 89,
    followers: 156,
    verified: false
  },
  {
    id: "3",
    name: "Peter Mwangi",
    location: "Nakuru South",
    speciality: "Organic Farming",
    experience: 20,
    successRate: 96,
    followers: 312,
    verified: true
  }
];

export const FarmerNetwork = () => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: "You",
        location: "Nakuru",
        verified: false,
        level: "New Farmer"
      },
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      tags: []
    };
    
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Farmer Network</h2>
          <p className="text-gray-600">Connect, learn, and grow together</p>
        </div>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="farmers">Top Farmers</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          {/* Create Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-500" />
                Share Your Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's happening on your farm? Share tips, ask questions, or celebrate your success!"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </Button>
                </div>
                <Button 
                  onClick={handlePost}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  disabled={!newPost.trim()}
                >
                  Share Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                        {post.author.verified && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            <Star className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {post.author.level}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <MapPin className="w-4 h-4" />
                        {post.author.location}
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      
                      {post.image && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-6 pt-2 border-t">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="text-gray-600 hover:text-red-500"
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          {post.likes}
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-500">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-500">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="farmers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topFarmers.map((farmer) => (
              <Card key={farmer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <Avatar className="w-20 h-20 mx-auto">
                      <AvatarImage src={farmer.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white text-lg">
                        {farmer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{farmer.name}</h3>
                        {farmer.verified && (
                          <Star className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {farmer.location}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Badge variant="outline" className="w-full justify-center">
                        {farmer.speciality}
                      </Badge>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-semibold text-green-600">{farmer.experience}y</div>
                          <div className="text-green-700">Experience</div>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="font-semibold text-blue-600">{farmer.successRate}%</div>
                          <div className="text-blue-700">Success</div>
                        </div>
                      </div>
                      
                      <div className="text-center text-sm text-gray-600">
                        {farmer.followers} followers
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">Follow</Button>
                      <Button size="sm" variant="outline" className="flex-1">Message</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">First Harvest</h3>
                <p className="text-sm text-gray-600 mb-4">Complete your first successful harvest</p>
                <Badge className="bg-yellow-500 hover:bg-yellow-600">Unlocked</Badge>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Community Helper</h3>
                <p className="text-sm text-gray-600 mb-4">Help 10 farmers with advice</p>
                <Badge variant="outline">3/10</Badge>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Yield Master</h3>
                <p className="text-sm text-gray-600 mb-4">Achieve 90%+ success rate</p>
                <Badge variant="outline">Locked</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};