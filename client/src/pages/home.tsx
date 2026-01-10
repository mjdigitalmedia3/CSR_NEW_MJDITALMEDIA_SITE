import { Link } from "wouter";
import { ArrowRight, Clock, FolderOpen, Shield, Sparkles, CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logoImage from "@assets/MJDM_copy_1768072123197.png";
import heroVideo from "@assets/MJDM_1768072612194.mp4";

const benefits = [
  {
    icon: Clock,
    title: "Save Time",
    description: "Streamline your client intake process with organized, easy-to-manage lead forms.",
  },
  {
    icon: FolderOpen,
    title: "Organize Leads",
    description: "Keep all your potential clients in one place with powerful filtering and search.",
  },
  {
    icon: Shield,
    title: "Never Miss Details",
    description: "Capture every requirement with comprehensive intake forms tailored for web projects.",
  },
];

const features = [
  "Customizable intake forms",
  "Budget and timeline tracking",
  "Project type categorization",
  "Feature requirements capture",
  "Status management",
  "Contact information storage",
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,50,50,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(100,100,100,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-white mb-8">
                <Sparkles className="h-4 w-4" />
                Client Lead Management Made Simple
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
                Streamline Your{" "}
                <span className="text-primary">Client Intake</span>{" "}
                Process
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10">
                Capture potential client information and website requirements effortlessly. 
                Never miss a lead or forget important project details again.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                <Link href="/submit">
                  <Button size="lg" className="gap-2 min-w-[200px]" data-testid="button-get-started">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="gap-2 min-w-[200px]" data-testid="button-view-dashboard">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <Card className="overflow-hidden border-2 border-red-500 shadow-lg w-full">
                <video 
                  src={heroVideo} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto"
                  data-testid="video-hero"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose MJ Digital Media?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to manage potential clients and their website requirements in one place.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="hover-elevate border-card-border" data-testid={`card-benefit-${benefit.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <CardContent className="pt-8 pb-8 px-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Everything You Need to Capture Client Requirements
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our comprehensive intake form captures all the essential details you need to understand
                your potential clients and their project requirements.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="p-8 border-card-border">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Client Details</p>
                    <p className="text-sm text-muted-foreground">Name, email, phone, company</p>
                  </div>
                </div>
                
                <div className="h-px bg-border" />
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FolderOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Project Scope</p>
                    <p className="text-sm text-muted-foreground">Type, budget, timeline</p>
                  </div>
                </div>
                
                <div className="h-px bg-border" />
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Feature Requirements</p>
                    <p className="text-sm text-muted-foreground">E-commerce, CMS, SEO, and more</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start capturing and organizing your client leads today. It only takes a minute to submit your first lead.
          </p>
          <Link href="/submit">
            <Button size="lg" className="gap-2" data-testid="button-start-now">
              Start Capturing Leads
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-8 px-4 sm:px-6 border-t">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <img src={logoImage} alt="MJ Digital Media" className="h-12 w-auto rounded-md" />
            <span className="text-base font-bold tracking-tight"><span className="text-foreground">DIGITAL</span><span className="text-red-500">MEDIA</span></span>
          </div>
          <p className="text-sm text-muted-foreground">
            Client Lead Management System
          </p>
        </div>
      </footer>
    </div>
  );
}
