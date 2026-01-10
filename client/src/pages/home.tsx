import { Link } from "wouter";
import { ArrowRight, Code2, Palette, Globe, Smartphone, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/MJDM_copy_1768070340475.png";
import logoVideo from "@assets/MJGLogo_1768071682999.mp4";

const services = [
  {
    icon: Globe,
    title: "Website Design & Logo",
    description: "Custom websites that capture your brand identity and convert visitors into customers.",
  },
  {
    icon: Palette,
    title: "Business Branding",
    description: "Complete brand identity design including logos, color schemes, and style guides.",
  },
  {
    icon: Smartphone,
    title: "Mobile Application Design",
    description: "Intuitive mobile app interfaces designed for the best user experience.",
  },
  {
    icon: Code2,
    title: "UI/UX Mobile Design",
    description: "User-centered design that makes your digital products easy and enjoyable to use.",
  },
];

const stats = [
  { value: "150+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "5+", label: "Years Experience" },
  { value: "24/7", label: "Support Available" },
];

export default function Home() {
  return (
    <div className="flex flex-col bg-background">
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-background to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(220,38,38,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(220,38,38,0.05),transparent_40%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm font-medium text-primary">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Currently available for freelance worldwide
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight" data-testid="text-hero-title">
                <span className="text-white">Creative</span>{" "}
                <span className="text-primary">Visual</span>
                <br />
                <span className="text-white">Designer</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg">
                We help businesses transform their digital presence with stunning designs 
                and seamless user experiences that drive results.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/submit">
                  <Button size="lg" className="gap-2 min-w-[180px] text-base font-semibold" data-testid="button-get-started">
                    Hire Us
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="gap-2 min-w-[180px] text-base font-semibold border-white/20 hover:bg-white/5" data-testid="button-view-dashboard">
                    View Projects
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden">
                  <video 
                    src={logoVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-56 sm:w-72 h-auto"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-primary/10 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.title} 
                  className="flex items-center gap-3 group cursor-pointer"
                  data-testid={`service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    {service.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-primary font-semibold uppercase tracking-wider text-sm">About Us</p>
                <h2 className="text-4xl sm:text-5xl font-black text-white">
                  We Create Digital Experiences That Matter
                </h2>
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                At MJ Digital Media, we specialize in creating stunning digital experiences 
                that help businesses grow. From brand identity to web development, we bring 
                your vision to life with precision and creativity.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <p className="text-3xl sm:text-4xl font-black text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div 
                    key={service.title}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <p className="text-primary font-semibold uppercase tracking-wider text-sm">Get Started</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Ready to Transform Your Digital Presence?
            </h2>
          </div>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Let's discuss your project and see how we can help bring your vision to life. 
            Fill out our intake form and we'll get back to you within 24 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/submit">
              <Button size="lg" className="gap-2 min-w-[200px] text-base font-semibold" data-testid="button-start-now">
                Start Your Project
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/clients">
              <Button variant="outline" size="lg" className="gap-2 min-w-[200px] text-base font-semibold border-white/20 hover:bg-white/5">
                View All Leads
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <img 
                src={logoImage} 
                alt="MJ Digital Media" 
                className="h-14 w-auto" 
              />
              <div>
                <p className="text-xl font-black text-white">MJ Digital Media</p>
                <p className="text-sm text-muted-foreground">Creative Digital Agency</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <Link href="/" className="text-sm text-muted-foreground hover:text-white transition-colors">Home</Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-white transition-colors">Dashboard</Link>
              <Link href="/clients" className="text-sm text-muted-foreground hover:text-white transition-colors">Clients</Link>
              <Link href="/submit" className="text-sm text-muted-foreground hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} MJ Digital Media. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
