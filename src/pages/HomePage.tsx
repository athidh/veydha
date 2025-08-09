import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Users, Clock, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const features = [
    {
      icon: Heart,
      title: "Expert Care",
      description: "Professional medical consultations with certified doctors"
    },
    {
      icon: Shield,
      title: "Secure Portal",
      description: "Your medical data is protected with enterprise-grade security"
    },
    {
      icon: Users,
      title: "Patient-Centered",
      description: "Personalized healthcare experience tailored to your needs"
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Access your medical records and chat support anytime"
    }
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #2a4fcf 0%, #7b3fa1 60%, #c12b6e 100%)"
      }}
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-medical rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold" style={{ color: "#2a4fcf" }}>Veydha</h1>
                <p className="text-sm" style={{ color: "black" }}>AI-Powered Symptom Intake Assistant</p>
            </div>
          </div>
          <Link to="/login">
            <Button variant="medical" className="shadow-lg hover:shadow-xl">
              Patient Login
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Engage Your Wait With
              <span className="text-medical-blue"> VEYDHA</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
             Veydha is a smart pre-consultation platform that collects and analyzes patient symptoms using AI,
              ensuring doctors get meaningful insights — before the visit even starts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="medical" size="lg" className="text-lg px-8 py-4 h-auto">
                  Access Patient Portal
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose MediCare Portal?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-medical-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-medical-blue" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                About MediCare Medical Center
              </h3>
                <p className="text-lg mb-6" style={{ color: "#09090a4c" }}>
                Established in 1985, MediCare Medical Center has been at the forefront of 
                healthcare innovation, serving over 100,000 patients with cutting-edge 
                medical technology and compassionate care.
                </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-medical-blue" />
                  <span className="text-foreground">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-medical-blue" />
                  <span className="text-foreground">info@medicareportal.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-medical-blue" />
                  <span className="text-foreground">123 Healthcare Ave, Medical District, NY 10001</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="bg-gradient-medical text-white border-0">
                <CardContent className="p-6">
                  <h4 className="text-2xl font-bold mb-2">500+</h4>
                  <p className="text-white/90">Medical Professionals</p>
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <h4 className="text-xl font-bold text-foreground">98%</h4>
                    <p className="text-muted-foreground text-sm">Patient Satisfaction</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <h4 className="text-xl font-bold text-foreground">24/7</h4>
                    <p className="text-muted-foreground text-sm">Emergency Care</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-medical-blue rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold">MediCare Portal</span>
          </div>
          <p className="text-white/70 text-sm">
            © 2024 MediCare Medical Center. All rights reserved. | Licensed Healthcare Provider
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;