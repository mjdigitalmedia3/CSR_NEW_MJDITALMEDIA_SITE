import { Link, useLocation } from "wouter";
import { Users, LayoutDashboard, UserPlus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import logoImage from "@assets/MJDM_copy_1768072123197.png";

const navItems = [
  { href: "/", label: "Home", icon: FileText },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/submit", label: "New Lead", icon: UserPlus },
];

export function Header() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1" data-testid="link-logo">
          <img src={logoImage} alt="MJ Digital Media" className="h-14 w-auto rounded-md" />
          <span className="text-lg font-bold tracking-tight"><span className="text-foreground">DIGITAL</span><span className="text-red-500">MEDIA</span></span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="gap-2"
                  data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline-block">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
