"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  FileText, 
  Settings, 
  Search,
  Users,
  LayoutDashboard,
  FileDown
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "SEO Raporları",
    icon: Search,
    href: "/dashboard/seo-raporlari",
    color: "text-violet-500",
  },
  {
    label: "Teklif Yönetimi",
    icon: FileText,
    href: "/dashboard/teklifler",
    color: "text-pink-700",
  },
  {
    label: "Raporlar & İndirmeler",
    icon: FileDown,
    href: "/dashboard/raporlar",
    color: "text-orange-700",
  },
  {
    label: "Kullanıcılar",
    icon: Users,
    href: "/dashboard/kullanicilar",
    color: "text-green-700",
  },
  {
    label: "Ayarlar",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-700",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-background border-r">
      <div className="px-3 py-2 flex-1">
        <div className="flex items-center justify-between pl-3 mb-14">
          <h1 className="text-2xl font-bold">
            SEO Panel
          </h1>
          <ThemeToggle />
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-accent-foreground hover:bg-accent rounded-lg transition",
                pathname === route.href ? "bg-accent" : "transparent",
                pathname === route.href ? "text-accent-foreground" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="text-xs text-muted-foreground pl-3">
          2024 SEO Panel
          <br />
          v1.0.0
        </div>
      </div>
    </div>
  );
}
