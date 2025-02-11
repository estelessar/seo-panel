import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DomainSelector } from "@/components/domain-selector";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays, format } from "date-fns";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  Settings,
  User,
  Bell,
  FileText,
  Users,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Bar, Line } from "react-chartjs-2";

export function SEODashboard() {
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [seoData, setSeoData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  // SEO verilerini getir
  const fetchSEOData = async () => {
    if (!selectedDomain) return;

    try {
      setLoading(true);
      const response = await fetch("/api/seo-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: selectedDomain,
          startDate: format(dateRange.from, "yyyy-MM-dd"),
          endDate: format(dateRange.to, "yyyy-MM-dd"),
        }),
      });

      const data = await response.json();
      setSeoData(data);
    } catch (error) {
      console.error("SEO veri hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDomain) {
      fetchSEOData();
    }
  }, [selectedDomain, dateRange]);

  // KPI'ları göster
  const renderKPIs = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Organik Trafik</CardTitle>
          {seoData?.trafficData?.current[0]?.activeUsers > 
           seoData?.trafficData?.previous[0]?.activeUsers ? (
            <TrendingUp className="text-green-500" />
          ) : (
            <TrendingDown className="text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {loading ? (
              <div className="animate-pulse h-8 bg-gray-200 rounded w-16"></div>
            ) : (
              seoData?.trafficData?.current[0]?.activeUsers || 0
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {calculateChange(
              seoData?.trafficData?.current[0]?.activeUsers,
              seoData?.trafficData?.previous[0]?.activeUsers
            )}
          </p>
        </CardContent>
      </Card>
      {/* Diğer KPI kartları benzer şekilde */}
    </div>
  );

  // SEO Uyarılarını göster
  const renderAlerts = () => (
    <div className="space-y-4">
      {seoData?.seoAlerts?.map((alert: any, index: number) => (
        <Alert key={index} variant={alert.type === "warning" ? "warning" : "info"}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>{alert.type === "warning" ? "Uyarı" : "Bilgi"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  );

  // Grafikleri göster
  const renderCharts = () => (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Ziyaretçi Trendi</CardTitle>
        </CardHeader>
        <CardContent>
          <Line
            data={{
              labels: seoData?.trafficData?.current?.map((d: any) => d.date) || [],
              datasets: [
                {
                  label: "Ziyaretçi",
                  data: seoData?.trafficData?.current?.map((d: any) => d.activeUsers) || [],
                  borderColor: "rgb(59, 130, 246)",
                  tension: 0.1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </CardContent>
      </Card>
      {/* Diğer grafikler benzer şekilde */}
    </div>
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">SEO Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Bildirimler */}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ayarlar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <DomainSelector
          domains={["example.com", "test.com"]} // Bu kısmı gerçek domainlerle güncelleyin
          selectedDomain={selectedDomain}
          onDomainChange={setSelectedDomain}
        />
        <DatePickerWithRange
          date={{
            from: dateRange.from,
            to: dateRange.to,
          }}
          setDate={(newDateRange) => {
            if (newDateRange?.from && newDateRange?.to) {
              setDateRange({
                from: newDateRange.from,
                to: newDateRange.to,
              });
            }
          }}
        />
      </div>

      {renderAlerts()}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="technical">Teknik SEO</TabsTrigger>
          <TabsTrigger value="content">İçerik</TabsTrigger>
          <TabsTrigger value="backlinks">Geri Bağlantılar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {renderKPIs()}
          {renderCharts()}
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          {/* Teknik SEO içeriği */}
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          {/* İçerik analizi */}
        </TabsContent>

        <TabsContent value="backlinks" className="space-y-4">
          {/* Geri bağlantı analizi */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function calculateChange(current: number, previous: number): string {
  if (!current || !previous) return "Değişim yok";
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? "+" : ""}${change.toFixed(2)}% değişim`;
}
