import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Calendar, MapPin, Zap, AlertTriangle, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface YieldPrediction {
  crop: string;
  predictedYield: number;
  confidence: number;
  harvestDate: string;
  factors: {
    weather: number;
    soil: number;
    season: number;
    management: number;
  };
}

const cropData = [
  { name: "Maize", avgYield: 2.5, season: "Long rains" },
  { name: "Beans", avgYield: 1.2, season: "Short rains" },
  { name: "Potatoes", avgYield: 15, season: "Year round" },
  { name: "Tomatoes", avgYield: 25, season: "Dry season" },
];

const mockPredictionData = [
  { month: "Jan", predicted: 2.1, actual: 2.0 },
  { month: "Feb", predicted: 2.3, actual: 2.2 },
  { month: "Mar", predicted: 2.5, actual: 2.4 },
  { month: "Apr", predicted: 2.8, actual: null },
  { month: "May", predicted: 3.0, actual: null },
  { month: "Jun", predicted: 2.9, actual: null },
];

export const YieldPrediction = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [prediction, setPrediction] = useState<YieldPrediction | null>(null);
  const [loading, setLoading] = useState(false);

  const generatePrediction = async () => {
    if (!selectedCrop || !farmSize || !plantingDate) return;
    
    setLoading(true);
    
    // Simulate AI prediction
    setTimeout(() => {
      const crop = cropData.find(c => c.name === selectedCrop);
      const baseYield = crop?.avgYield || 2;
      const size = parseFloat(farmSize);
      
      // Add some randomness for realistic prediction
      const weatherFactor = 0.8 + Math.random() * 0.4; // 0.8 - 1.2
      const predictedYield = baseYield * size * weatherFactor;
      
      const harvestDate = new Date(plantingDate);
      harvestDate.setMonth(harvestDate.getMonth() + 4); // 4 months growth period
      
      setPrediction({
        crop: selectedCrop,
        predictedYield: Math.round(predictedYield * 10) / 10,
        confidence: Math.round((75 + Math.random() * 20)),
        harvestDate: harvestDate.toLocaleDateString(),
        factors: {
          weather: Math.round(70 + Math.random() * 25),
          soil: Math.round(80 + Math.random() * 15),
          season: Math.round(85 + Math.random() * 10),
          management: Math.round(75 + Math.random() * 20),
        }
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Yield Prediction</h2>
          <p className="text-gray-600">Predict your harvest 3 months in advance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Prediction Setup
            </CardTitle>
            <CardDescription>Enter your crop details for AI analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="crop">Crop Type</Label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {cropData.map(crop => (
                    <SelectItem key={crop.name} value={crop.name}>
                      {crop.name} ({crop.season})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="farmSize">Farm Size (acres)</Label>
              <Input
                id="farmSize"
                type="number"
                placeholder="e.g., 2.5"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="plantingDate">Planting Date</Label>
              <Input
                id="plantingDate"
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
              />
            </div>

            <Button 
              onClick={generatePrediction} 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              disabled={loading || !selectedCrop || !farmSize || !plantingDate}
            >
              {loading ? "Analyzing..." : "Generate Prediction"}
            </Button>
          </CardContent>
        </Card>

        {/* Prediction Results */}
        <div className="lg:col-span-2 space-y-6">
          {prediction && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Yield Prediction Results</span>
                    <Badge variant={prediction.confidence > 80 ? "default" : "secondary"}>
                      {prediction.confidence}% Confidence
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">
                        {prediction.predictedYield} tons
                      </div>
                      <div className="text-sm text-green-700">Expected Yield</div>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-lg font-semibold text-blue-600 flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {prediction.harvestDate}
                      </div>
                      <div className="text-sm text-blue-700">Harvest Date</div>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-lg font-semibold text-purple-600">
                        KSh {(prediction.predictedYield * 50000).toLocaleString()}
                      </div>
                      <div className="text-sm text-purple-700">Est. Revenue</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Factors Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Prediction Factors</CardTitle>
                  <CardDescription>Key factors affecting your yield prediction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(prediction.factors).map(([factor, score]) => (
                      <div key={factor} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="capitalize font-medium">{factor}</span>
                          <span className="text-sm text-gray-600">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Historical Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Yield Trends</CardTitle>
              <CardDescription>Predicted vs actual yields over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockPredictionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Predicted"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Actual"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};