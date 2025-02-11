"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface KPICardsProps {
  organicTraffic: number;
  trafficChange: number;
  ctr: number;
  indexedPages: number;
  backlinks: number;
}

export function KPICards({
  organicTraffic,
  trafficChange,
  ctr,
  indexedPages,
  backlinks,
}: KPICardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Organik Trafik
          </CardTitle>
          <div className={`flex items-center space-x-1 ${
            trafficChange >= 0 ? "text-green-600" : "text-red-600"
          }`}>
            {trafficChange >= 0 ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            <span className="text-xs font-medium">
              {Math.abs(trafficChange).toFixed(1)}%
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{organicTraffic.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Son 30 gün
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tıklama Oranı (CTR)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {ctr.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Ortalama CTR
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            İndekslenen Sayfalar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{indexedPages.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Toplam sayfa sayısı
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Geri Bağlantılar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{backlinks.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Toplam backlink sayısı
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            API Durumu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">Aktif</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Tüm servisler çalışıyor
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
