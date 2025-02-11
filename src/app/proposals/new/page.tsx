"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CalendarIcon, Download, Mail, Plus, Send } from "lucide-react";

const formSchema = z.object({
  customerId: z.string().min(1, "Müşteri seçimi zorunludur"),
  services: z.array(z.string()).min(1, "En az bir hizmet seçilmelidir"),
  price: z.string().min(1, "Fiyat girişi zorunludur"),
  validUntil: z.date({
    required_error: "Geçerlilik tarihi seçimi zorunludur",
  }),
  paymentTerms: z.string().min(1, "Ödeme koşulları seçimi zorunludur"),
  notes: z.string().optional(),
});

// Mock data
const customers = [
  { id: "1", name: "ABC Şirketi", email: "contact@abc.com" },
  { id: "2", name: "XYZ Limited", email: "info@xyz.com" },
];

const services = [
  {
    id: "seo-analysis",
    name: "SEO Analizi",
    basePrice: 1500,
  },
  {
    id: "technical-seo",
    name: "Teknik SEO",
    basePrice: 2500,
  },
  {
    id: "backlink",
    name: "Backlink Çalışması",
    basePrice: 2000,
  },
  {
    id: "speed-opt",
    name: "Site Hızı Optimizasyonu",
    basePrice: 1800,
  },
];

const paymentTerms = [
  { id: "full", name: "Peşin Ödeme", discount: 10 },
  { id: "installment-3", name: "3 Taksit" },
  { id: "installment-6", name: "6 Taksit" },
  { id: "monthly", name: "Aylık Ödeme" },
];

export default function CreateProposalPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
      notes: "",
    },
  });

  function calculateTotalPrice() {
    const total = selectedServices.reduce((sum, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return sum + (service?.basePrice || 0);
    }, 0);

    const selectedPaymentTerm = paymentTerms.find(
      (term) => term.id === form.getValues("paymentTerms")
    );

    if (selectedPaymentTerm?.discount) {
      return total * (1 - selectedPaymentTerm.discount / 100);
    }

    return total;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // TODO: API call to save proposal
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Yeni Teklif Oluştur</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> PDF İndir
          </Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" /> E-posta Gönder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Teklif Detayları</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Müşteri</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Müşteri seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {customers.map((customer) => (
                            <SelectItem key={customer.id} value={customer.id}>
                              {customer.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="new">
                            <span className="flex items-center gap-2">
                              <Plus className="h-4 w-4" />
                              Yeni Müşteri Ekle
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="services"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hizmetler</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          const newServices = [...selectedServices, value];
                          setSelectedServices(newServices);
                          field.onChange(newServices);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Hizmet ekle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem
                              key={service.id}
                              value={service.id}
                              disabled={selectedServices.includes(service.id)}
                            >
                              <div className="flex justify-between items-center">
                                <span>{service.name}</span>
                                <span className="text-muted-foreground">
                                  {service.basePrice.toLocaleString("tr-TR")} ₺
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="mt-2">
                        {selectedServices.map((serviceId) => {
                          const service = services.find((s) => s.id === serviceId);
                          return (
                            <div
                              key={serviceId}
                              className="flex justify-between items-center p-2 rounded-md bg-secondary"
                            >
                              <span>{service?.name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newServices = selectedServices.filter(
                                    (id) => id !== serviceId
                                  );
                                  setSelectedServices(newServices);
                                  field.onChange(newServices);
                                }}
                              >
                                Kaldır
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Toplam Fiyat</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="number"
                            value={calculateTotalPrice()}
                            className="pl-8"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            ₺
                          </span>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Fiyat otomatik hesaplanır, manuel olarak değiştirebilirsiniz
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="validUntil"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Geçerlilik Tarihi</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: tr })
                              ) : (
                                <span>Tarih seçin</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ödeme Koşulları</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Ödeme koşulu seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentTerms.map((term) => (
                            <SelectItem key={term.id} value={term.id}>
                              <div className="flex justify-between items-center">
                                <span>{term.name}</span>
                                {term.discount && (
                                  <span className="text-green-600">
                                    %{term.discount} İndirim
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notlar</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Müşteriye özel notlar..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Teklif Oluştur</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Teklif Özeti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Seçilen Hizmetler
                  </div>
                  <div className="mt-1">
                    {selectedServices.map((serviceId) => {
                      const service = services.find((s) => s.id === serviceId);
                      return (
                        <div
                          key={serviceId}
                          className="flex justify-between py-1"
                        >
                          <span>{service?.name}</span>
                          <span>
                            {service?.basePrice.toLocaleString("tr-TR")} ₺
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Toplam</span>
                    <span className="font-bold">
                      {calculateTotalPrice().toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Önizleme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[3/4] rounded-lg border bg-card text-card-foreground flex items-center justify-center">
                <span className="text-muted-foreground">
                  Teklif önizlemesi burada görüntülenecek
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
