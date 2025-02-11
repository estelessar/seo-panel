"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LineChart,
  FileText,
  FolderDown,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "SEO Raporları",
    href: "/seo-reports",
    icon: <LineChart className="h-5 w-5" />,
    submenu: [
      {
        title: "Genel SEO Raporu",
        href: "/seo-reports/general",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Site Hataları",
        href: "/seo-reports/errors",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Backlink Analizi",
        href: "/seo-reports/backlinks",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Core Web Vitals",
        href: "/seo-reports/core-web-vitals",
        icon: <ChevronRight className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Teklif Yönetimi",
    href: "/proposals",
    icon: <FileText className="h-5 w-4" />,
    submenu: [
      {
        title: "Teklif Geçmişi",
        href: "/proposals/history",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Yeni Teklif Oluştur",
        href: "/proposals/new",
        icon: <ChevronRight className="h-4 w-4" />,
      },
      {
        title: "Müşteri Yönetimi",
        href: "/proposals/customers",
        icon: <ChevronRight className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Raporlar & İndirmeler",
    href: "/reports",
    icon: <FolderDown className="h-5 w-5" />,
  },
  {
    title: "Kullanıcılar",
    href: "/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Ayarlar",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function SideNav() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [openMenus, setOpenMenus] = React.useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-background border-r pt-4 transition-all duration-300",
        isSidebarOpen ? "w-[280px]" : "w-[80px]"
      )}
    >
      <div className="flex items-center justify-between px-4 pb-4 border-b">
        <div className={cn("flex items-center gap-2", !isSidebarOpen && "hidden")}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.png" alt="Logo" />
            <AvatarFallback>SP</AvatarFallback>
          </Avatar>
          <span className="font-semibold">SEO Panel</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            if (item.submenu) {
              return (
                <Collapsible
                  key={item.title}
                  open={openMenus.includes(item.title)}
                  onOpenChange={() => toggleMenu(item.title)}
                >
                  <CollapsibleTrigger
                    className={cn(
                      "flex items-center justify-between w-full p-2 rounded-lg text-sm",
                      isActive(item.href)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {isSidebarOpen && <span>{item.title}</span>}
                    </div>
                    {isSidebarOpen && (
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 mt-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={cn(
                          "flex items-center gap-3 p-2 rounded-lg text-sm",
                          isActive(subitem.href)
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        {subitem.icon}
                        {isSidebarOpen && <span>{subitem.title}</span>}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg text-sm",
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.icon}
                {isSidebarOpen && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-4 left-0 right-0 px-4">
        <div className={cn("text-xs text-muted-foreground", !isSidebarOpen && "hidden")}>
          2024 SEO Panel
          <br />
          v1.0.0
        </div>
      </div>
    </div>
  );
}
