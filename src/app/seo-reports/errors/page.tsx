"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { LineChart } from "@/components/charts/line-chart";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";

// Mock data for error trends
const errorTrendData = {
  labels: ["1 Şub", "2 Şub", "3 Şub", "4 Şub", "5 Şub", "6 Şub", "7 Şub"],
  datasets: [
    {
      label: "İndeksleme Hataları",
      data: [12, 10, 8, 9, 7, 5, 4],
      borderColor: "rgb(239, 68, 68)",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
      fill: true,
    },
    {
      label: "Mobil Hatalar",
      data: [5, 4, 4, 3, 3, 2, 2],
      borderColor: "rgb(234, 179, 8)",
      backgroundColor: "rgba(234, 179, 8, 0.1)",
      fill: true,
    },
    {
      label: "Schema Hataları",
      data: [8, 7, 6, 6, 5, 4, 3],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
    },
  ],
};

const columns = [
  {
    accessorKey: "type",
    header: "Hata Türü",
    cell: ({ row }: any) => {
      const severity = row.original.severity;
      return (
        <div className="flex items-center gap-2">
          {severity === "error" && <AlertCircle className="h-4 w-4 text-destructive" />}
          {severity === "warning" && <AlertTriangle className="h-4 w-4 text-warning" />}
          {severity === "info" && <CheckCircle2 className="h-4 w-4 text-info" />}
          <span>{row.original.type}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "severity",
    header: "Önem",
    cell: ({ row }: any) => {
      const severity = row.getValue("severity");
      return (
        <Badge
          variant={
            severity === "error"
              ? "destructive"
              : severity === "warning"
              ? "warning"
              : "secondary"
          }
        >
          {severity === "error"
            ? "Kritik"
            : severity === "warning"
            ? "Uyarı"
            : "Bilgi"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "solution",
    header: "Önerilen Çözüm",
  },
];

const indexingErrors = [
  {
    type: "404 Hatası",
    url: "/eski-urun-sayfasi",
    severity: "error",
    solution: "Sayfayı yeniden oluşturun veya 301 yönlendirmesi ekleyin",
  },
  {
    type: "Soft 404",
    url: "/urunler/stokta-yok",
    severity: "warning",
    solution: "Sayfa içeriğini güncelleyin veya doğru 404 yanıtı döndürün",
  },
  {
    type: "Yanlış Yönlendirme",
    url: "/blog/eski-yazi",
    severity: "error",
    solution: "301 yönlendirmesini düzeltin",
  },
];

const mobileErrors = [
  {
    type: "Küçük Font",
    url: "/iletisim",
    severity: "warning",
    solution: "Font boyutunu minimum 16px yapın",
  },
  {
    type: "Viewport Hatası",
    url: "/hakkimizda",
    severity: "error",
    solution: 'Meta viewport tag ekleyin: <meta name="viewport" content="width=device-width, initial-scale=1">',
  },
];

const schemaErrors = [
  {
    type: "Eksik Name Özelliği",
    url: "/urunler/laptop",
    severity: "error",
    solution: 'Product schema markup\'a "name" özelliği ekleyin',
  },
  {
    type: "Geçersiz Değer",
    url: "/blog/yazi-1",
    severity: "warning",
    solution: "Article schema markup'taki datePublished değerini ISO 8601 formatında güncelleyin",
  },
];

const manualActions = [
  {
    type: "Spam İçerik Cezası",
    url: "Tüm Site",
    severity: "error",
    solution: "Spam içerikleri temizleyin ve yeniden değerlendirme isteyin",
  },
];

export default function SiteErrorsPage() {
  const [activeTab, setActiveTab] = useState("indexing");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Site Hataları</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hata Trendi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <LineChart data={errorTrendData} />
          </div>
        </CardContent>
      </Card>

      {manualActions.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Google Manual Action Tespit Edildi!</AlertTitle>
          <AlertDescription>
            Sitenizde Google tarafından manuel işlem uygulanmış. Acilen gerekli düzeltmeleri yapın.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="indexing">İndeksleme Hataları</TabsTrigger>
          <TabsTrigger value="mobile">Mobil Hatalar</TabsTrigger>
          <TabsTrigger value="schema">Schema Hataları</TabsTrigger>
          <TabsTrigger value="manual">Manuel İşlemler</TabsTrigger>
        </TabsList>

        <TabsContent value="indexing">
          <Card>
            <CardHeader>
              <CardTitle>İndeksleme Hataları</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={indexingErrors} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile">
          <Card>
            <CardHeader>
              <CardTitle>Mobil Kullanılabilirlik Hataları</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={mobileErrors} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema">
          <Card>
            <CardHeader>
              <CardTitle>Schema Markup Hataları</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={schemaErrors} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Manuel İşlemler</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={manualActions} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
