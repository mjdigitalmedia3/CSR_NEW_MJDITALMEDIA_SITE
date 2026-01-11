import { Link } from "wouter";
import { ArrowRight, TrendingUp, CheckCircle2, Target, BarChart3, Mail, Share2, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const problems = [
  "Your marketing efforts aren't generating enough leads or sales",
  "You're spending money on ads but not seeing a clear ROI",
  "You don't know which marketing channels to focus on",
  "Your competitors seem to be everywhere online",
  "You lack the time or expertise to manage marketing effectively",
];

const process = [
  {
    step: "01",
    title: "Marketing Audit",
    description: "We analyze your current marketing efforts, competitors, and target audience to identify opportunities.",
  },
  {
    step: "02",
    title: "Strategy Creation",
    description: "We develop a customized multi-channel marketing strategy aligned with your business goals and budget.",
  },
  {
    step: "03",
    title: "Campaign Execution",
    description: "Our team implements and manages your campaigns across all relevant channels with precision.",
  },
  {
    step: "04",
    title: "Optimize & Scale",
    description: "We continuously analyze results, optimize performance, and scale what's working to maximize ROI.",
  },
];

const features = [
  {
    icon: Target,
    title: "Paid Advertising (PPC)",
    benefit: "Reach your ideal customers instantly with targeted ads on Google, Facebook, Instagram, and LinkedIn.",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    benefit: "Build brand awareness and engage your audience with strategic content across social platforms.",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    benefit: "Nurture leads and drive repeat sales with automated email sequences that convert subscribers into customers.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Tracking",
    benefit: "Track every dollar spent and measure real ROI with comprehensive analytics and conversion tracking.",
  },
  {
    icon: Users,
    title: "Audience Targeting",
    benefit: "Reach the right people at the right time with advanced audience segmentation and retargeting.",
  },
  {
    icon: DollarSign,
    title: "Conversion Optimization",
    benefit: "Maximize your marketing investment by optimizing landing pages and funnels for higher conversions.",
  },
];

const outcomes = [
  "Consistent flow of qualified leads to your business",
  "Clear ROI on every marketing dollar spent",
  "Increased brand awareness and market presence",
  "Higher conversion rates across all channels",
  "Scalable marketing systems that grow with you",
];

export default function DigitalMarketing() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,50,50,0.15),transparent_50%)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6" data-testid="link-back-services">
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Services
          </Link>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-marketing-hero">
            Digital Marketing That{" "}
            <span className="text-primary">Delivers Real ROI</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Stop wasting money on marketing that doesn't work. Our data-driven campaigns 
            attract, engage, and convert your ideal customers.
          </p>
          
          <Link href="/submit" data-testid="link-marketing-hero-cta">
            <Button size="lg" className="gap-2" data-testid="button-marketing-cta">
              Get Your Free Marketing Analysis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="text-who-its-for">
                Is Your Marketing Actually Working?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Most businesses struggle with digital marketing because they lack a clear strategy, 
                spread themselves too thin across channels, or can't measure what's actually working. 
                The result? Wasted budget and missed opportunities.
              </p>
              <p className="text-muted-foreground text-lg">
                We help small to mid-sized businesses, startups, and growing brands cut through the 
                noise with focused, measurable marketing campaigns that drive real business growth.
              </p>
            </div>
            <Card className="p-8 border border-red-500">
              <h3 className="text-xl font-semibold mb-6">Common Problems We Solve:</h3>
              <ul className="space-y-4">
                {problems.map((problem, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary text-sm font-bold">{i + 1}</span>
                    </div>
                    <span className="text-muted-foreground">{problem}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-our-process">
              Our Digital Marketing Process
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A strategic, results-focused approach to digital marketing that maximizes your 
              investment and drives sustainable growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step) => (
              <div key={step.step} className="relative" data-testid={`process-step-${step.step}`}>
                <div className="text-6xl font-bold text-primary/20 mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-features">
              Our Digital Marketing Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive marketing solutions to reach your audience wherever they are online.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="hover-elevate border border-red-500" data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <CardContent className="pt-8 pb-8 px-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.benefit}</p>
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
            <Card className="p-8 border border-red-500">
              <h3 className="text-xl font-semibold mb-6">Expected Outcomes:</h3>
              <ul className="space-y-4">
                {outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="text-why-choose">
                Why Choose MJ Digital Media for Digital Marketing?
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                We're not a one-size-fits-all agency. Every strategy we create is tailored to your 
                specific business goals, target audience, and budget. We focus on what works for 
                YOUR business, not generic tactics.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                Accountability matters. We provide clear, honest reporting that shows exactly where 
                your money is going and what results you're getting. No vanity metrics—just real 
                business impact.
              </p>
              <p className="text-muted-foreground text-lg">
                We become an extension of your team, staying in close communication and adjusting 
                strategies in real-time to capitalize on opportunities and maximize your ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 border-2 border-red-500 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-cta">
              Ready to Accelerate Your Growth?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Get a free marketing analysis and discover exactly how we can help you attract more 
              customers and grow your revenue. Let's build something great together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/submit" data-testid="link-marketing-cta-submit">
                <Button size="lg" className="gap-2 min-w-[220px]" data-testid="button-schedule-call">
                  Get Your Free Marketing Analysis
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/portfolio" data-testid="link-marketing-cta-portfolio">
                <Button variant="outline" size="lg" className="gap-2 min-w-[220px]" data-testid="button-view-work">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
