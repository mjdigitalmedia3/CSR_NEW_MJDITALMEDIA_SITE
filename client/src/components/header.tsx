import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { UserPlus, FileText, FolderOpen, Settings, Briefcase, LogIn, LogOut, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

const publicNavItems = [
  { href: "/", label: "Home", icon: FileText },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/portfolio", label: "Portfolio", icon: FolderOpen },
  { href: "/contact", label: "Contact", icon: MessageCircle },
  { href: "/submit", label: "New Lead", icon: UserPlus },
];

const adminNavItems = [
  { href: "/portfolio-manager", label: "Manage Portfolio", icon: Settings },
];

export function Header() {
  const router = useRouter();
  const location = router.pathname;
  const { data: session } = useSession();

  const navItems = session
    ? [...publicNavItems, ...adminNavItems]
    : publicNavItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1" data-testid="link-logo">
          <img src="/assets/MJDM_copy_1768072123197.png" alt="MJ Digital Media" className="h-14 w-auto rounded-md" />
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

        <div className="flex items-center gap-2">
          {session ? (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => signOut({ callbackUrl: "http://localhost:3001" })}
              data-testid="nav-sign-out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline-block">Sign Out</span>
            </Button>
          ) : (
            <Link href="/admin/login">
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
        </div>
      </div>
    </header>
  );
}
