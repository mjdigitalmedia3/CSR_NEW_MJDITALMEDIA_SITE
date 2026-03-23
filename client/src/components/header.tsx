import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { UserPlus, FileText, FolderOpen, Settings, Briefcase, LogIn, LogOut, MessageCircle, ShoppingBag, Package, Sparkles, LayoutDashboard, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const publicNavItems = [
  { href: "/", label: "Home", icon: FileText },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/portfolio", label: "Portfolio", icon: FolderOpen },
  { href: "/products", label: "Products", icon: ShoppingBag },
  { href: "/about-ceo", label: "About CEO", icon: User },
  { href: "/contact", label: "Contact", icon: MessageCircle },
  { href: "/submit", label: "New Lead", icon: UserPlus },
];

const adminNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portfolio-manager", label: "Manage Portfolio", icon: Settings },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/upsells", label: "Upsells", icon: Sparkles },
];

export function Header() {
  const router = useRouter();
  const location = router.pathname;
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = session
    ? [...publicNavItems, ...adminNavItems]
    : publicNavItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1" data-testid="link-logo">
          <img src="/assets/MJDM_copy_1768072123197.png" alt="MJ Digital Media" className="h-10 sm:h-14 w-auto rounded-md" />
          <span className="text-base sm:text-lg font-bold tracking-tight hidden sm:block"><span className="text-foreground">DIGITAL</span><span className="text-red-500">MEDIA</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
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
                  <span className="hidden lg:inline-block">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hidden sm:flex"
              onClick={() => signOut({ callbackUrl: "http://localhost:3001" })}
              data-testid="nav-sign-out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline-block">Sign Out</span>
            </Button>
          ) : (
            <Link href="/admin/login" className="hidden sm:block">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                data-testid="nav-admin-login"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden md:inline-block">Admin</span>
              </Button>
            </Link>
          )}
          <ThemeToggle />
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <SheetTitle className="flex items-center gap-2 mb-6">
                <img src="/assets/MJDM_copy_1768072123197.png" alt="MJ Digital Media" className="h-10 w-auto rounded-md" />
                <span className="font-bold">Menu</span>
              </SheetTitle>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = location === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start gap-3"
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
                <div className="border-t my-2" />
                {session ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "http://localhost:3001" });
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </Button>
                ) : (
                  <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                      <LogIn className="h-5 w-5" />
                      Admin Login
                    </Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
