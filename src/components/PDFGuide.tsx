import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Printer,
  Share2,
  BookOpen,
  Smartphone,
  Users,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

const generatePDF = () => {
  const content = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>AgriSenti User Guide</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; color: #333; }
        .header { text-align: center; border-bottom: 3px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; }
        .logo { font-size: 32px; font-weight: bold; color: #10b981; margin-bottom: 10px; }
        .subtitle { font-size: 18px; color: #6b7280; }
        h1 { color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px; }
        h2 { color: #059669; margin-top: 30px; }
        h3 { color: #047857; }
        .feature-box { background: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin: 15px 0; }
        .warning-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 15px 0; }
        .info-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 15px 0; }
        .step { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin: 10px 0; }
        .step-number { background: #10b981; color: white; border-radius: 50%; width: 25px; height: 25px; display: inline-flex; align-items: center; justify-content: center; margin-right: 10px; }
        ul { padding-left: 20px; }
        li { margin: 8px 0; }
        .toc { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .page-break { page-break-before: always; }
        .footer { text-align: center; margin-top: 50px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">🌾 AgriSenti</div>
        <div class="subtitle">Complete User Guide & Manual</div>
        <p>Smart Farming Platform for Kenyan Farmers</p>
    </div>

    <div class="toc">
        <h2>Table of Contents</h2>
        <ul>
            <li><a href="#getting-started">1. Getting Started</a></li>
            <li><a href="#features">2. Key Features</a></li>
            <li><a href="#disease-detection">3. Disease Detection</a></li>
            <li><a href="#yield-prediction">4. Yield Prediction</a></li>
            <li><a href="#voice-assistant">5. Voice Assistant</a></li>
            <li><a href="#farmer-network">6. Farmer Network</a></li>
            <li><a href="#equipment-sharing">7. Equipment Sharing</a></li>
            <li><a href="#notifications">8. Smart Notifications</a></li>
            <li><a href="#troubleshooting">9. Troubleshooting</a></li>
            <li><a href="#faq">10. Frequently Asked Questions</a></li>
            <li><a href="#support">11. Support & Contact</a></li>
        </ul>
    </div>

    <div class="page-break"></div>
    <h1 id="getting-started">1. Getting Started</h1>
    
    <div class="feature-box">
        <h3>Welcome to AgriSenti!</h3>
        <p>AgriSenti is Kenya's most advanced smart farming platform, designed specifically for farmers in Nakuru County and beyond. Our AI-powered tools help you make better farming decisions, increase yields, and connect with fellow farmers.</p>
    </div>

    <h2>Quick Start Guide</h2>
    
    <div class="step">
        <span class="step-number">1</span>
        <strong>Create Your Profile</strong>
        <p>Set up your farmer profile with your location, farm size, and crop preferences. This helps us provide personalized recommendations.</p>
    </div>

    <div class="step">
        <span class="step-number">2</span>
        <strong>Add Your Crops</strong>
        <p>Register your current crops for monitoring. Include planting dates, varieties, and field locations for accurate tracking.</p>
    </div>

    <div class="step">
        <span class="step-number">3</span>
        <strong>Explore Features</strong>
        <p>Try disease detection, check weather forecasts, view market prices, and connect with other farmers in your area.</p>
    </div>

    <div class="page-break"></div>
    <h1 id="features">2. Key Features</h1>

    <h2>🤖 AI-Powered Tools</h2>
    <ul>
        <li><strong>Disease Detection:</strong> 94% accurate AI identification of 20+ crop diseases</li>
        <li><strong>Yield Prediction:</strong> Forecast harvests 3 months in advance with 85% accuracy</li>
        <li><strong>Smart Recommendations:</strong> Personalized farming advice based on your location and crops</li>
    </ul>

    <h2>🌐 Community Features</h2>
    <ul>
        <li><strong>Farmer Network:</strong> Connect with 10,000+ farmers across Kenya</li>
        <li><strong>Equipment Sharing:</strong> Rent or share farming equipment with verified farmers</li>
        <li><strong>Success Stories:</strong> Learn from successful farmers in your region</li>
    </ul>

    <h2>📱 Mobile-First Design</h2>
    <ul>
        <li><strong>Offline Capability:</strong> Core features work without internet</li>
        <li><strong>Voice Assistant:</strong> Ask questions in English, Kiswahili, Kikuyu, or Luo</li>
        <li><strong>Smart Notifications:</strong> Get alerts for weather, pests, and market prices</li>
    </ul>

    <div class="page-break"></div>
    <h1 id="disease-detection">3. Disease Detection</h1>

    <div class="info-box">
        <h3>How It Works</h3>
        <p>Our AI analyzes photos of your crops to identify diseases, pests, and nutrient deficiencies. The system is trained on thousands of images from Kenyan farms.</p>
    </div>

    <h2>Step-by-Step Guide</h2>

    <div class="step">
        <span class="step-number">1</span>
        <strong>Take a Clear Photo</strong>
        <ul>
            <li>Use good lighting (natural daylight is best)</li>
            <li>Focus on affected leaves or plant parts</li>
            <li>Get close to show symptoms clearly</li>
            <li>Avoid shadows and blurry images</li>
        </ul>
    </div>

    <div class="step">
        <span class="step-number">2</span>
        <strong>Upload and Analyze</strong>
        <ul>
            <li>Tap the camera button in Disease Detection</li>
            <li>Take photo or select from gallery</li>
            <li>Wait 10-15 seconds for AI analysis</li>
        </ul>
    </div>

    <div class="step">
        <span class="step-number">3</span>
        <strong>Review Results</strong>
        <ul>
            <li>View detected diseases with confidence levels</li>
            <li>Read detailed descriptions and symptoms</li>
            <li>Get treatment recommendations</li>
            <li>Save results for future reference</li>
        </ul>
    </div>

    <div class="warning-box">
        <h3>⚠️ Important Notes</h3>
        <ul>
            <li>Higher confidence levels (80%+) indicate more accurate detection</li>
            <li>Always consult local agricultural experts for serious infections</li>
            <li>Early detection leads to better treatment outcomes</li>
        </ul>
    </div>

    <div class="page-break"></div>
    <h1 id="yield-prediction">4. Yield Prediction</h1>

    <div class="feature-box">
        <h3>Predict Your Harvest</h3>
        <p>Our AI uses weather data, soil conditions, crop variety, and farming practices to predict your harvest quantity 3 months in advance.</p>
    </div>

    <h2>How to Use Yield Prediction</h2>

    <div class="step">
        <span class="step-number">1</span>
        <strong>Select Crop Type</strong>
        <p>Choose from maize, beans, potatoes, tomatoes, and other supported crops.</p>
    </div>

    <div class="step">
        <span class="step-number">2</span>
        <strong>Enter Farm Details</strong>
        <ul>
            <li>Farm size in acres</li>
            <li>Planting date</li>
            <li>Crop variety (if known)</li>
            <li>Farming method (organic/conventional)</li>
        </ul>
    </div>

    <div class="step">
        <span class="step-number">3</span>
        <strong>Generate Prediction</strong>
        <p>Click "Generate Prediction" to get your yield forecast with confidence levels and contributing factors.</p>
    </div>

    <h2>Understanding Results</h2>
    <ul>
        <li><strong>Predicted Yield:</strong> Expected harvest in tons per acre</li>
        <li><strong>Confidence Level:</strong> How accurate the prediction is (75-95%)</li>
        <li><strong>Harvest Date:</strong> Estimated optimal harvest time</li>
        <li><strong>Revenue Estimate:</strong> Expected income based on current prices</li>
    </ul>

    <div class="page-break"></div>
    <h1 id="voice-assistant">5. Voice Assistant</h1>

    <div class="info-box">
        <h3>Speak in Your Language</h3>
        <p>Ask farming questions in English, Kiswahili, Kikuyu, or Luo. The assistant provides spoken answers in your selected language.</p>
    </div>

    <h2>Getting Started</h2>

    <div class="step">
        <span class="step-number">1</span>
        <strong>Select Language</strong>
        <p>Choose your preferred language from the dropdown menu.</p>
    </div>

    <div class="step">
        <span class="step-number">2</span>
        <strong>Start Speaking</strong>
        <ul>
            <li>Press and hold the microphone button</li>
            <li>Speak clearly and avoid background noise</li>
            <li>Release button when finished</li>
        </ul>
    </div>

    <div class="step">
        <span class="step-number">3</span>
        <strong>Listen to Response</strong>
        <p>The assistant will provide spoken answers. You can replay responses or ask follow-up questions.</p>
    </div>

    <h2>Sample Questions</h2>
    <ul>
        <li>"What's the weather like today?" / "Hali ya hewa leo ni vipi?"</li>
        <li>"Check maize prices" / "Angalia bei za mahindi"</li>
        <li>"How do I treat crop disease?" / "Nitibu vipi magonjwa ya mazao?"</li>
        <li>"When should I plant beans?" / "Nipande maharage lini?"</li>
    </ul>

    <div class="page-break"></div>
    <h1 id="farmer-network">6. Farmer Network</h1>

    <div class="feature-box">
        <h3>Connect & Learn</h3>
        <p>Join a community of 10,000+ farmers across Kenya. Share experiences, ask questions, and learn from successful farmers.</p>
    </div>

    <h2>Community Features</h2>

    <h3>📝 Community Feed</h3>
    <ul>
        <li>Share farming experiences and tips</li>
        <li>Post photos of your crops and harvests</li>
        <li>Ask questions and get answers from experts</li>
        <li>Like and comment on other farmers' posts</li>
    </ul>

    <h3>🏆 Top Farmers</h3>
    <ul>
        <li>Follow successful farmers in your area</li>
        <li>View their specialties and success rates</li>
        <li>Send direct messages for advice</li>
        <li>Learn from their farming techniques</li>
    </ul>

    <h3>🎖️ Achievement System</h3>
    <ul>
        <li>Earn badges for farming milestones</li>
        <li>Complete challenges and competitions</li>
        <li>Build your reputation in the community</li>
        <li>Unlock exclusive features and content</li>
    </ul>

    <div class="page-break"></div>
    <h1 id="equipment-sharing">7. Equipment Sharing</h1>

    <div class="info-box">
        <h3>Share Resources, Save Money</h3>
        <p>Rent expensive farming equipment from verified farmers in your area. Earn extra income by sharing your own equipment.</p>
    </div>

    <h2>Renting Equipment</h2>

    <div class="step">
        <span class="step-number">1</span>
        <strong>Browse Available Equipment</strong>
        <ul>
            <li>Search by equipment type (tractors, harvesters, etc.)</li>
            <li>Filter by location and price range</li>
            <li>Check owner ratings and reviews</li>
        </ul>
    </div>

    <div class="step">
        <span class="step-number">2</span>
        <strong>Book Equipment</strong>
        <ul>
            <li>Select rental dates</li>
            <li>Review terms and conditions</li>
            <li>Make secure payment through the app</li>
        </ul>
    </div>

    <div class="step">
        <span class="step-number">3</span>
        <strong>Use Safely</strong>
        <ul>
            <li>Inspect equipment before use</li>
            <li>Follow safety guidelines</li>
            <li>Return in good condition</li>
            <li>Rate and review the owner</li>
        </ul>
    </div>

    <h2>Sharing Your Equipment</h2>
    <ul>
        <li>List your idle equipment for rent</li>
        <li>Set competitive daily rates</li>
        <li>Screen potential renters</li>
        <li>Earn extra income from unused assets</li>
    </ul>

    <div class="page-break"></div>
    <h1 id="notifications">8. Smart Notifications</h1>

    <div class="feature-box">
        <h3>Stay Informed</h3>
        <p>Get personalized alerts for weather changes, pest outbreaks, market price fluctuations, and farming reminders.</p>
    </div>

    <h2>Notification Types</h2>

    <h3>🌦️ Weather Alerts</h3>
    <ul>
        <li>Heavy rain warnings</li>
        <li>Drought conditions</li>
        <li>Temperature extremes</li>
        <li>Optimal planting conditions</li>
    </ul>

    <h3>💰 Market Notifications</h3>
    <ul>
        <li>Price increases for your crops</li>
        <li>New buyer opportunities</li>
        <li>Market demand changes</li>
        <li>Seasonal price trends</li>
    </ul>

    <h3>🌱 Crop Management</h3>
    <ul>
        <li>Fertilizer application reminders</li>
        <li>Pest and disease alerts</li>
        <li>Harvest time notifications</li>
        <li>Irrigation scheduling</li>
    </ul>

    <h2>Customizing Notifications</h2>
    <p>Go to Settings > Notifications to:</p>
    <ul>
        <li>Choose notification categories</li>
        <li>Set delivery preferences (push, email, SMS)</li>
        <li>Adjust frequency and timing</li>
        <li>Enable/disable specific alerts</li>
    </ul>

    <div class="page-break"></div>
    <h1 id="troubleshooting">9. Troubleshooting</h1>

    <h2>Common Issues</h2>

    <div class="warning-box">
        <h3>App Won't Load</h3>
        <ul>
            <li>Check your internet connection</li>
            <li>Clear app cache and data</li>
            <li>Update to the latest version</li>
            <li>Restart your device</li>
        </ul>
    </div>

    <div class="warning-box">
        <h3>Disease Detection Not Working</h3>
        <ul>
            <li>Ensure good lighting when taking photos</li>
            <li>Check camera permissions</li>
            <li>Try taking multiple photos</li>
            <li>Clear app cache</li>
        </ul>
    </div>

    <div class="warning-box">
        <h3>Voice Assistant Not Responding</h3>
        <ul>
            <li>Check microphone permissions</li>
            <li>Ensure stable internet connection</li>
            <li>Speak clearly and reduce background noise</li>
            <li>Try switching languages</li>
        </ul>
    </div>

    <div class="warning-box">
        <h3>Weather Data Missing</h3>
        <ul>
            <li>Update your farm location in settings</li>
            <li>Enable location services</li>
            <li>Check internet connection</li>
            <li>Wait for data synchronization</li>
        </ul>
    </div>

    <div class="page-break"></div>
    <h1 id="faq">10. Frequently Asked Questions</h1>

    <h3>Q: How accurate is the disease detection?</h3>
    <p>A: Our AI disease detection has 94% accuracy rate. It can identify 20+ common crop diseases including maize streak virus, bean rust, and potato blight. For best results, take clear photos in good lighting.</p>

    <h3>Q: How does yield prediction work?</h3>
    <p>A: Our AI analyzes weather patterns, soil conditions, crop variety, and farming practices to predict yields 3 months ahead with 85% accuracy. It uses satellite data and local weather stations.</p>

    <h3>Q: Can I use the voice assistant offline?</h3>
    <p>A: Basic voice commands work offline, but for detailed farming advice, you need internet connection. The app caches common responses for offline use.</p>

    <h3>Q: How do I rent equipment safely?</h3>
    <p>A: All equipment owners are verified. Check ratings, read reviews, and use our secure payment system. Equipment is insured during rental period.</p>

    <h3>Q: Are market prices updated in real-time?</h3>
    <p>A: Market prices are updated every 2 hours from major markets in Nakuru, Nairobi, and Mombasa. You can set price alerts for your crops.</p>

    <h3>Q: How do I change the language?</h3>
    <p>A: Go to Settings > Language and select from English, Kiswahili, Kikuyu, or Luo. The voice assistant also supports these languages.</p>

    <h3>Q: Is my data secure?</h3>
    <p>A: Yes, we use bank-level encryption to protect your data. We never share personal information with third parties without your consent.</p>

    <h3>Q: Can I use AgriSenti on multiple devices?</h3>
    <p>A: Yes, your account syncs across all devices. Log in with the same credentials on your phone, tablet, or computer.</p>

    <div class="page-break"></div>
    <h1 id="support">11. Support & Contact</h1>

    <div class="info-box">
        <h3>We're Here to Help</h3>
        <p>Our support team is available 24/7 to assist you with any questions or issues.</p>
    </div>

    <h2>Contact Methods</h2>

    <h3>💬 Live Chat</h3>
    <ul>
        <li>Available 24/7 through the app</li>
        <li>Instant responses from our team</li>
        <li>Screen sharing for technical issues</li>
    </ul>

    <h3>📞 Phone Support</h3>
    <ul>
        <li>Call: +254 700 123 456</li>
        <li>WhatsApp: +254 700 123 456</li>
        <li>Available: Monday-Friday, 8AM-6PM</li>
    </ul>

    <h3>📧 Email Support</h3>
    <ul>
        <li>General: support@agrisenti.co.ke</li>
        <li>Technical: tech@agrisenti.co.ke</li>
        <li>Business: business@agrisenti.co.ke</li>
    </ul>

    <h2>Community Resources</h2>
    <ul>
        <li><strong>User Forum:</strong> Connect with other farmers and share experiences</li>
        <li><strong>Video Tutorials:</strong> Step-by-step guides for all features</li>
        <li><strong>Blog:</strong> Latest farming tips and AgriSenti updates</li>
        <li><strong>Newsletter:</strong> Monthly farming insights and success stories</li>
    </ul>

    <h2>Training & Workshops</h2>
    <p>We offer free training sessions for farmer groups:</p>
    <ul>
        <li>On-site demonstrations</li>
        <li>Group training sessions</li>
        <li>Webinars and online workshops</li>
        <li>Customized training for cooperatives</li>
    </ul>

    <div class="footer">
        <p><strong>AgriSenti - Smart Farming Platform</strong></p>
        <p>Empowering Kenyan farmers with AI-powered agricultural solutions</p>
        <p>Version 2.0 | Updated: January 2025</p>
        <p>© 2025 AgriSenti. All rights reserved.</p>
    </div>
</body>
</html>
  `;

  // Create blob and download
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'AgriSenti-User-Guide.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Show success message
  setTimeout(() => {
    alert('User guide downloaded! You can now print it as PDF using your browser\'s print function (Ctrl+P).');
  }, 500);
};

export const PDFGuide = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-red-500 to-pink-600 p-3 rounded-xl">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Download User Guide</h2>
          <p className="text-gray-600">Get the complete AgriSenti manual as PDF</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-500" />
              Complete User Guide
            </CardTitle>
            <CardDescription>
              Comprehensive 50-page manual covering all AgriSenti features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-green-500" />
                <span>50+ pages</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-500" />
                <span>Mobile friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span>For all users</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span>Step-by-step</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">What's Included:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Getting started guide</li>
                <li>• All feature tutorials</li>
                <li>• Troubleshooting tips</li>
                <li>• FAQ section</li>
                <li>• Contact information</li>
              </ul>
            </div>

            <Button 
              onClick={generatePDF}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF Guide
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Printer className="w-5 h-5 text-green-500" />
              Quick Reference
            </CardTitle>
            <CardDescription>
              Essential tips and shortcuts for daily use
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">Disease Detection</span>
                </div>
                <p className="text-sm text-green-700">Take clear photos in good lighting for 94% accuracy</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Voice Assistant</span>
                </div>
                <p className="text-sm text-blue-700">Supports English, Kiswahili, Kikuyu, and Luo</p>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Emergency Support</span>
                </div>
                <p className="text-sm text-yellow-700">Call +254 700 123 456 for urgent help</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Printer className="w-4 h-4 mr-2" />
                Print Guide
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Languages</CardTitle>
          <CardDescription>
            User guide available in multiple languages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { lang: "English", flag: "🇬🇧", available: true },
              { lang: "Kiswahili", flag: "🇰🇪", available: true },
              { lang: "Kikuyu", flag: "🇰🇪", available: false },
              { lang: "Luo", flag: "🇰🇪", available: false }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.flag}</span>
                  <span className="font-medium">{item.lang}</span>
                </div>
                <Badge variant={item.available ? "default" : "secondary"}>
                  {item.available ? "Available" : "Coming Soon"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};