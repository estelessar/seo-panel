"use client";

import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
