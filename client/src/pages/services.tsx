import { Link } from "wouter";
import { ArrowRight, Globe, Search, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Globe,
    title: "Strategic Web Design",
    slug: "strategic-web-design",
    summary: "Your website is your most powerful sales tool. We design stunning, conversion-focused websites that turn visitors into customers and help your business stand out in a crowded market.",
    benefits: ["Custom designs tailored to your brand", "Mobile-responsive and fast-loading", "Built to convert visitors into leads"],
  },
  {
    icon: Search,
    title: "SEO Services",
    slug: "seo",
    summary: "Get found by customers actively searching for your services. Our proven SEO strategies boost your visibility on Google, driving consistent organic traffic that converts into revenue.",
    benefits: ["Higher rankings on Google", "More qualified organic traffic", "Long-term sustainable growth"],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    slug: "digital-marketing",
    summary: "Reach your ideal customers with data-driven marketing campaigns. From paid ads to social media, we create integrated strategies that maximize your ROI and accelerate business growth.",
    benefits: ["Targeted campaigns that reach the right audience", "Measurable results and clear ROI", "Multi-channel marketing expertise"],
  },
];

export default function Services() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,50,50,0.15),transparent_50%)]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-white mb-8">
            <Sparkles className="h-4 w-4" />
            Results-Driven Digital Solutions
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-services-hero-title">
            Digital Services That{" "}
            <span className="text-primary">Grow Your Business</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            From stunning websites to top Google rankings and high-converting marketing campaigns, 
            we provide everything you need to dominate your market online.
          </p>
          
          <Link href="/submit" data-testid="link-services-hero-cta">
            <Button size="lg" className="gap-2" data-testid="button-services-cta">
              Get Your Free Strategy Session
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-how-we-help">
              How We Help Your Business Succeed
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Every business is unique, and so is our approach. We combine strategic thinking with 
              technical expertise to deliver solutions that drive real, measurable results. Whether 
              you need a new website, better search visibility, or a complete digital marketing 
              overhaul, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6" id="services-list">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-our-services">
              Our Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive digital solutions designed to attract, engage, and convert your ideal customers.
            </p>
          </div>
          
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              return (
                <Card key={service.slug} className="border border-red-500 overflow-hidden" data-testid={`card-service-${service.slug}`}>
                  <CardContent className="p-0">
                    <div className={`grid md:grid-cols-2 gap-8 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                      <div className={`p-8 flex flex-col justify-center ${isEven ? '' : 'md:order-2'}`}>
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-6">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4">{service.title}</h3>
                        <p className="text-muted-foreground text-lg mb-6">{service.summary}</p>
                        <ul className="space-y-2 mb-8">
                          {service.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-primary" />
                              <span className="text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href={`/services/${service.slug}`} data-testid={`link-learn-more-${service.slug}`}>
                          <Button className="gap-2 w-fit" data-testid={`button-learn-more-${service.slug}`}>
                            Learn More
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                      <div className={`bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-12 ${isEven ? '' : 'md:order-1'}`}>
                        <Icon className="h-32 w-32 text-primary/30" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-primary/5">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 border-2 border-red-500 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-services-cta">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss your goals and create a customized strategy to help you achieve them. 
              Book a free consultation today—no pressure, just honest advice.
            </p>
            <Link href="/submit" data-testid="link-schedule-consultation">
              <Button size="lg" className="gap-2" data-testid="button-schedule-consultation">
                Schedule Your Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
