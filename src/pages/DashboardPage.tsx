import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, LogOut, User, Calendar, FileText, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ChatBot from "@/components/ChatBot";

interface PatientData {
  name: string;
  id: string;
  age: number;
  gender: string;
  lastVisit: string;
}

interface Consultation {
  date: string;
  diagnosis: string;
  medications: string[];
  doctor: string;
}

const DashboardPage = () => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const consultations: Consultation[] = [
    {
      date: "2024-01-15",
      diagnosis: "Seasonal Allergies",
      medications: ["Loratadine 10mg", "Nasal Spray"],
      doctor: "Dr. Sarah Johnson"
    },
    {
      date: "2023-12-08",
      diagnosis: "Annual Physical Exam",
      medications: ["Vitamin D3", "Multivitamin"],
      doctor: "Dr. Michael Chen"
    },
    {
      date: "2023-10-22",
      diagnosis: "Minor Cold",
      medications: ["Rest", "Increased Fluids"],
      doctor: "Dr. Sarah Johnson"
    }
  ];

  useEffect(() => {
    const storedPatient = localStorage.getItem('currentPatient');
    if (storedPatient) {
      setPatientData(JSON.parse(storedPatient));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentPatient');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  if (!patientData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-medical-soft via-background to-medical-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-medical rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-soft via-background to-medical-light">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-medical rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Patient Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {patientData.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-medical-blue text-medical-blue">
              Patient ID: {patientData.id}
            </Badge>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-96 mx-auto bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="personal" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Personal Info & History</span>
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Symptom Chatbot</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Info & History Tab */}
          <TabsContent value="personal" className="space-y-6">
            {/* Patient Info Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-medical-blue" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                    <p className="text-lg font-semibold text-foreground">{patientData.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Age</Label>
                    <p className="text-lg font-semibold text-foreground">{patientData.age} years</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
                    <p className="text-lg font-semibold text-foreground">{patientData.gender}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Last Visit</Label>
                    <p className="text-lg font-semibold text-foreground">
                      {new Date(patientData.lastVisit).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consultation History */}
            <Card className="bg-white/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-medical-blue" />
                  <span>Consultation History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultations.map((consultation, index) => (
                    <div key={index} className="p-4 bg-medical-light/50 rounded-lg border border-border/30">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <div className="flex items-center space-x-2 mb-2 md:mb-0">
                          <Calendar className="w-4 h-4 text-medical-blue" />
                          <span className="font-semibold text-foreground">
                            {new Date(consultation.date).toLocaleDateString()}
                          </span>
                        </div>
                        <Badge variant="secondary">{consultation.doctor}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Diagnosis</Label>
                          <p className="text-foreground">{consultation.diagnosis}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Medications</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {consultation.medications.map((med, medIndex) => (
                              <Badge key={medIndex} variant="outline" className="text-xs">
                                {med}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chatbot Tab */}
          <TabsContent value="chatbot">
            <ChatBot />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// Simple Label component
const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={`block text-sm font-medium ${className}`}>{children}</label>
);

export default DashboardPage;