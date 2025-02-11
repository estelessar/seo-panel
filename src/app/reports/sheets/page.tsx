"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { LineChart } from "@/components/charts/line-chart";
import { PieChart } from "@/components/charts/pie-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  ExternalLink,
  Mail,
  Search,
  RefreshCw,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Mock data for report trend
const reportTrendData = {
  labels: ["Eylül", "Ekim", "Kasım", "Aralık", "Ocak", "Şubat"],
  datasets: [
    {
      label: "Oluşturulan Rapor",
      data: [8, 12, 15, 18, 20, 16],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
    },
  ],
};

// Mock data for customer distribution
const customerDistributionData = {
  labels: ["ABC Teknoloji", "XYZ Yazılım", "123 Digital", "Diğer"],
  datasets: [
    {
      data: [35, 25, 20, 20],
      backgroundColor: [
        "rgb(59, 130, 246)",
        "rgb(34, 197, 94)",
        "rgb(234, 179, 8)",
        "rgb(107, 114, 128)",
      ],
    },
  ],
};

const columns = [
  {
    accessorKey: "name",
    header: "Rapor Adı",
    cell: ({ row }: any) => {
      const report = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{report.name}</span>
          <span className="text-sm text-muted-foreground">
            {report.customerName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Tarih",
    cell: ({ row }: any) => {
      return format(new Date(row.original.date), "d MMMM yyyy", { locale: tr });
    },
  },
  {
    accessorKey: "sheetUrl",
    header: "Google Sheets Linki",
    cell: ({ row }: any) => {
      const url = row.original.sheetUrl;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
        >
          Sheets'te Aç
          <ExternalLink className="h-4 w-4" />
        </a>
      );
    },
  },
  {
    accessorKey: "shared",
    header: "Paylaşım Durumu",
    cell: ({ row }: any) => {
      const shared = row.original.shared;
      return shared ? (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Paylaşıldı
        </Badge>
      ) : (
        <Badge variant="destructive">
          <XCircle className="mr-1 h-3 w-3" />
          Paylaşılmadı
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

export default function SheetsReportsPage() {
  const [date, setDate] = useState<Date>();
  const [status, setStatus] = useState("all");
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch sheets reports data
    fetch("/api/reports/sheets")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesStatus = status === "all" || 
      (status === "shared" && report.shared) || 
      (status === "not-shared" && !report.shared);

    const matchesDate = !date || format(new Date(report.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

    return matchesStatus && matchesDate;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Google Sheets Raporları</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rapor Trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart data={reportTrendData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Müşteri Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart data={customerDistributionData} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Raporlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select
              value={status}
              onValueChange={setStatus}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Paylaşım Durumu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="shared">Paylaşıldı</SelectItem>
                <SelectItem value="not-shared">Paylaşılmadı</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: tr }) : <span>Tarih Seç</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <DataTable
            columns={columns}
            data={filteredReports}
          />
        </CardContent>
      </Card>
    </div>
  );
}
