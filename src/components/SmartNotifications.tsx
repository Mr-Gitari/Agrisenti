import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Cloud, 
  TrendingUp, 
  Sprout, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  MapPin,
  Smartphone,
  Mail,
  MessageSquare
} from "lucide-react";

interface Notification {
  id: string;
  type: 'weather' | 'market' | 'crop' | 'reminder' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  actionable: boolean;
  location?: string;
}

interface NotificationSettings {
  weather: boolean;
  market: boolean;
  crop: boolean;
  reminders: boolean;
  push: boolean;
  email: boolean;
  sms: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "weather",
    title: "Heavy Rain Alert",
    message: "Heavy rainfall expected in Nakuru East tomorrow. Consider covering your crops and checking drainage systems.",
    timestamp: "2 minutes ago",
    priority: "urgent",
    read: false,
    actionable: true,
    location: "Nakuru East"
  },
  {
    id: "2",
    type: "market",
    title: "Maize Price Surge",
    message: "Maize prices increased by 15% at Nakuru Central Market. Current price: KSh 3,200 per 90kg bag.",
    timestamp: "1 hour ago",
    priority: "high",
    read: false,
    actionable: true,
    location: "Nakuru Central"
  },
  {
    id: "3",
    type: "crop",
    title: "Optimal Planting Time",
    message: "Weather conditions are perfect for planting beans. Soil moisture at 65% - ideal for germination.",
    timestamp: "3 hours ago",
    priority: "medium",
    read: true,
    actionable: true
  },
  {
    id: "4",
    type: "reminder",
    title: "Fertilizer Application Due",
    message: "Your maize crop is ready for the second fertilizer application. Apply DAP fertilizer this week.",
    timestamp: "1 day ago",
    priority: "medium",
    read: true,
    actionable: true
  },
  {
    id: "5",
    type: "alert",
    title: "Pest Alert: Fall Armyworm",
    message: "Fall armyworm spotted in neighboring farms. Inspect your maize crops and apply preventive measures.",
    timestamp: "2 days ago",
    priority: "high",
    read: false,
    actionable: true,
    location: "Nakuru Region"
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'weather': return <Cloud className="w-5 h-5" />;
    case 'market': return <TrendingUp className="w-5 h-5" />;
    case 'crop': return <Sprout className="w-5 h-5" />;
    case 'reminder': return <Clock className="w-5 h-5" />;
    case 'alert': return <AlertTriangle className="w-5 h-5" />;
    default: return <Bell className="w-5 h-5" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
    case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const SmartNotifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [settings, setSettings] = useState<NotificationSettings>({
    weather: true,
    market: true,
    crop: true,
    reminders: true,
    push: true,
    email: false,
    sms: false
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const updateSetting = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          id: Date.now().toString(),
          type: "weather" as const,
          title: "Weather Update",
          message: "Temperature dropping to 18°C tonight. Consider protecting sensitive crops.",
          timestamp: "Just now",
          priority: "medium" as const,
          read: false,
          actionable: true
        },
        {
          id: Date.now().toString(),
          type: "market" as const,
          title: "Price Alert",
          message: "Tomato prices reached your target of KSh 80/kg at Nakuru Market.",
          timestamp: "Just now",
          priority: "high" as const,
          read: false,
          actionable: true
        }
      ];

      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        const newNotification = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
        setNotifications(prev => [newNotification, ...prev]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl relative">
            <Bell className="w-6 h-6 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Smart Notifications</h2>
            <p className="text-gray-600">Stay updated with personalized farming alerts</p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" size="sm">
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">
            Notifications ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-600">No new notifications at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        notification.type === 'weather' ? 'bg-blue-100 text-blue-600' :
                        notification.type === 'market' ? 'bg-green-100 text-green-600' :
                        notification.type === 'crop' ? 'bg-emerald-100 text-emerald-600' :
                        notification.type === 'reminder' ? 'bg-purple-100 text-purple-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(notification.priority)}`}
                          >
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notification.timestamp}
                          </span>
                          {notification.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {notification.location}
                            </span>
                          )}
                        </div>
                        
                        {notification.actionable && (
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button size="sm">
                              Take Action
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Categories</CardTitle>
              <CardDescription>Choose what types of notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Cloud className="w-5 h-5 text-blue-500" />
                  <div>
                    <Label htmlFor="weather">Weather Alerts</Label>
                    <p className="text-sm text-gray-600">Rain, temperature, and weather warnings</p>
                  </div>
                </div>
                <Switch
                  id="weather"
                  checked={settings.weather}
                  onCheckedChange={(checked) => updateSetting('weather', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <div>
                    <Label htmlFor="market">Market Prices</Label>
                    <p className="text-sm text-gray-600">Price changes and market opportunities</p>
                  </div>
                </div>
                <Switch
                  id="market"
                  checked={settings.market}
                  onCheckedChange={(checked) => updateSetting('market', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sprout className="w-5 h-5 text-emerald-500" />
                  <div>
                    <Label htmlFor="crop">Crop Management</Label>
                    <p className="text-sm text-gray-600">Planting times, pest alerts, and crop care</p>
                  </div>
                </div>
                <Switch
                  id="crop"
                  checked={settings.crop}
                  onCheckedChange={(checked) => updateSetting('crop', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <div>
                    <Label htmlFor="reminders">Reminders</Label>
                    <p className="text-sm text-gray-600">Fertilizer, irrigation, and harvest reminders</p>
                  </div>
                </div>
                <Switch
                  id="reminders"
                  checked={settings.reminders}
                  onCheckedChange={(checked) => updateSetting('reminders', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Methods</CardTitle>
              <CardDescription>How would you like to receive notifications?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-blue-500" />
                  <div>
                    <Label htmlFor="push">Push Notifications</Label>
                    <p className="text-sm text-gray-600">Instant notifications on your device</p>
                  </div>
                </div>
                <Switch
                  id="push"
                  checked={settings.push}
                  onCheckedChange={(checked) => updateSetting('push', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-green-500" />
                  <div>
                    <Label htmlFor="email">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Daily summary and important alerts</p>
                  </div>
                </div>
                <Switch
                  id="email"
                  checked={settings.email}
                  onCheckedChange={(checked) => updateSetting('email', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                  <div>
                    <Label htmlFor="sms">SMS Alerts</Label>
                    <p className="text-sm text-gray-600">Critical alerts via text message</p>
                  </div>
                </div>
                <Switch
                  id="sms"
                  checked={settings.sms}
                  onCheckedChange={(checked) => updateSetting('sms', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};