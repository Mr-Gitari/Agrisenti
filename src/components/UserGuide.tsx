import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen, 
  Search, 
  Play, 
  CheckCircle, 
  HelpCircle,
  Video,
  FileText,
  MessageCircle,
  Star,
  ArrowRight,
  Lightbulb,
  Users,
  Smartphone,
  Download
} from "lucide-react";

interface GuideStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  duration: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

const quickStartSteps: GuideStep[] = [
  {
    id: "1",
    title: "Create Your Profile",
    description: "Set up your farmer profile with location and crop preferences",
    completed: true,
    duration: "2 min"
  },
  {
    id: "2", 
    title: "Add Your First Crop",
    description: "Register your current crops for monitoring and advice",
    completed: true,
    duration: "3 min"
  },
  {
    id: "3",
    title: "Try Disease Detection",
    description: "Take a photo of your crop to check for diseases",
    completed: false,
    duration: "1 min"
  },
  {
    id: "4",
    title: "Check Weather & Market",
    description: "View weather forecasts and current market prices",
    completed: false,
    duration: "2 min"
  },
  {
    id: "5",
    title: "Join Farmer Network",
    description: "Connect with other farmers in your area",
    completed: false,
    duration: "5 min"
  }
];

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How accurate is the disease detection?",
    answer: "Our AI disease detection has 94% accuracy rate. It can identify 20+ common crop diseases including maize streak virus, bean rust, and potato blight. For best results, take clear photos in good lighting.",
    category: "Disease Detection",
    helpful: 45
  },
  {
    id: "2",
    question: "How does yield prediction work?",
    answer: "Our AI analyzes weather patterns, soil conditions, crop variety, and farming practices to predict yields 3 months ahead with 85% accuracy. It uses satellite data and local weather stations.",
    category: "Yield Prediction",
    helpful: 38
  },
  {
    id: "3",
    question: "Can I use the voice assistant offline?",
    answer: "Basic voice commands work offline, but for detailed farming advice, you need internet connection. The app caches common responses for offline use.",
    category: "Voice Assistant",
    helpful: 29
  },
  {
    id: "4",
    question: "How do I rent equipment safely?",
    answer: "All equipment owners are verified. Check ratings, read reviews, and use our secure payment system. Equipment is insured during rental period.",
    category: "Equipment Sharing",
    helpful: 33
  },
  {
    id: "5",
    question: "Are market prices updated in real-time?",
    answer: "Market prices are updated every 2 hours from major markets in Nakuru, Nairobi, and Mombasa. You can set price alerts for your crops.",
    category: "Market Prices",
    helpful: 41
  },
  {
    id: "6",
    question: "How do I change the language?",
    answer: "Go to Settings > Language and select from English, Kiswahili, Kikuyu, or Luo. The voice assistant also supports these languages.",
    category: "Settings",
    helpful: 22
  }
];

const tutorials = [
  {
    id: "1",
    title: "Getting Started with AgriSenti",
    description: "Complete walkthrough for new users",
    duration: "8 min",
    type: "video",
    difficulty: "Beginner"
  },
  {
    id: "2",
    title: "Using AI Disease Detection",
    description: "How to scan crops and interpret results",
    duration: "5 min",
    type: "interactive",
    difficulty: "Beginner"
  },
  {
    id: "3",
    title: "Maximizing Yield Predictions",
    description: "Tips for accurate yield forecasting",
    duration: "6 min",
    type: "video",
    difficulty: "Intermediate"
  },
  {
    id: "4",
    title: "Building Your Farmer Network",
    description: "Connect and learn from other farmers",
    duration: "4 min",
    type: "interactive",
    difficulty: "Beginner"
  }
];

export const UserGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [completedSteps, setCompletedSteps] = useState(quickStartSteps);

  const categories = ["all", ...Array.from(new Set(faqs.map(faq => faq.category)))];
  
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const markStepComplete = (stepId: string) => {
    setCompletedSteps(steps => 
      steps.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    );
  };

  const completedCount = completedSteps.filter(step => step.completed).length;
  const progressPercentage = (completedCount / completedSteps.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Guide & Help</h2>
          <p className="text-gray-600">Everything you need to know about AgriSenti</p>
        </div>
      </div>

      <Tabs defaultValue="quickstart" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="quickstart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Quick Start Guide</span>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('/dashboard/help?tab=pdf', '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PDF Guide
                  </Button>
                  <Badge variant="outline">
                    {completedCount}/{completedSteps.length} Complete
                  </Badge>
                </div>
              </CardTitle>
              <CardDescription>
                Get up and running with AgriSenti in just a few steps
              </CardDescription>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedSteps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {step.duration}
                    </Badge>
                    {!step.completed && (
                      <Button 
                        size="sm"
                        onClick={() => markStepComplete(step.id)}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <Smartphone className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
                <p className="text-sm text-gray-600">
                  Works perfectly on your smartphone, even with slow internet
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Community Driven</h3>
                <p className="text-sm text-gray-600">
                  Learn from thousands of farmers across Kenya
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <Lightbulb className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">AI Powered</h3>
                <p className="text-sm text-gray-600">
                  Advanced AI for disease detection and yield prediction
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      tutorial.type === 'video' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {tutorial.type === 'video' ? (
                        <Video className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{tutorial.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {tutorial.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {tutorial.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {tutorial.duration}
                        </span>
                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                          <Play className="w-4 h-4 mr-2" />
                          Start Tutorial
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 transform -translate-y-1/2" />
                    <Input
                      placeholder="Search frequently asked questions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Accordion */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about AgriSenti
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-7 space-y-3">
                        <p className="text-gray-700">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{faq.helpful} found this helpful</span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  Contact Support
                </CardTitle>
                <CardDescription>
                  Get help from our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">Live Chat</p>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                    <Button size="sm" className="ml-auto">
                      Start Chat
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <FileText className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-gray-900">WhatsApp</p>
                      <p className="text-sm text-gray-600">+254 700 123 456</p>
                    </div>
                    <Button size="sm" variant="outline" className="ml-auto">
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>
                  Common help resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-3" />
                  User Manual (PDF)
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
                
                <Button variant="ghost" className="w-full justify-start">
                  <Video className="w-4 h-4 mr-3" />
                  Video Tutorials
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
                
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-3" />
                  Community Forum
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
                
                <Button variant="ghost" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-3" />
                  Report a Bug
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current status of AgriSenti services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { service: "Disease Detection AI", status: "operational" },
                  { service: "Weather Data", status: "operational" },
                  { service: "Market Prices", status: "operational" },
                  { service: "Voice Assistant", status: "maintenance" },
                  { service: "Equipment Sharing", status: "operational" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{item.service}</span>
                    <Badge 
                      className={
                        item.status === 'operational' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {item.status === 'operational' ? '✓ Operational' : '⚠ Maintenance'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};