"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Plus,
  Search,
  FileText,
  Edit,
  Phone,
  Mail,
  Building2,
  User,
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  company: z.string().min(2, "Şirket adı en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
});

const columns = [
  {
    accessorKey: "name",
    header: "Müşteri Adı",
    cell: ({ row }: any) => {
      const customer = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{customer.name}</span>
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {customer.company}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "İletişim",
    cell: ({ row }: any) => {
      const customer = row.original;
      return (
        <div className="flex flex-col">
          <span className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {customer.email}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {customer.phone}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastProposal",
    header: "Son Teklif",
    cell: ({ row }: any) => {
      const customer = row.original;
      return (
        <div className="flex flex-col">
          <span>{format(new Date(customer.lastProposal.date), "d MMMM yyyy", { locale: tr })}</span>
          <Badge
            variant={
              customer.lastProposal.status === "approved"
                ? "default"
                : customer.lastProposal.status === "pending"
                ? "secondary"
                : "destructive"
            }
            className="w-fit"
          >
            {customer.lastProposal.status === "approved"
              ? "Onaylandı"
              : customer.lastProposal.status === "pending"
              ? "Beklemede"
              : "Reddedildi"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "stats",
    header: "İstatistikler",
    cell: ({ row }: any) => {
      const customer = row.original;
      return (
        <div className="flex flex-col">
          <span>Toplam Teklif: {customer.totalProposals}</span>
          <div className="flex gap-2">
            <span className="text-green-600">
              {customer.paidAmount.toLocaleString("tr-TR")}₺
            </span>
            /
            <span className="text-yellow-600">
              {customer.pendingAmount.toLocaleString("tr-TR")}₺
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [customers, setCustomers] = useState([]);
  const [isNewCustomerDialogOpen, setIsNewCustomerDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    // Fetch customers data
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: API call to save customer
    setIsNewCustomerDialogOpen(false);
    form.reset();
  }

  const filteredCustomers = customers.filter((customer) => {
    const searchLower = search.toLowerCase();
    return (
      customer.name.toLowerCase().includes(searchLower) ||
      customer.company.toLowerCase().includes(searchLower) ||
      customer.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Müşteri Yönetimi</h1>
        <Dialog open={isNewCustomerDialogOpen} onOpenChange={setIsNewCustomerDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Müşteri Ekle
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Müşteri Ekle</DialogTitle>
              <DialogDescription>
                Müşteri bilgilerini doldurun ve kaydedin.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Müşteri Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="Ahmet Yılmaz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şirket Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="ABC Şirketi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input placeholder="ahmet@sirket.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon</FormLabel>
                      <FormControl>
                        <Input placeholder="0555 555 5555" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Kaydet</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Müşteriler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Müşteri adı, şirket veya e-posta ile arama yapın..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sıralama" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">İsme Göre</SelectItem>
                <SelectItem value="proposals">Teklif Sayısına Göre</SelectItem>
                <SelectItem value="amount">Toplam Tutara Göre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DataTable
            columns={columns}
            data={filteredCustomers}
          />
        </CardContent>
      </Card>
    </div>
  );
}
