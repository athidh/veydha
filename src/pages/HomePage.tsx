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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: "#00E5FF", fontFamily: "Bungee" }}>
              Engage Your Wait With<br />
              <span style={{ color: "#B0E0E6" }}>VEYDHA</span>
            </h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: "white"}}><i>
              Veydha is a smart pre-consultation platform that collects and analyzes patient symptoms using AI,
               ensuring doctors get meaningful insights — before the visit even starts.
            </i></p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="medical" size="lg" className="text-lg px-8 py-4 h-auto transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-xl" style={{ fontFamily: 'Orbitron', color: 'black' }}>
                  Patient Login
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-xl" style={{ fontFamily: 'Orbitron', color: 'black' }}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12" style={{ color: '#1DE9B6' }}>
          Driven by Care. Powered by AI.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/30 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-medical-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-medical-blue" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                  <p className="text-white text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Info */}
      {/* Removed About Veydha Medical Center section as requested */}

      {/* Footer */}
      <footer className="bg-foreground text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-medical-blue rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold">Veydha</span>
          </div>
          <p className="text-white/70 text-sm">
            © 2024 Veydha Medical Center. All rights reserved. | Licensed Healthcare Provider
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;