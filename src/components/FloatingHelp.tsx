import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  X, 
  MessageCircle, 
  BookOpen, 
  Video,
  Search,
  ArrowRight,
  Lightbulb,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickHelp = [
  {
    question: "How do I scan for crop diseases?",
    answer: "Go to Disease Detection, tap the camera button, and take a clear photo of affected leaves.",
    action: "Try Disease Detection",
    path: "/dashboard/disease-detection"
  },
  {
    question: "How accurate is yield prediction?",
    answer: "Our AI predicts yields with 85% accuracy using weather, soil, and crop data.",
    action: "Try Yield Prediction", 
    path: "/dashboard/yield-prediction"
  },
  {
    question: "Can I use voice commands?",
    answer: "Yes! Use the Voice Assistant in English, Kiswahili, Kikuyu, or Luo.",
    action: "Try Voice Assistant",
    path: "/dashboard/voice-assistant"
  },
  {
    question: "How do I connect with other farmers?",
    answer: "Join the Farmer Network to share experiences and learn from others.",
    action: "Join Network",
    path: "/dashboard/farmer-network"
  }
];

export const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleQuickAction = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Help Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        size="icon"
      >
        <HelpCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Help Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 z-45"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Help Card */}
          <Card className="fixed bottom-24 left-6 w-96 z-50 shadow-2xl border-2 border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Quick Help</CardTitle>
                  <CardDescription className="text-blue-100">
                    Get instant answers and guidance
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 space-y-4">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleQuickAction('/dashboard/help')}
                  className="justify-start"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  User Guide
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleQuickAction('/dashboard/help?tab=tutorials')}
                  className="justify-start"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Tutorials
                </Button>
              </div>

              {/* Quick Help Items */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Common Questions
                </h4>
                
                {quickHelp.slice(0, 3).map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-sm text-gray-900 mb-1">
                      {item.question}
                    </h5>
                    <p className="text-xs text-gray-600 mb-2">
                      {item.answer}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleQuickAction(item.path)}
                      className="text-xs h-7"
                    >
                      {item.action}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Contact Support */}
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Need more help?</p>
                    <p className="text-xs text-gray-600">Contact our support team</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>All systems operational</span>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  ✓ Online
                </Badge>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};