import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This part replaces the setTimeout
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: formData.patientId,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      // SUCCESS: Store the real token from the backend
      localStorage.setItem('token', data.token);

      // Also store minimal patient info so Dashboard can load without bouncing back
      const patient =
        data.patient ||
        data.user ||
        {
          name: formData.patientName,
          id: formData.patientId,
          age: 0,
          gender: "N/A",
          lastVisit: new Date().toISOString(),
        };
      try {
        localStorage.setItem('currentPatient', JSON.stringify(patient));
      } catch {
        // ignore storage errors
      }

      toast({
        title: "Login Successful",
        description: `Welcome back!`,
      });

      navigate("/dashboard");

    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(to bottom, #2a4fcf 0%, #7b3fa1 60%, #c12b6e 100%)"
      }}
    >
      <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4" style={{ color: '#FFFACD' }}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Home
        </Link>
        <div className="flex items-center justify-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-medical rounded-lg flex items-center justify-center">
          <Heart className="w-7 h-7 text-white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">Patient Login Portal</h1>
        </div>
        </div>
      </div>

      {/* Login Card */}
      <Card className="bg-white/80 backdrop-blur-sm border-border/50 shadow-xl">
        <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-foreground">Welcome Back</CardTitle>
        <p className="text-muted-foreground">Please sign in to access your medical portal</p>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
          <Label htmlFor="patientName" className="text-foreground font-medium">Patient Name</Label>
          <Input
            id="patientName"
            name="patientName"
            type="text"
            placeholder="Enter your full name"
            value={formData.patientName}
            onChange={handleInputChange}
            className="h-12 bg-white/70 border-border/70 focus:border-medical-blue"
            required
          />
          </div>

          <div className="space-y-2">
          <Label htmlFor="patientId" className="text-foreground font-medium">Patient ID</Label>
          <Input
            id="patientId"
            name="patientId"
            type="text"
            placeholder="Enter your patient ID"
            value={formData.patientId}
            onChange={handleInputChange}
            className="h-12 bg-white/70 border-border/70 focus:border-medical-blue"
            required
          />
          </div>

          <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className="h-12 bg-white/70 border-border/70 focus:border-medical-blue"
            required
          />
          </div>

          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="w-24 h-10 text-sm font-medium"
              variant="medical"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
          Having trouble accessing your account?{" "}
          <a href="#" className="text-medical-blue hover:underline font-medium">
            Contact Support
          </a>
          </p>
        </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>© 2024 Veydha Medical Center. All rights reserved.</p>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;