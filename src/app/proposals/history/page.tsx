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
  Download,
  Edit,
  Eye,
  Mail,
  Search,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

// Mock data for trend chart
const proposalTrendData = {
  labels: ["Eylül", "Ekim", "Kasım", "Aralık", "Ocak", "Şubat"],
  datasets: [
    {
      label: "Toplam Teklif",
      data: [15, 18, 20, 22, 25, 28],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
    },
    {
      label: "Onaylanan Teklif",
      data: [10, 12, 15, 16, 18, 20],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      fill: true,
    },
  ],
};

// Mock data for approval ratio
const approvalRatioData = {
  labels: ["Onaylandı", "Beklemede", "Reddedildi"],
  datasets: [
    {
      data: [65, 25, 10],
      backgroundColor: [
        "rgb(34, 197, 94)",
        "rgb(234, 179, 8)",
        "rgb(239, 68, 68)",
      ],
    },
  ],
};

const columns = [
  {
    accessorKey: "id",
    header: "Teklif No",
  },
  {
    accessorKey: "customerName",
    header: "Müşteri",
  },
  {
    accessorKey: "createdAt",
    header: "Tarih",
    cell: ({ row }: any) => {
      return format(row.original.createdAt, "d MMMM yyyy", { locale: tr });
    },
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }: any) => {
      const status = row.original.status;
      return (
        <div className="flex items-center gap-2">
          {status === "approved" && (
            <Badge variant="default" className="bg-green-500">
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Onaylandı
            </Badge>
          )}
          {status === "pending" && (
            <Badge variant="secondary" className="bg-yellow-500 text-white">
              <Clock className="mr-1 h-3 w-3" />
              Beklemede
            </Badge>
          )}
          {status === "rejected" && (
            <Badge variant="destructive">
              <XCircle className="mr-1 h-3 w-3" />
              Reddedildi
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Tutar",
    cell: ({ row }: any) => {
      return `${row.original.amount.toLocaleString("tr-TR")} ₺`;
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const status = row.original.status;
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          {status === "pending" && (
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

export default function ProposalsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // Fetch proposals data
    fetch("/api/proposals")
      .then((res) => res.json())
      .then((data) => setProposals(data))
      .catch((error) => console.error("Error fetching proposals:", error));
  }, []);

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.customerName.toLowerCase().includes(search.toLowerCase()) ||
      proposal.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || proposal.status === statusFilter;

    // Date filter logic can be expanded based on requirements
    const matchesDate = true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Teklif Geçmişi</h1>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Yeni Teklif Oluştur
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Teklif Trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart data={proposalTrendData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Onay Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart data={approvalRatioData} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teklifler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Teklif no veya müşteri adı ile arama yapın..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Durum Filtresi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="approved">Onaylandı</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="rejected">Reddedildi</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={dateFilter}
              onValueChange={setDateFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tarih Filtresi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="today">Bugün</SelectItem>
                <SelectItem value="week">Bu Hafta</SelectItem>
                <SelectItem value="month">Bu Ay</SelectItem>
                <SelectItem value="year">Bu Yıl</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DataTable
            columns={columns}
            data={filteredProposals}
          />
        </CardContent>
      </Card>
    </div>
  );
}
