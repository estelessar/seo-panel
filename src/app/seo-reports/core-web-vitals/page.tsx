"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "@/components/charts/line-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle, 
  Smartphone, 
  Monitor, 
  Clock, 
  MousePointer, 
  Move, 
  Zap,
  ImageIcon,
  Code,
  Database
} from "lucide-react";

// Mock data for Core Web Vitals trend
const vitalsTrendData = {
  labels: ["1 Şub", "2 Şub", "3 Şub", "4 Şub", "5 Şub", "6 Şub", "7 Şub"],
  datasets: [
    {
      label: "LCP",
      data: [2.8, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      fill: true,
    },
    {
      label: "FID",
      data: [100, 95, 90, 88, 85, 82, 80],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
    },
    {
      label: "CLS",
      data: [0.15, 0.14, 0.12, 0.11, 0.10, 0.09, 0.08],
      borderColor: "rgb(234, 179, 8)",
      backgroundColor: "rgba(234, 179, 8, 0.1)",
      fill: true,
    },
  ],
};

// Mock data for Desktop vs Mobile Performance
const performanceComparisonData = {
  labels: ["Performance", "LCP", "FID", "CLS"],
  datasets: [
    {
      label: "Masaüstü",
      data: [92, 95, 90, 91],
      backgroundColor: "rgb(34, 197, 94)",
    },
    {
      label: "Mobil",
      data: [85, 88, 82, 85],
      backgroundColor: "rgb(59, 130, 246)",
    },
  ],
};

const issues = [
  {
    title: "Resim Optimizasyonu",
    description: "Bazı görseller optimize edilmemiş durumda",
    impact: "medium",
    icon: ImageIcon,
    recommendations: [
      "WebP formatına dönüştürün",
      "Lazy loading ekleyin",
      "Responsive görseller kullanın",
    ],
  },
  {
    title: "Render Blocking Kaynaklar",
    description: "Sayfa yüklemesini yavaşlatan kaynaklar tespit edildi",
    impact: "high",
    icon: Code,
    recommendations: [
      "Kritik CSS'i inline ekleyin",
      "JavaScript yüklemesini erteleyin",
      "Üçüncü parti scriptleri optimize edin",
    ],
  },
  {
    title: "Önbellekleme Eksikleri",
    description: "Statik kaynaklar için önbellekleme yapılandırılmamış",
    impact: "low",
    icon: Database,
    recommendations: [
      "Cache-Control header'ları ekleyin",
      "Service Worker kullanın",
      "CDN yapılandırmasını optimize edin",
    ],
  },
];

export default function CoreWebVitalsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Core Web Vitals</h1>
        <div className="flex gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" /> Masaüstü
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" /> Mobil
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                LCP
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1s</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">İyi ({"<"}2.5s)</p>
              <Badge variant="default">15% İyileşme</Badge>
            </div>
            <Progress value={84} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <MousePointer className="h-4 w-4" />
                FID
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80ms</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">İyi ({"<"}100ms)</p>
              <Badge variant="default">10% İyileşme</Badge>
            </div>
            <Progress value={90} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Move className="h-4 w-4" />
                CLS
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.08</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">İyi ({"<"}0.1)</p>
              <Badge variant="default">20% İyileşme</Badge>
            </div>
            <Progress value={92} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Performance Score
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Çok İyi (90+)</p>
              <Badge variant="default">5% İyileşme</Badge>
            </div>
            <Progress value={92} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Core Web Vitals Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart data={vitalsTrendData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Masaüstü vs Mobil Performans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart data={performanceComparisonData} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performans İyileştirme Önerileri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {issues.map((issue) => (
              <div
                key={issue.title}
                className="flex items-start gap-4 p-4 rounded-lg border"
              >
                <div
                  className={`p-2 rounded-full ${
                    issue.impact === "high"
                      ? "bg-red-100 text-red-600"
                      : issue.impact === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  <issue.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{issue.title}</h3>
                    <Badge
                      variant={
                        issue.impact === "high"
                          ? "destructive"
                          : issue.impact === "medium"
                          ? "warning"
                          : "default"
                      }
                    >
                      {issue.impact === "high"
                        ? "Kritik"
                        : issue.impact === "medium"
                        ? "Orta"
                        : "Düşük"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {issue.description}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {issue.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
