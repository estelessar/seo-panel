"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Globe,
  Languages,
  DollarSign,
  Save,
  RefreshCcw,
  Search,
  BarChart,
  FileSpreadsheet,
  Clock,
  FileText,
  Database,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const systemFormSchema = z.object({
  siteTitle: z.string().min(1, { message: "Site başlığı zorunludur." }),
  metaDescription: z.string().min(1, { message: "Meta açıklaması zorunludur." }),
  language: z.string().min(1, { message: "Dil seçimi zorunludur." }),
  currency: z.string().min(1, { message: "Para birimi zorunludur." }),
  googleSearchConsoleKey: z.string().optional(),
  googleAnalyticsKey: z.string().optional(),
  googleSheetsKey: z.string().optional(),
  seoReportingEnabled: z.boolean().default(false),
  dataUpdateFrequency: z.string().min(1, { message: "Güncelleme sıklığı zorunludur." }),
});

type SystemFormValues = z.infer<typeof systemFormSchema>;

const defaultValues: Partial<SystemFormValues> = {
  siteTitle: "Alessar Admin Panel",
  metaDescription: "SEO ve dijital pazarlama yönetim paneli",
  language: "tr",
  currency: "TRY",
  seoReportingEnabled: true,
  dataUpdateFrequency: "daily",
};

export default function SystemPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isChecking, setIsChecking] = React.useState(false);

  const form = useForm<SystemFormValues>({
    resolver: zodResolver(systemFormSchema),
    defaultValues,
  });

  async function onSubmit(data: SystemFormValues) {
    setIsLoading(true);
    try {
      // Burada gerçek API çağrısı yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000)); // Demo amaçlı gecikme
      toast.success("Ayarlar güncellendi", {
        description: "Sistem ayarları başarıyla kaydedildi.",
      });
      console.log(data);
    } catch (error) {
      toast.error("Bir hata oluştu", {
        description: "Ayarlar güncellenirken bir hata oluştu.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const checkForUpdates = async () => {
    setIsChecking(true);
    try {
      // Burada gerçek güncelleme kontrolü yapılacak
      await new Promise(resolve => setTimeout(resolve, 2000)); // Demo amaçlı gecikme
      toast.success("Sistem güncel", {
        description: "En son sürümü kullanıyorsunuz.",
      });
    } catch (error) {
      toast.error("Güncelleme kontrolü başarısız", {
        description: "Lütfen daha sonra tekrar deneyin.",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Sistem Ayarları</h3>
          <p className="text-sm text-muted-foreground">
            Sistem ayarlarını yapılandırın
          </p>
        </div>
        <Button
          variant="outline"
          onClick={checkForUpdates}
          disabled={isChecking}
          className="gap-2"
        >
          <RefreshCcw className="h-4 w-4" />
          {isChecking ? "Kontrol ediliyor..." : "Güncellemeleri Kontrol Et"}
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Genel Ayarlar</CardTitle>
              <CardDescription>
                Temel site ayarlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="siteTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Başlığı</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Açıklaması</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-9" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dil</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <div className="relative">
                            <Languages className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <SelectTrigger className="pl-9">
                              <SelectValue placeholder="Dil seçin" />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tr">Türkçe</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Para Birimi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <SelectTrigger className="pl-9">
                              <SelectValue placeholder="Para birimi seçin" />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="TRY">Türk Lirası (₺)</SelectItem>
                          <SelectItem value="USD">US Dollar ($)</SelectItem>
                          <SelectItem value="EUR">Euro (€)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Bağlantıları</CardTitle>
              <CardDescription>
                Harici API servislerini yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="googleSearchConsoleKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Search Console API Anahtarı</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          type="password"
                          placeholder="API anahtarınızı girin"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      SEO verilerini çekmek için gerekli
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="googleAnalyticsKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Analytics API Anahtarı</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <BarChart className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          type="password"
                          placeholder="API anahtarınızı girin"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Analitik verilerini çekmek için gerekli
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="googleSheetsKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google Sheets API Anahtarı</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FileSpreadsheet className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          type="password"
                          placeholder="API anahtarınızı girin"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Veri aktarımı için gerekli
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Otomatik Görevler</CardTitle>
              <CardDescription>
                Sistem otomasyonlarını yapılandırın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="seoReportingEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        SEO Raporlama
                      </FormLabel>
                      <FormDescription>
                        Otomatik SEO raporları oluştur
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataUpdateFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veri Güncelleme Sıklığı</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <SelectTrigger className="pl-9">
                            <SelectValue placeholder="Güncelleme sıklığı seçin" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hourly">Her Saat</SelectItem>
                        <SelectItem value="daily">Günlük</SelectItem>
                        <SelectItem value="weekly">Haftalık</SelectItem>
                        <SelectItem value="monthly">Aylık</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Verilerin ne sıklıkta güncelleneceğini belirler
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="gap-2" disabled={isLoading}>
              <Save className="h-4 w-4" />
              {isLoading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
