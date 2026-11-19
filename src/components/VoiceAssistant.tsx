import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Languages,
  MessageCircle,
  Headphones,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

interface VoiceMessage {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  audio?: string;
  timestamp: string;
  language: string;
}

const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'ki', name: 'Kikuyu', flag: '🇰🇪' },
  { code: 'lu', name: 'Luo', flag: '🇰🇪' }
];

const quickCommands = [
  { text: "What's the weather like today?", sw: "Hali ya hewa leo ni vipi?", ki: "Kĩrĩa kĩa rũthiomi ũmũthĩ?" },
  { text: "Check maize prices", sw: "Angalia bei za mahindi", ki: "Rora thogora wa mbembe" },
  { text: "How do I treat crop disease?", sw: "Nitibu vipi magonjwa ya mazao?", ki: "Njĩra ya kũhonia mĩrĩmu ya irio?" },
  { text: "When should I plant beans?", sw: "Nipande maharage lini?", ki: "Nĩ rĩ ngwĩte njũgũ?" }
];

export const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition and synthesis
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser');
      return;
    }
    
    if (SpeechRecognition && speechSynthesis) {
      setIsSupported(true);
      
      // Initialize speech recognition
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = getLanguageCode(selectedLanguage);
      
      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        try {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setCurrentTranscript(transcript);
        } catch (error) {
          console.error('Speech recognition error:', error);
        }
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (currentTranscript.trim()) {
          handleVoiceInput(currentTranscript);
          setCurrentTranscript('');
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      // Initialize speech synthesis
      synthRef.current = speechSynthesis;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [selectedLanguage, currentTranscript]);

  const getLanguageCode = (lang: string) => {
    switch (lang) {
      case 'sw': return 'sw-KE';
      case 'ki': return 'ki-KE';
      case 'lu': return 'luo-KE';
      default: return 'en-US';
    }
  };

  const startListening = () => {
    if (!isSupported || !recognitionRef.current) return;
    
    setIsListening(true);
    setCurrentTranscript('');
    recognitionRef.current.lang = getLanguageCode(selectedLanguage);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleVoiceInput = async (transcript: string) => {
    const userMessage: VoiceMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: transcript,
      timestamp: new Date().toLocaleTimeString(),
      language: selectedLanguage
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(transcript, selectedLanguage);
      const assistantMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString(),
        language: selectedLanguage
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      speakText(response, selectedLanguage);
    }, 1000);
  };

  const generateResponse = (input: string, language: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Weather responses
    if (lowerInput.includes('weather') || lowerInput.includes('hewa') || lowerInput.includes('rũthiomi')) {
      switch (language) {
        case 'sw': return 'Hali ya hewa leo ni nzuri. Joto ni digrii 24, na hakuna mvua inayotarajiwa. Ni wakati mzuri wa kulima.';
        case 'ki': return 'Kĩrĩa kĩa rũthiomi ũmũthĩ nĩ kĩega. Ũrugarĩ nĩ digrii 24, na gũtirĩ mbura ĩrĩa ĩrĩetagwo. Nĩ ihinda rĩega rĩa kũrĩma.';
        default: return 'Today\'s weather is good. Temperature is 24°C with no rain expected. It\'s a great day for farming activities.';
      }
    }
    
    // Price responses
    if (lowerInput.includes('price') || lowerInput.includes('bei') || lowerInput.includes('thogora')) {
      switch (language) {
        case 'sw': return 'Bei za mahindi leo ni shilingi 3,200 kwa gunia la kilo 90. Bei zimepanda kwa asilimia 5 tangu wiki iliyopita.';
        case 'ki': return 'Thogora wa mbembe ũmũthĩ nĩ cierandi 3,200 kwa ikũnia rĩa kilo 90. Thogora nĩũrambatĩte na 5% kuuma kiumia kĩrĩa kĩahĩtũku.';
        default: return 'Current maize prices are KSh 3,200 per 90kg bag. Prices have increased by 5% since last week.';
      }
    }
    
    // Disease responses
    if (lowerInput.includes('disease') || lowerInput.includes('magonjwa') || lowerInput.includes('mĩrĩmu')) {
      switch (language) {
        case 'sw': return 'Kwa magonjwa ya mazao, tumia dawa za kupulizia kama Ridomil au Dithane. Pia hakikisha mazao yako yana mzunguko mzuri wa hewa.';
        case 'ki': return 'Harĩ mĩrĩmu ya irio, hũthĩra ndawa ta Ridomil kana Dithane. Ningĩ menya atĩ irio ciaku nĩirĩ na mũhuho mwega.';
        default: return 'For crop diseases, use fungicides like Ridomil or Dithane. Also ensure your crops have good air circulation.';
      }
    }
    
    // Default response
    switch (language) {
      case 'sw': return 'Samahani, sijaelewa swali lako vizuri. Je, unaweza kulirudia tena?';
      case 'ki': return 'Ũrĩa wa kũhooya, ndiũĩ ũrĩa ũrenda wega. Wahota gũcookia rĩngĩ?';
      default: return 'I\'m sorry, I didn\'t understand your question clearly. Could you please repeat it?';
    }
  };

  const speakText = (text: string, language: string) => {
    if (!synthRef.current || isSpeaking) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguageCode(language);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const handleQuickCommand = (command: any) => {
    const text = command[selectedLanguage] || command.text;
    handleVoiceInput(text);
  };

  const clearConversation = () => {
    setMessages([]);
    stopSpeaking();
  };

  if (!isSupported) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <MicOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Assistant Not Supported</h3>
          <p className="text-gray-600">Your browser doesn't support voice recognition. Please use a modern browser like Chrome or Firefox.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-green-500 to-teal-600 p-3 rounded-xl">
          <Headphones className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Voice Assistant</h2>
          <p className="text-gray-600">Speak in your local language for farming advice</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voice Controls */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-green-500" />
              Voice Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Language</label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {supportedLanguages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Button
                onClick={isListening ? stopListening : startListening}
                className={`w-full h-16 text-lg ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-6 h-6 mr-2" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-6 h-6 mr-2" />
                    Start Speaking
                  </>
                )}
              </Button>

              <Button
                onClick={isSpeaking ? stopSpeaking : undefined}
                variant="outline"
                className="w-full"
                disabled={!isSpeaking}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4 mr-2" />
                    Stop Speaking
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Assistant Ready
                  </>
                )}
              </Button>

              <Button
                onClick={clearConversation}
                variant="outline"
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear Chat
              </Button>
            </div>

            {isListening && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-700">Listening...</span>
                </div>
                <p className="text-sm text-blue-600">
                  {currentTranscript || "Speak now..."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Conversation */}
        <div className="lg:col-span-2 space-y-4">
          {/* Quick Commands */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Commands</CardTitle>
              <CardDescription>Tap to try these common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickCommands.map((command, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickCommand(command)}
                    className="text-left justify-start h-auto p-3"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      {command[selectedLanguage as keyof typeof command] || command.text}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Conversation</span>
                <Badge variant="outline">
                  {supportedLanguages.find(l => l.code === selectedLanguage)?.flag} {' '}
                  {supportedLanguages.find(l => l.code === selectedLanguage)?.name}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Mic className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Start a conversation by speaking or using quick commands</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs opacity-70">{message.timestamp}</span>
                          {message.type === 'assistant' && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => speakText(message.text, message.language)}
                              className="h-6 w-6 p-0 hover:bg-gray-200"
                            >
                              <Play className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};