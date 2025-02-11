"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Play,
  Settings,
  Power,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

const columns = [
  {
    accessorKey: "type",
    header: "Rapor Türü",
    cell: ({ row }: any) => {
      const report = row.original;
      const typeColors = {
        "SEO": "bg-blue-500",
        "Backlink": "bg-green-500",
        "Teknik SEO": "bg-purple-500",
        "Site Hataları": "bg-red-500",
      };
      return (
        <div className="flex flex-col">
          <Badge className={`text-white ${typeColors[report.type]}`}>
            {report.type}
          </Badge>
          <span className="text-sm text-muted-foreground mt-1">
            {report.customerName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastRun",
    header: "Son Çalışma",
    cell: ({ row }: any) => {
      return format(new Date(row.original.lastRun), "d MMMM yyyy HH:mm", { locale: tr });
    },
  },
  {
    accessorKey: "frequency",
    header: "Çalışma Sıklığı",
    cell: ({ row }: any) => row.original.frequency,
  },
  {
    accessorKey: "status",
    header: "Son Durum",
    cell: ({ row }: any) => {
      const status = row.original.status;
      return (
        <div className="flex items-center gap-2">
          {status === "success" && (
            <Badge variant="default" className="bg-green-500">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Başarılı
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
    accessorKey: "active",
    header: "Durum",
    cell: ({ row }: any) => {
      const [isActive, setIsActive] = useState(row.original.active);
      
      return (
        <div className="flex items-center space-x-2">
          <Switch
            checked={isActive}
            onCheckedChange={setIsActive}
          />
          <Label>{isActive ? "Aktif" : "Pasif"}</Label>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Şimdi Çalıştır">
            <Play className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" title="Ayarları Düzenle">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Zamanlama Ayarları</DialogTitle>
                <DialogDescription>
                  Otomatik rapor oluşturma ayarlarını düzenleyin
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Çalışma Sıklığı</Label>
                  <Select defaultValue={row.original.frequencyValue}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sıklık seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Günlük</SelectItem>
                      <SelectItem value="weekly">Haftalık</SelectItem>
                      <SelectItem value="biweekly">2 Haftada Bir</SelectItem>
                      <SelectItem value="monthly">Aylık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">İptal</Button>
                <Button>Kaydet</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export default function AutomatedReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch automated reports data
    fetch("/api/reports/automated")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Otomatik Raporlama</h1>
          <p className="text-muted-foreground mt-1">
            Zamanlanmış görevler ve otomatik rapor oluşturma ayarları
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Zamanlanmış Raporlar</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={reports}
          />
        </CardContent>
      </Card>
    </div>
  );
}
