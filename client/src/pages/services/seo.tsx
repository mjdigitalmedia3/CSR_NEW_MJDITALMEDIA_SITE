import Link from "next/link";
import { ArrowRight, Search, CheckCircle2, TrendingUp, BarChart3, FileText, Link2, MapPin, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const problems = [
  "Your website doesn't appear on the first page of Google",
  "Competitors are outranking you for important keywords",
  "You're not getting enough organic traffic or leads",
  "You've tried SEO before but didn't see results",
  "You don't know what's working or what to fix",
];

const process = [
  {
    step: "01",
    title: "SEO Audit & Analysis",
    description: "We conduct a comprehensive audit of your website, competitors, and industry to identify opportunities and gaps.",
  },
  {
    step: "02",
    title: "Strategy Development",
    description: "Based on our findings, we create a customized SEO roadmap prioritizing high-impact actions for your business.",
  },
  {
    step: "03",
    title: "On-Page & Technical SEO",
    description: "We optimize your website's content, structure, and technical elements to improve search engine visibility.",
  },
  {
    step: "04",
    title: "Content & Link Building",
    description: "We create valuable content and build authoritative backlinks to strengthen your domain authority and rankings.",
  },
];

const features = [
  {
    icon: Search,
    title: "Keyword Research & Strategy",
    benefit: "Target the right keywords that your ideal customers are searching for, driving qualified traffic ready to convert.",
  },
  {
    icon: FileText,
    title: "On-Page Optimization",
    benefit: "Optimize your pages for search engines with proper titles, meta descriptions, headers, and content structure.",
  },
  {
    icon: Gauge,
    title: "Technical SEO",
    benefit: "Fix technical issues like site speed, mobile-friendliness, and crawlability that impact your rankings.",
  },
  {
    icon: Link2,
    title: "Link Building",
    benefit: "Build high-quality backlinks from authoritative websites to boost your domain authority and rankings.",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    benefit: "Dominate local search results and Google Maps to attract customers in your service area.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    benefit: "Track your progress with detailed monthly reports showing rankings, traffic, and conversions.",
  },
];

const outcomes = [
  "Higher rankings for your target keywords on Google",
  "Increased organic traffic from qualified prospects",
  "More leads and sales from search engine visitors",
  "Improved brand visibility and credibility online",
  "Long-term sustainable growth without ongoing ad spend",
];

export default function SEOServices() {
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
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-seo-hero">
            SEO Services That{" "}
            <span className="text-primary">Get You Found on Google</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Rank higher, drive more traffic, and turn organic visitors into paying customers with 
            our data-driven SEO strategies.
          </p>
          
          <Link href="/submit" data-testid="link-seo-hero-cta">
            <Button size="lg" className="gap-2" data-testid="button-seo-cta">
              Get Your Free SEO Audit
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
                Are You Invisible on Google?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                If you're not on the first page of Google, you're missing out on thousands of potential 
                customers actively searching for your products or services. Studies show that 75% of 
                users never scroll past the first page of search results.
              </p>
              <p className="text-muted-foreground text-lg">
                Our SEO services help small to mid-sized businesses, startups, and growing brands 
                achieve lasting visibility and consistent lead flow from organic search.
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
              Our SEO Process
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A systematic, transparent approach to improving your search rankings and driving 
              sustainable organic growth.
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
              What's Included in Our SEO Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive SEO solutions covering every aspect of search engine optimization.
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
                Why Choose MJ Digital Media for SEO?
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                We take a different approach to SEO. Instead of making empty promises or using 
                black-hat tactics that can get you penalized, we focus on sustainable, white-hat 
                strategies that build lasting authority.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                Transparency is key. You'll receive detailed monthly reports showing exactly what 
                we're doing, how your rankings are improving, and the ROI you're getting from our services.
              </p>
              <p className="text-muted-foreground text-lg">
                We stay on top of Google's ever-changing algorithms so you don't have to. Our team 
                continuously adapts strategies to keep you ahead of the competition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 border-2 border-red-500 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-cta">
              Ready to Dominate Google?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Get a free SEO audit and discover exactly what's holding your website back from 
              ranking higher. No obligation, just actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/submit" data-testid="link-seo-cta-submit">
                <Button size="lg" className="gap-2 min-w-[220px]" data-testid="button-schedule-call">
                  Get Your Free SEO Audit
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/portfolio" data-testid="link-seo-cta-portfolio">
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
