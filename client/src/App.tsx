import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/header";
import Home from "@/pages/home";
import Submit from "@/pages/submit";
import Dashboard from "@/pages/dashboard";
import Clients from "@/pages/clients";
import ClientDetail from "@/pages/client-detail";
import Portfolio from "@/pages/portfolio";
import PortfolioManager from "@/pages/portfolio-manager";
import Services from "@/pages/services";
import StrategicWebDesign from "@/pages/services/strategic-web-design";
import SEOServices from "@/pages/services/seo";
import DigitalMarketing from "@/pages/services/digital-marketing";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/submit" component={Submit} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/clients" component={Clients} />
      <Route path="/clients/:id" component={ClientDetail} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/portfolio-manager" component={PortfolioManager} />
      <Route path="/services" component={Services} />
      <Route path="/services/strategic-web-design" component={StrategicWebDesign} />
      <Route path="/services/seo" component={SEOServices} />
      <Route path="/services/digital-marketing" component={DigitalMarketing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <Router />
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
