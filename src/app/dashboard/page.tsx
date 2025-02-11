"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

interface Site {
  siteUrl: string;
  permissionLevel: string;
}

export default function DashboardPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [sites, setSites] = useState<Site[]>([]);
  const [loadingSites, setLoadingSites] = useState(true);
  const [errorSites, setErrorSites] = useState<string | null>(null);

  const fetchData = async () => {
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

      if (!response.ok) {
        throw new Error("Veri alınamadı");
      }

      const data = await response.json();
      setAnalyticsData(data);
      setError(null);
    } catch (err) {
      setError("Veriler yüklenirken bir hata oluştu");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDomain && dateRange.from && dateRange.to) {
      fetchData();
    }
  }, [selectedDomain, dateRange]);

  useEffect(() => {
    const loadSites = async () => {
      try {
        setLoadingSites(true);
        const response = await fetch('/api/google/search-console/sites');
        if (!response.ok) {
          throw new Error('Siteler yüklenemedi');
        }
        const data = await response.json();
        setSites(data.sites || []);
      } catch (error) {
        console.error('Siteler yüklenirken hata:', error);
        setErrorSites('Siteler yüklenemedi. Lütfen Google API ayarlarınızı kontrol edin.');
      } finally {
        setLoadingSites(false);
      }
    };

    loadSites();
  }, []);

  const trafficData = {
    labels: analyticsData?.analyticsData?.trafficTrend?.map((item: any) => 
      format(new Date(item.date), "d MMM", { locale: tr })
    ) || [],
    datasets: [
      {
        label: "Aktif Kullanıcılar",
        data: analyticsData?.analyticsData?.trafficTrend?.map((item: any) => item.activeUsers) || [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">SEO Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DomainSelector
            value={selectedDomain}
            onChange={setSelectedDomain}
          />
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      ) : loading ? (
        <div className="space-y-4">
          <div className="h-[100px] animate-pulse rounded-lg bg-gray-100" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[120px] animate-pulse rounded-lg bg-gray-100"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <KPICards
            organicTraffic={analyticsData?.analyticsData?.basicMetrics?.current?.activeUsers || 0}
            trafficChange={analyticsData?.analyticsData?.basicMetrics?.trafficChange || 0}
            ctr={
              (analyticsData?.searchData?.ctr || 0) * 100
            }
            indexedPages={analyticsData?.indexStatus?.indexed || 0}
            backlinks={analyticsData?.backlinks || 0}
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Trafik Trendi</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart data={trafficData} />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>SEO Uyarıları</CardTitle>
              </CardHeader>
              <CardContent>
                <SEOAlerts alerts={analyticsData?.seoAlerts || []} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Şehirlere Göre Trafik</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.analyticsData?.cities?.slice(0, 10).map((city: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{city.city || "Bilinmeyen Şehir"}</span>
                      <span className="text-sm text-muted-foreground">
                        {city.activeUsers.toLocaleString()} kullanıcı
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Site Performansı</CardTitle>
              </CardHeader>
              <CardContent>
                <SitePerformance
                  performance={analyticsData?.coreWebVitals?.performance || 0}
                  metrics={analyticsData?.coreWebVitals?.metrics || {
                    lcp: 0,
                    fid: 0,
                    cls: 0,
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TopPages pages={analyticsData?.topPages || []} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Globe className="w-6 h-6" />
                  Search Console Siteleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingSites ? (
                  <div>Yükleniyor...</div>
                ) : errorSites ? (
                  <div className="text-red-500">{errorSites}</div>
                ) : (
                  <div className="space-y-4">
                    {sites.length === 0 ? (
                      <div className="text-muted-foreground">
                        Henüz kayıtlı site bulunmuyor.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {sites.map((site, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div>
                              <div className="font-medium">{site.siteUrl}</div>
                              <div className="text-sm text-muted-foreground">
                                İzin: {site.permissionLevel}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
