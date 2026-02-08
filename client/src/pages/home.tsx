import Link from "next/link";
import { ArrowRight, Globe, Search, Share2, Palette, TrendingUp, Zap, Target, Users, Award, MessageSquare, Rocket, CheckCircle2, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
const logoImage = "/assets/MJDM_copy_1768072123197.png";
const heroVideo = "/assets/MJDM_1768072612194.mp4";

const services = [
  {
    icon: Globe,
    title: "Web Design & Development",
    description: "Custom websites that convert visitors into customers. Mobile-responsive, fast-loading, and built to grow your business online.",
  },
  {
    icon: Search,
    title: "Search Engine Optimization",
    description: "Get found on Google when it matters most. We drive organic traffic that turns into real leads and revenue.",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Build a loyal following and engage your audience. Strategic content that amplifies your brand across all platforms.",
  },
  {
    icon: Palette,
    title: "Branding & Identity",
    description: "Stand out from the competition with a memorable brand. Logos, messaging, and visual identity that resonates.",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "Data-driven campaigns that deliver results. PPC, email marketing, and strategies that maximize your ROI.",
  },
  {
    icon: Zap,
    title: "Conversion Optimization",
    description: "Turn more visitors into paying customers. We optimize every touchpoint for maximum conversions.",
  },
];

const whyChooseUs = [
  {
    icon: Target,
    title: "Results-Driven Approach",
    description: "We don't just build pretty websites—we build revenue-generating digital assets. Every strategy is designed to deliver measurable business growth.",
  },
  {
    icon: Users,
    title: "Dedicated Partnership",
    description: "You're not just another client. We become an extension of your team, fully invested in your success and available when you need us.",
  },
  {
    icon: Award,
    title: "Proven Expertise",
    description: "Years of experience across industries means we know what works. Our track record speaks for itself in client results and satisfaction.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery Call",
    description: "We learn about your business, goals, and challenges to create a customized strategy.",
  },
  {
    step: "02",
    title: "Strategy & Planning",
    description: "We develop a detailed roadmap with clear milestones and expected outcomes.",
  },
  {
    step: "03",
    title: "Design & Build",
    description: "Our team brings your vision to life with expert execution and regular updates.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    description: "We launch, optimize, and continuously improve to maximize your results.",
  },
];

const testimonials = [
  {
    quote: "MJ Digital Media transformed our online presence. Our leads increased by 300% within the first three months.",
    author: "Sarah Johnson",
    company: "TechStart Solutions",
  },
  {
    quote: "Professional, responsive, and results-driven. They delivered exactly what they promised and more.",
    author: "Michael Chen",
    company: "Urban Fitness Co.",
  },
  {
    quote: "Finally, a digital agency that understands small business needs. Best investment we've made this year.",
    author: "Amanda Rodriguez",
    company: "Bloom Boutique",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,50,50,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(100,100,100,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-white mb-8">
                <Rocket className="h-4 w-4" />
                Your Growth Partner in Digital
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
                Grow Your Business with{" "}
                <span className="text-primary">Digital Marketing</span>{" "}
                That Works
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10">
                We help businesses like yours get more leads, more customers, and more revenue 
                through strategic web design, SEO, and digital marketing that delivers real results.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                <Link href="/submit">
                  <Button size="lg" className="gap-2 min-w-[200px]" data-testid="button-get-started">
                    Get a Free Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="outline" size="lg" className="gap-2 min-w-[200px]" data-testid="button-view-portfolio">
                    View Our Work
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

      <section className="py-20 px-4 sm:px-6 bg-card/50" id="about">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="text-about-title">
                About MJ Digital Media
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                We're a full-service digital agency passionate about helping businesses thrive online. 
                From startups to established brands, we partner with ambitious companies ready to 
                dominate their digital space.
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Our team combines creative excellence with data-driven strategies to deliver 
                websites that convert, campaigns that perform, and brands that resonate. 
                We don't just meet expectations—we exceed them.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">100+</p>
                  <p className="text-sm text-muted-foreground">Projects Delivered</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">95%</p>
                  <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">5+</p>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </div>
              </div>
            </div>
            <Card className="p-8 border border-red-500">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Our Mission</p>
                    <p className="text-sm text-muted-foreground">Empower businesses to succeed online</p>
                  </div>
                </div>
                
                <div className="h-px bg-border" />
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Our Focus</p>
                    <p className="text-sm text-muted-foreground">Results that drive real business growth</p>
                  </div>
                </div>
                
                <div className="h-px bg-border" />
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Our Approach</p>
                    <p className="text-sm text-muted-foreground">Partnership-driven, transparent, dedicated</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6" id="services">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-services-title">
              Our Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to build a powerful online presence and grow your business. 
              Strategic solutions tailored to your goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="hover-elevate border border-red-500" data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <CardContent className="pt-8 pb-8 px-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/submit">
              <Button size="lg" className="gap-2" data-testid="button-discuss-project">
                Discuss Your Project
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-card/50" id="why-us">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-why-title">
              Why Choose MJ Digital Media?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We're not just another agency. Here's what makes us the right partner for your business growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="hover-elevate border border-red-500" data-testid={`card-why-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                  <CardContent className="pt-8 pb-8 px-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6" id="process">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-process-title">
              How We Work
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A proven process designed to deliver results. From first call to ongoing success, 
              here's what working with us looks like.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative" data-testid={`process-step-${index + 1}`}>
                <div className="text-6xl font-bold text-primary/20 mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-card/50" id="testimonials">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here's what business owners like you have to say about working with us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover-elevate border border-red-500" data-testid={`card-testimonial-${index}`}>
                <CardContent className="pt-8 pb-8 px-6">
                  <MessageSquare className="h-8 w-8 text-primary/40 mb-4" />
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-primary/5" id="cta">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 border-2 border-red-500 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-cta-title">
              Ready to Grow Your Business?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you attract more customers, increase your revenue, 
              and build a powerful online presence. Book your free strategy call today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/submit">
                <Button size="lg" className="gap-2 min-w-[220px]" data-testid="button-book-call">
                  Book a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg" className="gap-2 min-w-[220px]" data-testid="button-see-work">
                  See Our Work
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>No obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Free strategy session</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Custom solutions</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoImage} alt="MJ Digital Media" className="h-12 w-auto rounded-md" />
                <span className="text-base font-bold tracking-tight">
                  <span className="text-foreground">DIGITAL</span>
                  <span className="text-red-500">MEDIA</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your partner in digital growth. We help businesses build powerful online 
                presences that drive real results.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/services" className="block text-sm text-muted-foreground hover:text-primary" data-testid="link-footer-services">
                  Our Services
                </Link>
                <Link href="/portfolio" className="block text-sm text-muted-foreground hover:text-primary" data-testid="link-footer-portfolio">
                  Our Portfolio
                </Link>
                <Link href="/submit" className="block text-sm text-muted-foreground hover:text-primary" data-testid="link-footer-get-started">
                  Get Started
                </Link>
                <Link href="/dashboard" className="block text-sm text-muted-foreground hover:text-primary" data-testid="link-footer-dashboard">
                  Client Dashboard
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>hello@mjdigitalmedia.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Mon-Fri: 9am - 6pm EST</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MJ Digital Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
