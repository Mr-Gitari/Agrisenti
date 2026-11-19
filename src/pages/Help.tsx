import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, PhoneCall, HelpCircle, MessageCircle, Video, FileText, ExternalLink } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { UserGuide } from "@/components/UserGuide";
import { TutorialLauncher } from "@/components/InteractiveTutorial";
import { PDFGuide } from "@/components/PDFGuide";

export const Help = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("guide");
  
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (["guide", "tutorials", "pdf", "support"].includes(tab || "")) {
      setActiveTab(tab || "guide");
    }
  }, [searchParams]);
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="guide" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>User Guide</span>
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Tutorials</span>
          </TabsTrigger>
          <TabsTrigger value="pdf" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>PDF Guide</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <PhoneCall className="h-4 w-4" />
            <span>Support</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guide">
          <UserGuide />
        </TabsContent>

        <TabsContent value="tutorials" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive Tutorials</h2>
            <p className="text-gray-600">Step-by-step guided tutorials for AgriSenti features</p>
          </div>
          <TutorialLauncher />
        </TabsContent>

        <TabsContent value="pdf">
          <PDFGuide />
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Live Chat Support</h3>
                  <p className="text-sm text-gray-500 mt-1">Chat with our team for quick answers to your questions.</p>
                  <Button variant="outline" className="mt-3 text-green-600 bg-green-50 border-green-100 hover:bg-green-100">
                    Start Chat
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <PhoneCall className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Phone Support</h3>
                  <p className="text-sm text-gray-500 mt-1">Call our dedicated support line (Mon-Fri, 9AM-5PM).</p>
                  <Button variant="outline" className="mt-3 text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100">
                    +254 712 345678
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="bg-purple-100 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">Submit a Ticket</h3>
                  <p className="text-sm text-gray-500 mt-1">File a detailed support request for complex issues.</p>
                  <Button variant="outline" className="mt-3 text-purple-600 bg-purple-50 border-purple-100 hover:bg-purple-100">
                    Create Ticket
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start border-t pt-4">
              <h4 className="font-medium text-sm">Support Hours</h4>
              <p className="text-xs text-gray-500 mt-1">Our support team is available Monday-Friday, 9:00 AM - 5:00 PM East African Time.</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Help;

export default Help;
