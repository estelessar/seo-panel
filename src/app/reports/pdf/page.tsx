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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Download,
  Eye,
  Mail,
  Search,
  Trash2,
  FileText,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
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
      data: [12, 15, 18, 20, 25, 22],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
    },
  ],
};

// Mock data for report types
const reportTypesData = {
  labels: ["Genel SEO", "Site Hataları", "Backlink", "Core Web Vitals"],
  datasets: [
    {
      data: [40, 25, 20, 15],
      backgroundColor: [
        "rgb(59, 130, 246)",
        "rgb(239, 68, 68)",
        "rgb(34, 197, 94)",
        "rgb(234, 179, 8)",
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
    accessorKey: "type",
    header: "Tür",
    cell: ({ row }: any) => {
      const report = row.original;
      const typeColors = {
        "Genel SEO": "bg-blue-500",
        "Site Hataları": "bg-red-500",
        "Backlink": "bg-green-500",
        "Core Web Vitals": "bg-yellow-500",
      };
      return (
        <Badge className={cn("text-white", typeColors[report.type])}>
          {report.type}
        </Badge>
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
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }: any) => {
      const status = row.original.status;
      return (
        <div className="flex items-center gap-2">
          {status === "sent" && (
            <Badge variant="default" className="bg-green-500">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Gönderildi
            </Badge>
          )}
          {status === "pending" && (
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              <Clock className="mr-1 h-3 w-3" />
              Beklemede
            </Badge>
          )}
          {status === "error" && (
            <Badge variant="destructive">
              <XCircle className="mr-1 h-3 w-3" />
              Hata
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Boyut",
    cell: ({ row }: any) => {
      const size = row.original.size;
      return `${(size / 1024 / 1024).toFixed(2)} MB`;
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Raporu Sil</AlertDialogTitle>
                <AlertDialogDescription>
                  Bu raporu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                  Sil
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

export default function PDFReportsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [date, setDate] = useState<Date>();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch reports data
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(search.toLowerCase()) ||
      report.customerName.toLowerCase().includes(search.toLowerCase());

    const matchesType = type === "all" || report.type === type;

    const matchesDate = !date || format(new Date(report.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd");

    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">PDF Raporları</h1>
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
            <CardTitle>Rapor Türleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart data={reportTypesData} />
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
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rapor adı veya müşteri adı ile arama yapın..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select
              value={type}
              onValueChange={setType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rapor Türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="Genel SEO">Genel SEO</SelectItem>
                <SelectItem value="Site Hataları">Site Hataları</SelectItem>
                <SelectItem value="Backlink">Backlink</SelectItem>
                <SelectItem value="Core Web Vitals">Core Web Vitals</SelectItem>
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
