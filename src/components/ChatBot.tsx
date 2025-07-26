import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, FileText, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  isQuestion?: boolean;
  options?: string[];
}

interface Symptom {
  symptom: string;
  severity: string;
  duration: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your AI health assistant. I'll help you analyze your symptoms and provide a preliminary assessment. Please note that this is not a substitute for professional medical advice. What brings you here today?",
      timestamp: new Date(),
      isQuestion: true
    }
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = [
    "What is your primary symptom or concern?",
    "How long have you been experiencing this symptom?",
    "On a scale of 1-10, how would you rate the severity?",
    "Do you have any additional symptoms?",
    "Have you taken any medication or treatment for this?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, type: 'bot' | 'user', isQuestion = false, options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isQuestion,
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const generateSummary = () => {
    let summary = "## Symptom Analysis Summary\n\n";
    summary += "**Primary Symptoms:**\n";
    symptoms.forEach((symptom, index) => {
      summary += `${index + 1}. ${symptom.symptom} (Severity: ${symptom.severity}, Duration: ${symptom.duration})\n`;
    });
    
    summary += "\n**Preliminary Assessment:**\n";
    summary += "Based on the symptoms you've described, this could be related to several conditions. ";
    
    if (symptoms.some(s => s.symptom.toLowerCase().includes('fever') || s.symptom.toLowerCase().includes('headache'))) {
      summary += "The combination of fever and headache suggests a possible viral infection or flu. ";
    }
    
    summary += "\n**Recommendations:**\n";
    summary += "• Rest and stay hydrated\n";
    summary += "• Monitor your symptoms\n";
    summary += "• Seek medical attention if symptoms worsen\n";
    summary += "• Contact emergency services if you experience severe symptoms\n\n";
    summary += "**⚠️ Important:** This analysis is for informational purposes only and does not replace professional medical diagnosis. Please consult with a healthcare provider for proper evaluation and treatment.";
    
    return summary;
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    addMessage(currentInput, 'user');
    
    // Process the user's response
    if (currentStep < questions.length - 1) {
      // Store symptom information
      if (currentStep === 0) {
        setSymptoms(prev => [...prev, { symptom: currentInput, severity: '', duration: '' }]);
      } else if (currentStep === 1 && symptoms.length > 0) {
        setSymptoms(prev => prev.map((s, i) => i === prev.length - 1 ? { ...s, duration: currentInput } : s));
      } else if (currentStep === 2 && symptoms.length > 0) {
        setSymptoms(prev => prev.map((s, i) => i === prev.length - 1 ? { ...s, severity: currentInput } : s));
      }
    }

    setCurrentInput("");
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      setIsTyping(false);
      
      if (currentStep < questions.length - 1) {
        setCurrentStep(prev => prev + 1);
        addMessage(questions[currentStep + 1], 'bot', true);
      } else {
        // Final step - generate summary
        addMessage("Thank you for providing all the information. Let me analyze your symptoms and prepare a summary for you.", 'bot');
        
        setTimeout(() => {
          setShowSummary(true);
          const summary = generateSummary();
          addMessage(summary, 'bot');
          addMessage("Would you like to start a new consultation or do you have any other questions?", 'bot', true, ['New Consultation', 'Ask Question', 'End Session']);
        }, 2000);
      }
    }, 1500);
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, 'user');
    
    if (option === 'New Consultation') {
      setCurrentStep(0);
      setSymptoms([]);
      setShowSummary(false);
      setTimeout(() => {
        addMessage(questions[0], 'bot', true);
      }, 1000);
    } else if (option === 'End Session') {
      setTimeout(() => {
        addMessage("Thank you for using our symptom checker. Take care and don't hesitate to seek professional medical help if needed. Stay healthy!", 'bot');
      }, 1000);
    } else {
      setTimeout(() => {
        addMessage("I'm here to help! Please type your question and I'll do my best to assist you.", 'bot', true);
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm border-border/50 h-[600px] flex flex-col">
        <CardHeader className="border-b border-border/30">
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-medical-blue" />
            <span>AI Symptom Checker</span>
            <Badge variant="secondary" className="ml-auto">
              Step {Math.min(currentStep + 1, questions.length)} of {questions.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-medical-blue text-white' 
                      : 'bg-medical-light text-medical-blue'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-medical-blue text-white'
                      : 'bg-medical-light/50 text-foreground'
                  }`}>
                    {message.content.includes('##') ? (
                      <div className="prose prose-sm max-w-none">
                        {message.content.split('\n').map((line, i) => {
                          if (line.startsWith('##')) {
                            return <h3 key={i} className="text-lg font-bold text-medical-blue mt-0 mb-2">{line.replace('##', '')}</h3>;
                          } else if (line.startsWith('**') && line.endsWith('**')) {
                            return <h4 key={i} className="font-semibold text-foreground mt-3 mb-1">{line.replace(/\*\*/g, '')}</h4>;
                          } else if (line.startsWith('•')) {
                            return <li key={i} className="ml-4">{line.replace('•', '')}</li>;
                          } else if (line.includes('⚠️')) {
                            return <div key={i} className="bg-warning/10 border border-warning/20 rounded-lg p-3 mt-3 text-sm">{line}</div>;
                          } else if (line.trim()) {
                            return <p key={i} className="mb-2">{line}</p>;
                          }
                          return <br key={i} />;
                        })}
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                    
                    {message.options && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleOptionClick(option)}
                            className="text-xs"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 bg-medical-light text-medical-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-medical-light/50 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-medical-blue/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-medical-blue/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-medical-blue/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t border-border/30 p-4">
            <div className="flex space-x-2">
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Type your response here..."
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                className="flex-1 bg-white/70 border-border/70 focus:border-medical-blue"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage}
                variant="medical"
                disabled={!currentInput.trim() || isTyping}
                className="px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              This AI assistant provides preliminary information only. Consult a healthcare professional for medical advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;