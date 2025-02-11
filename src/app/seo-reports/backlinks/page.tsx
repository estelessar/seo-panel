"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { LineChart } from "@/components/charts/line-chart";
import { PieChart } from "@/components/charts/pie-chart";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, TrendingUp, TrendingDown, Shield } from "lucide-react";

// Mock data for backlink trend
const backlinkTrendData = {
  labels: ["1 Şub", "2 Şub", "3 Şub", "4 Şub", "5 Şub", "6 Şub", "7 Şub"],
  datasets: [
    {
      label: "Toplam Backlink",
      data: [1200, 1250, 1300, 1450, 1500, 1550, 1600],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
    },
  ],
};

// Mock data for dofollow/nofollow ratio
const dofollowRatioData = {
  labels: ["Dofollow", "Nofollow"],
  datasets: [
    {
      data: [65, 35],
      backgroundColor: [
        "rgb(34, 197, 94)",
        "rgb(239, 68, 68)",
      ],
    },
  ],
};

const columns = [
  {
    accessorKey: "source",
    header: "Kaynak",
    cell: ({ row }: any) => (
      <div className="flex items-center gap-2">
        <img
          src={`https://www.google.com/s2/favicons?domain=${row.original.source}`}
          alt={row.original.source}
          className="w-4 h-4"
        />
        <span>{row.original.source}</span>
      </div>
    ),
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }: any) => (
      <div className="flex items-center gap-2">
        <span className="truncate max-w-[300px]">{row.original.url}</span>
        <a
          href={`https://${row.original.source}${row.original.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Tip",
    cell: ({ row }: any) => (
      <Badge
        variant={row.original.type === "Dofollow" ? "default" : "secondary"}
      >
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: "da",
    header: "DA",
    cell: ({ row }: any) => (
      <div className="w-32">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{row.original.da}</span>
          {row.original.daChange > 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
        <Progress value={row.original.da} className="h-2" />
      </div>
    ),
  },
  {
    accessorKey: "spamScore",
    header: "Spam Score",
    cell: ({ row }: any) => {
      const score = parseInt(row.original.spamScore);
      return (
        <div className="flex items-center gap-2">
          <Shield className={`h-4 w-4 ${score < 5 ? "text-green-500" : score < 10 ? "text-yellow-500" : "text-red-500"}`} />
          <span>{row.original.spamScore}</span>
        </div>
      );
    },
  },
];

const backlinks = [
  {
    source: "example.com",
    url: "/blog/seo-teknikleri-2024",
    type: "Dofollow",
    da: 60,
    daChange: 5,
    spamScore: "3%",
  },
  {
    source: "testsite.org",
    url: "/kategori/dijital-pazarlama",
    type: "Nofollow",
    da: 45,
    daChange: -2,
    spamScore: "8%",
  },
  {
    source: "webmaster.net",
    url: "/forum/seo-araclari",
    type: "Dofollow",
    da: 55,
    daChange: 3,
    spamScore: "2%",
  },
];

const topSources = [
  { domain: "example.com", count: 125 },
  { domain: "testsite.org", count: 89 },
  { domain: "webmaster.net", count: 67 },
  { domain: "seoforum.com", count: 45 },
  { domain: "digitalmarketing.org", count: 34 },
];

export default function BacklinksPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Backlink Analizi</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Backlink</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,600</div>
            <p className="text-xs text-muted-foreground">
              Son 7 günde +50 yeni backlink
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dofollow Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">
              1,040 Dofollow backlink
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama DA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">
              Son ay +3 puan artış
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spam Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-xs text-muted-foreground">
              Düşük risk seviyesi
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Backlink Trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart data={backlinkTrendData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dofollow / Nofollow Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart data={dofollowRatioData} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>En Çok Bağlantı Veren Domainler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSources.map((source, index) => (
              <div key={source.domain} className="flex items-center">
                <span className="w-8 text-sm text-muted-foreground">
                  {index + 1}.
                </span>
                <div className="flex-1">
                  <div className="flex items-center">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${source.domain}`}
                      alt={source.domain}
                      className="w-4 h-4 mr-2"
                    />
                    <span className="font-medium">{source.domain}</span>
                  </div>
                </div>
                <span className="font-bold">{source.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tüm Backlinkler</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={backlinks} />
        </CardContent>
      </Card>
    </div>
  );
}
