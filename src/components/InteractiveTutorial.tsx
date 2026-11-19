import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Pause,
  RotateCcw,
  CheckCircle,
  Lightbulb,
  Target
} from "lucide-react";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for highlighting
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: 'click' | 'hover' | 'input';
  tip?: string;
}

interface Tutorial {
  id: string;
  name: string;
  description: string;
  steps: TutorialStep[];
  estimatedTime: string;
}

const tutorials: Tutorial[] = [
  {
    id: "disease-detection",
    name: "Disease Detection Tutorial",
    description: "Learn how to scan your crops for diseases using AI",
    estimatedTime: "3 minutes",
    steps: [
      {
        id: "1",
        title: "Welcome to Disease Detection",
        description: "This feature uses AI to identify crop diseases from photos. Let's learn how to use it effectively.",
        position: "bottom",
        tip: "Make sure you have good lighting when taking photos"
      },
      {
        id: "2", 
        title: "Take a Clear Photo",
        description: "Click the camera button to take a photo of your crop. Focus on leaves showing symptoms.",
        target: ".camera-button",
        position: "top",
        action: "click",
        tip: "Hold your phone steady and get close to the affected area"
      },
      {
        id: "3",
        title: "Review the Results",
        description: "The AI will analyze your photo and show possible diseases with confidence levels.",
        position: "bottom",
        tip: "Higher confidence means more accurate detection"
      },
      {
        id: "4",
        title: "Get Treatment Advice",
        description: "Tap on any detected disease to get detailed treatment recommendations.",
        position: "top",
        action: "click",
        tip: "Always consult with local agricultural experts for serious infections"
      }
    ]
  },
  {
    id: "yield-prediction",
    name: "Yield Prediction Tutorial", 
    description: "Learn how to predict your harvest using AI",
    estimatedTime: "4 minutes",
    steps: [
      {
        id: "1",
        title: "AI Yield Prediction",
        description: "This feature predicts your harvest quantity 3 months in advance using weather and crop data.",
        position: "bottom"
      },
      {
        id: "2",
        title: "Select Your Crop",
        description: "Choose the crop type you want to predict yields for.",
        target: ".crop-selector",
        position: "top",
        action: "click"
      },
      {
        id: "3",
        title: "Enter Farm Details",
        description: "Input your farm size and planting date for accurate predictions.",
        target: ".farm-inputs",
        position: "right",
        action: "input"
      },
      {
        id: "4",
        title: "Generate Prediction",
        description: "Click to generate your yield prediction with confidence levels.",
        target: ".predict-button",
        position: "top",
        action: "click"
      }
    ]
  },
  {
    id: "voice-assistant",
    name: "Voice Assistant Tutorial",
    description: "Learn to use voice commands in your local language",
    estimatedTime: "2 minutes", 
    steps: [
      {
        id: "1",
        title: "Voice Assistant",
        description: "Ask farming questions in English, Kiswahili, Kikuyu, or Luo using voice commands.",
        position: "bottom"
      },
      {
        id: "2",
        title: "Select Language",
        description: "Choose your preferred language from the dropdown menu.",
        target: ".language-selector",
        position: "right",
        action: "click"
      },
      {
        id: "3",
        title: "Start Speaking",
        description: "Press and hold the microphone button, then speak your question clearly.",
        target: ".mic-button",
        position: "top",
        action: "click",
        tip: "Speak clearly and avoid background noise"
      },
      {
        id: "4",
        title: "Listen to Response",
        description: "The assistant will provide spoken answers in your selected language.",
        position: "bottom",
        tip: "You can replay the response or ask follow-up questions"
      }
    ]
  }
];

interface InteractiveTutorialProps {
  tutorialId?: string;
  onComplete?: () => void;
  onClose?: () => void;
}

export const InteractiveTutorial = ({ 
  tutorialId = "disease-detection", 
  onComplete,
  onClose 
}: InteractiveTutorialProps) => {
  const [currentTutorial, setCurrentTutorial] = useState<Tutorial | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const tutorial = tutorials.find(t => t.id === tutorialId);
    setCurrentTutorial(tutorial || tutorials[0]);
    setCurrentStep(0);
    setIsCompleted(false);
  }, [tutorialId]);

  const nextStep = () => {
    if (!currentTutorial) return;
    
    if (currentStep < currentTutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      onComplete?.();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setIsCompleted(false);
    setIsPlaying(false);
  };

  const startAutoPlay = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (!currentTutorial || prev >= currentTutorial.steps.length - 1) {
          setIsPlaying(false);
          setIsCompleted(true);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 4000); // 4 seconds per step

    return () => clearInterval(interval);
  };

  if (!currentTutorial) return null;

  const progress = ((currentStep + 1) / currentTutorial.steps.length) * 100;
  const currentStepData = currentTutorial.steps[currentStep];

  if (isCompleted) {
    return (
      <Card className="fixed inset-4 z-50 bg-white shadow-2xl border-2 border-green-200">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tutorial Complete!</h2>
            <p className="text-gray-600">
              You've successfully completed the {currentTutorial.name}
            </p>
          </div>
          
          <div className="flex gap-3 justify-center">
            <Button onClick={restart} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart Tutorial
            </Button>
            <Button onClick={onClose} className="bg-green-500 hover:bg-green-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              Done
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />
      
      {/* Tutorial Card */}
      <Card className="fixed top-4 right-4 w-96 z-50 bg-white shadow-2xl border-2 border-blue-200">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">{currentTutorial.name}</h3>
              <p className="text-sm text-gray-600">{currentTutorial.estimatedTime}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep + 1} of {currentTutorial.steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Current Step */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {currentStepData.title}
                </h4>
                <p className="text-sm text-gray-700">
                  {currentStepData.description}
                </p>
              </div>
            </div>

            {currentStepData.tip && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Tip:</p>
                    <p className="text-sm text-yellow-700">{currentStepData.tip}</p>
                  </div>
                </div>
              </div>
            )}

            {currentStepData.action && (
              <Badge className="mt-3 bg-blue-100 text-blue-800">
                Action: {currentStepData.action}
              </Badge>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              
              <Button 
                size="sm"
                onClick={nextStep}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {currentStep === currentTutorial.steps.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={isPlaying ? () => setIsPlaying(false) : startAutoPlay}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Highlight Target Element */}
      {currentStepData.target && (
        <style>
          {`
            ${currentStepData.target} {
              position: relative;
              z-index: 45;
              box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5);
              border-radius: 8px;
            }
            ${currentStepData.target}::after {
              content: '';
              position: absolute;
              inset: -8px;
              border: 2px solid #3b82f6;
              border-radius: 12px;
              pointer-events: none;
              animation: pulse 2s infinite;
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.5; }
            }
          `}
        </style>
      )}
    </>
  );
};

// Tutorial Launcher Component
export const TutorialLauncher = () => {
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutorials.map((tutorial) => (
          <Card key={tutorial.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Play className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{tutorial.name}</h3>
                  <p className="text-sm text-gray-600">{tutorial.description}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {tutorial.estimatedTime}
                </Badge>
                <Button 
                  size="sm"
                  onClick={() => setActiveTutorial(tutorial.id)}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeTutorial && (
        <InteractiveTutorial
          tutorialId={activeTutorial}
          onComplete={() => setActiveTutorial(null)}
          onClose={() => setActiveTutorial(null)}
        />
      )}
    </>
  );
};