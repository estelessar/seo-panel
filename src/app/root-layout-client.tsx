"use client";

import { SideNav } from "@/components/dashboard/side-nav";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  const isAuthPage = pathname.startsWith("/login");

  if (!isLoading && !isAuthenticated && !isAuthPage) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      {!isAuthPage && isAuthenticated && <SideNav />}
      <main className={!isAuthPage && isAuthenticated ? "flex-1 pl-[280px]" : "flex-1"}>
        {children}
      </main>
    </div>
  );
}
