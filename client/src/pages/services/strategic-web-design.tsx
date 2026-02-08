import Link from "next/link";
import { ArrowRight, Globe, CheckCircle2, Zap, Users, Target, Palette, Smartphone, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const problems = [
  "Your current website looks outdated and doesn't reflect your brand",
  "Visitors leave without taking action or contacting you",
  "Your site isn't mobile-friendly or loads too slowly",
  "You're embarrassed to send potential clients to your website",
  "Competitors have better websites and are winning more business",
];

const process = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "We learn about your business, goals, target audience, and competition to create a strategic blueprint for your new website.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "Our designers create custom mockups that capture your brand identity and optimize for user experience and conversions.",
  },
  {
    step: "03",
    title: "Development & Testing",
    description: "We build your website with clean code, fast loading times, and rigorous testing across all devices and browsers.",
  },
  {
    step: "04",
    title: "Launch & Optimization",
    description: "We launch your site, train your team, and provide ongoing support to ensure continued success and performance.",
  },
];

const features = [
  {
    icon: Palette,
    title: "Custom Brand-Aligned Design",
    benefit: "Stand out from competitors with a unique design that captures your brand's personality and builds instant credibility.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Responsive",
    benefit: "Reach customers on any device with a website that looks and works perfectly on phones, tablets, and desktops.",
  },
  {
    icon: Zap,
    title: "Lightning-Fast Performance",
    benefit: "Keep visitors engaged with quick load times that improve user experience and boost your Google rankings.",
  },
  {
    icon: Target,
    title: "Conversion-Focused Structure",
    benefit: "Turn more visitors into customers with strategic layouts, compelling calls-to-action, and optimized user journeys.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable Hosting",
    benefit: "Protect your business and customers with enterprise-grade security and 99.9% uptime reliability.",
  },
  {
    icon: TrendingUp,
    title: "SEO-Ready Foundation",
    benefit: "Rank higher on Google from day one with clean code, proper structure, and on-page SEO best practices built in.",
  },
];

const outcomes = [
  "A stunning website that makes a powerful first impression",
  "Increased visitor engagement and time on site",
  "More leads, inquiries, and sales from your website",
  "Improved search engine rankings and visibility",
  "A scalable platform that grows with your business",
];

export default function StrategicWebDesign() {
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
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-web-design-hero">
            Strategic Web Design That{" "}
            <span className="text-primary">Converts Visitors Into Customers</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Your website is your most important marketing asset. We design and build custom websites 
            that don't just look amazing—they drive real business results.
          </p>
          
          <Link href="/submit" data-testid="link-web-design-hero-cta">
            <Button size="lg" className="gap-2" data-testid="button-web-design-cta">
              Get Your Free Website Consultation
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
                Is Your Website Working Against You?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                In today's digital world, your website is often the first interaction potential customers 
                have with your business. An outdated, slow, or confusing website doesn't just hurt your 
                image—it actively costs you leads and revenue every single day.
              </p>
              <p className="text-muted-foreground text-lg">
                We specialize in creating strategic websites for small to mid-sized businesses, startups, 
                and growing brands who need a powerful online presence that generates results.
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
              Our Web Design Process
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A proven, collaborative approach that ensures your new website exceeds expectations 
              and delivers measurable results.
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
              What's Included in Every Website
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every website we build comes packed with features designed to help your business succeed online.
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
                Why Choose MJ Digital Media for Web Design?
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                We're not just designers—we're strategic partners invested in your success. Unlike 
                template-based agencies, we create completely custom websites tailored to your unique 
                business goals and target audience.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                Our focus is always on results. Every design decision we make is backed by data and 
                aimed at improving your conversion rates, search rankings, and bottom line.
              </p>
              <p className="text-muted-foreground text-lg">
                Plus, we provide ongoing support and optimization to ensure your website continues 
                to perform at its best long after launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 border-2 border-red-500 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-cta">
              Ready for a Website That Actually Works?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a custom website that attracts, engages, and 
              converts your ideal customers. Schedule your free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/submit" data-testid="link-web-design-cta-submit">
                <Button size="lg" className="gap-2 min-w-[220px]" data-testid="button-schedule-call">
                  Schedule a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/portfolio" data-testid="link-web-design-cta-portfolio">
                <Button variant="outline" size="lg" className="gap-2 min-w-[220px]" data-testid="button-view-work">
                  View Our Portfolio
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
