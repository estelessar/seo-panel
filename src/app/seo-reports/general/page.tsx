"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";
import { LineChart } from "@/components/charts/line-chart";
import { Download, FileSpreadsheet } from "lucide-react";
import { addDays, subDays } from "date-fns";

// Mock data
const mockPageViews = {
  labels: ["1 Şub", "2 Şub", "3 Şub", "4 Şub", "5 Şub", "6 Şub", "7 Şub"],
  datasets: [
    {
      label: "Sayfa Görüntülenme",
      data: [1200, 1900, 1500, 2100, 1800, 2300, 2000],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
    },
    {
      label: "Tıklamalar",
      data: [800, 1200, 1000, 1400, 1100, 1600, 1300],
      borderColor: "rgb(16, 185, 129)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      fill: true,
    },
  ],
};

const columns = [
  {
    accessorKey: "url",
    header: "Sayfa URL",
  },
  {
    accessorKey: "views",
    header: "Görüntülenme",
  },
  {
    accessorKey: "clicks",
    header: "Tıklama",
  },
  {
    accessorKey: "ctr",
    header: "CTR",
  },
  {
    accessorKey: "position",
    header: "Sıralama",
  },
];

const mockTableData = [
  {
    url: "/ana-sayfa",
    views: "12,450",
    clicks: "2,340",
    ctr: "18.8%",
    position: "2.3",
  },
  {
    url: "/urunler",
    views: "8,230",
    clicks: "1,520",
    ctr: "18.5%",
    position: "3.1",
  },
  {
    url: "/hakkimizda",
    views: "5,120",
    clicks: "980",
    ctr: "19.1%",
    position: "2.8",
  },
];

export default function SEOReportsPage() {
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const exportToPDF = () => {
    // PDF export logic will be implemented
    console.log("Exporting to PDF...");
  };

  const exportToSheets = () => {
    // Google Sheets export logic will be implemented
    console.log("Exporting to Google Sheets...");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">SEO Raporu</h1>
        <div className="flex items-center gap-4">
          <DateRangePicker
            value={dateRange}
            onChange={(range: any) => setDateRange(range)}
          />
          <Button onClick={exportToPDF} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            PDF İndir
          </Button>
          <Button onClick={exportToSheets} variant="outline">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Sheets&apos;e Aktar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="pages">Sayfalar</TabsTrigger>
          <TabsTrigger value="errors">Hatalar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Toplam Görüntülenme</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,892</div>
                <p className="text-xs text-muted-foreground">
                  Geçen haftaya göre +12.3%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Toplam Tıklama</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4,624</div>
                <p className="text-xs text-muted-foreground">
                  Geçen haftaya göre +8.1%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ortalama CTR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.6%</div>
                <p className="text-xs text-muted-foreground">
                  Geçen haftaya göre -2.3%
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Trafik Trendi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <LineChart data={mockPageViews} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Sayfa Performansı</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={mockTableData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors">
          <Card>
            <CardHeader>
              <CardTitle>Site Hataları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Şu anda herhangi bir hata bulunmuyor.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
