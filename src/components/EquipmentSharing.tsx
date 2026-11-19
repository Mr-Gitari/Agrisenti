import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Tractor, 
  MapPin, 
  Clock, 
  Star, 
  Calendar,
  DollarSign,
  Plus,
  Search,
  Filter,
  Truck,
  Wrench,
  Zap
} from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  type: string;
  owner: {
    name: string;
    location: string;
    rating: number;
    avatar?: string;
  };
  pricePerDay: number;
  available: boolean;
  nextAvailable: string;
  description: string;
  features: string[];
  images: string[];
  rating: number;
  totalRentals: number;
}

interface Rental {
  id: string;
  equipment: string;
  renter: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  totalCost: number;
}

const mockEquipment: Equipment[] = [
  {
    id: "1",
    name: "John Deere 5055E Tractor",
    type: "Tractor",
    owner: {
      name: "Peter Mwangi",
      location: "Nakuru East",
      rating: 4.8,
      avatar: "/api/placeholder/40/40"
    },
    pricePerDay: 3500,
    available: true,
    nextAvailable: "Available now",
    description: "55HP tractor perfect for medium-scale farming. Includes plowing and harrowing attachments.",
    features: ["55HP Engine", "4WD", "Hydraulic Lift", "PTO", "Comfortable Cabin"],
    images: ["/api/placeholder/300/200"],
    rating: 4.7,
    totalRentals: 45
  },
  {
    id: "2",
    name: "Combine Harvester",
    type: "Harvester",
    owner: {
      name: "Grace Wanjiku",
      location: "Nakuru West",
      rating: 4.9,
      avatar: "/api/placeholder/40/40"
    },
    pricePerDay: 8000,
    available: false,
    nextAvailable: "Available from March 15",
    description: "Modern combine harvester for wheat, maize, and barley. Efficient and clean harvesting.",
    features: ["6m Cutting Width", "Grain Tank", "Straw Chopper", "GPS Ready"],
    images: ["/api/placeholder/300/200"],
    rating: 4.9,
    totalRentals: 28
  },
  {
    id: "3",
    name: "Irrigation Pump Set",
    type: "Irrigation",
    owner: {
      name: "John Kamau",
      location: "Nakuru South",
      rating: 4.6,
      avatar: "/api/placeholder/40/40"
    },
    pricePerDay: 1200,
    available: true,
    nextAvailable: "Available now",
    description: "High-pressure water pump with 100m hose. Perfect for drip irrigation systems.",
    features: ["5HP Motor", "100m Hose", "Multiple Nozzles", "Fuel Efficient"],
    images: ["/api/placeholder/300/200"],
    rating: 4.5,
    totalRentals: 67
  },
  {
    id: "4",
    name: "Seed Planter",
    type: "Planting",
    owner: {
      name: "Mary Njeri",
      location: "Nakuru Central",
      rating: 4.7,
      avatar: "/api/placeholder/40/40"
    },
    pricePerDay: 2000,
    available: true,
    nextAvailable: "Available now",
    description: "Precision seed planter for maize, beans, and other crops. Ensures optimal spacing.",
    features: ["4-Row Planter", "Adjustable Spacing", "Fertilizer Box", "Depth Control"],
    images: ["/api/placeholder/300/200"],
    rating: 4.6,
    totalRentals: 32
  }
];

const mockRentals: Rental[] = [
  {
    id: "1",
    equipment: "John Deere 5055E Tractor",
    renter: "You",
    startDate: "2024-03-10",
    endDate: "2024-03-12",
    status: "active",
    totalCost: 7000
  },
  {
    id: "2",
    equipment: "Irrigation Pump Set",
    renter: "You",
    startDate: "2024-02-28",
    endDate: "2024-03-02",
    status: "completed",
    totalCost: 3600
  }
];

export const EquipmentSharing = () => {
  const [equipment, setEquipment] = useState(mockEquipment);
  const [rentals, setRentals] = useState(mockRentals);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || item.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleRent = (equipmentId: string) => {
    // Simulate rental process
    const item = equipment.find(e => e.id === equipmentId);
    if (item) {
      const newRental: Rental = {
        id: Date.now().toString(),
        equipment: item.name,
        renter: "You",
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: "pending",
        totalCost: item.pricePerDay * 3
      };
      setRentals([newRental, ...rentals]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl">
          <Tractor className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Equipment Sharing</h2>
          <p className="text-gray-600">Rent and share farming equipment with your community</p>
        </div>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Equipment</TabsTrigger>
          <TabsTrigger value="rentals">My Rentals</TabsTrigger>
          <TabsTrigger value="share">Share Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 transform -translate-y-1/2" />
                    <Input
                      placeholder="Search equipment..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Equipment</SelectItem>
                    <SelectItem value="tractor">Tractors</SelectItem>
                    <SelectItem value="harvester">Harvesters</SelectItem>
                    <SelectItem value="irrigation">Irrigation</SelectItem>
                    <SelectItem value="planting">Planting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={item.images[0]} 
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${
                      item.available ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {item.available ? 'Available' : 'Busy'}
                  </Badge>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={item.owner.avatar} />
                        <AvatarFallback className="text-xs">
                          {item.owner.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{item.owner.name}</span>
                      <div className="flex items-center gap-1 ml-auto">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{item.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {item.owner.location}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <div className="text-lg font-bold text-green-600">
                          KSh {item.pricePerDay.toLocaleString()}/day
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.nextAvailable}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleRent(item.id)}
                        disabled={!item.available}
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                      >
                        {item.available ? 'Rent Now' : 'Not Available'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rentals" className="space-y-6">
          <div className="space-y-4">
            {rentals.map((rental) => (
              <Card key={rental.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{rental.equipment}</h3>
                        <Badge className={getStatusColor(rental.status)}>
                          {rental.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {rental.startDate} to {rental.endDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          KSh {rental.totalCost.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {rental.status === 'active' && (
                        <>
                          <Button variant="outline" size="sm">
                            Contact Owner
                          </Button>
                          <Button variant="outline" size="sm">
                            Extend Rental
                          </Button>
                        </>
                      )}
                      {rental.status === 'completed' && (
                        <Button variant="outline" size="sm">
                          Rate & Review
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="share" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-orange-500" />
                Share Your Equipment
              </CardTitle>
              <CardDescription>
                Earn extra income by sharing your farming equipment with the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="equipmentName">Equipment Name</Label>
                  <Input id="equipmentName" placeholder="e.g., John Deere Tractor" />
                </div>
                
                <div>
                  <Label htmlFor="equipmentType">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tractor">Tractor</SelectItem>
                      <SelectItem value="harvester">Harvester</SelectItem>
                      <SelectItem value="irrigation">Irrigation</SelectItem>
                      <SelectItem value="planting">Planting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="pricePerDay">Price per Day (KSh)</Label>
                  <Input id="pricePerDay" type="number" placeholder="3500" />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Nakuru East" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Describe your equipment and its features" />
              </div>
              
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                  List Equipment
                </Button>
                <Button variant="outline">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Earn Extra Income</h3>
                <p className="text-sm text-gray-600">
                  Make money from equipment that sits idle
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Help Community</h3>
                <p className="text-sm text-gray-600">
                  Support fellow farmers with affordable equipment access
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6 text-center">
                <Wrench className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Maintain Equipment</h3>
                <p className="text-sm text-gray-600">
                  Regular use keeps your equipment in good condition
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};