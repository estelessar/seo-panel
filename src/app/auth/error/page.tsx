"use client";

import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "Bir hata oluştu";
  if (error === "AccessDenied") {
    errorMessage = "Erişim reddedildi. Lütfen gerekli izinleri verdiğinizden emin olun.";
  } else if (error === "Configuration") {
    errorMessage = "Sunucu yapılandırma hatası. Lütfen daha sonra tekrar deneyin.";
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-red-500">Hata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">{errorMessage}</p>
          <Button asChild className="w-full">
            <Link href="/dashboard">
              Ana Sayfaya Dön
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
