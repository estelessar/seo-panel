import { NextResponse } from "next/server";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/indexing",
  ],
});

const searchConsole = google.searchconsole("v1").searchanalytics;
const analyticsDataClient = google.analyticsdata("v1beta");
const pagespeedapi = google.pagespeedonline("v5");
const indexing = google.indexing("v3");

export async function POST(request: Request) {
  try {
    const { domain, startDate, endDate } = await request.json();

    const [
      searchData,
      basicMetrics,
      trafficTrend,
      indexStatus,
      coreWebVitals,
      backlinks,
      topPages,
    ] = await Promise.all([
      // Search Console verileri
      searchConsole.query({
        auth,
        siteUrl: domain,
        requestBody: {
          startDate,
          endDate,
          dimensions: ["query", "page"],
          rowLimit: 10,
        },
      }),

      // Analytics temel metrikler
      analyticsDataClient.properties.runReport({
        auth,
        property: `properties/${process.env.NEXT_PUBLIC_GA4_PROPERTY_ID}`,
        requestBody: {
          dateRanges: [
            {
              startDate,
              endDate,
            },
            {
              startDate: "30daysAgo",
              endDate: "1daysAgo",
            },
          ],
          dimensions: [
            { name: "sessionSource" },
            { name: "deviceCategory" },
            { name: "city" },
            { name: "country" }
          ],
          dimensionFilter: {
            filter: {
              fieldName: "country",
              stringFilter: {
                value: "Turkey",
                matchType: "EXACT"
              }
            }
          },
          metrics: [
            { name: "activeUsers" },
            { name: "averageSessionDuration" },
            { name: "bounceRate" },
          ],
        },
      }),

      // Trafik trendi
      analyticsDataClient.properties.runReport({
        auth,
        property: `properties/${process.env.NEXT_PUBLIC_GA4_PROPERTY_ID}`,
        requestBody: {
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: "date" }],
          metrics: [{ name: "activeUsers" }],
          orderBys: [{ dimension: { dimensionName: "date" } }],
        },
      }),

      // Index durumu
      searchConsole.webmasters.sitemaps.list({
        auth,
        siteUrl: domain,
      }),

      // Core Web Vitals
      pagespeedapi.runpagespeed({
        url: domain,
        key: process.env.GOOGLE_PAGESPEED_API_KEY,
        category: ["performance", "accessibility", "best-practices", "seo"],
      }),

      // Backlinks (örnek veri, gerçek API'ye göre güncellenecek)
      Promise.resolve({ data: { count: 1250 } }),

      // En çok ziyaret edilen sayfalar
      analyticsDataClient.properties.runReport({
        auth,
        property: `properties/${process.env.NEXT_PUBLIC_GA4_PROPERTY_ID}`,
        requestBody: {
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
          metrics: [{ name: "screenPageViews" }],
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 5,
        },
      }),
    ]);

    // SEO uyarılarını kontrol et
    const seoAlerts = [];

    // Index durumu kontrolü
    const nonIndexedPages = indexStatus.data.sitemap?.filter(
      (sitemap: any) => !sitemap.isInIndex
    );
    if (nonIndexedPages?.length > 0) {
      seoAlerts.push({
        type: "warning",
        message: `${nonIndexedPages.length} sayfa henüz indekslenmemiş`,
        details: nonIndexedPages,
      });
    }

    // Core Web Vitals kontrolü
    const performance = coreWebVitals.data.lighthouseResult?.categories?.performance?.score || 0;
    if (performance < 0.9) {
      seoAlerts.push({
        type: "warning",
        message: "Site performansı optimize edilmeli",
        details: {
          score: performance * 100,
          metrics: {
            lcp: coreWebVitals.data.lighthouseResult?.audits?.["largest-contentful-paint"],
            fid: coreWebVitals.data.lighthouseResult?.audits?.["first-input-delay"],
            cls: coreWebVitals.data.lighthouseResult?.audits?.["cumulative-layout-shift"],
          },
        },
      });
    }

    // Verileri işle ve formatla
    const formattedData = {
      searchData: searchData.data,
      analyticsData: {
        basicMetrics: {
          current: basicMetrics.data.rows?.[0],
          previous: basicMetrics.data.rows?.[1],
          trafficChange: calculateTrafficChange(
            basicMetrics.data.rows?.[0]?.metricValues?.[0].value,
            basicMetrics.data.rows?.[1]?.metricValues?.[0].value
          ),
        },
        trafficSource: basicMetrics.data.rows
          ?.filter((row: any) => row.dimensionValues?.[0].value !== "(none)")
          .map((row: any) => ({
            sessionSource: row.dimensionValues?.[0].value,
            activeUsers: parseInt(row.metricValues?.[0].value || "0"),
          })),
        devices: basicMetrics.data.rows?.map((row: any) => ({
          deviceCategory: row.dimensionValues?.[1].value,
          activeUsers: parseInt(row.metricValues?.[0].value || "0"),
        })),
        cities: basicMetrics.data.rows?.map((row: any) => ({
          city: row.dimensionValues?.[2].value,
          activeUsers: parseInt(row.metricValues?.[0].value || "0"),
        })),
        countries: basicMetrics.data.rows?.map((row: any) => ({
          country: row.dimensionValues?.[3].value,
          activeUsers: parseInt(row.metricValues?.[0].value || "0"),
        })),
        trafficTrend: trafficTrend.data.rows?.map((row: any) => ({
          date: row.dimensionValues?.[0].value,
          activeUsers: parseInt(row.metricValues?.[0].value || "0"),
        })),
      },
      indexStatus: {
        total: indexStatus.data.sitemap?.length || 0,
        indexed: indexStatus.data.sitemap?.filter((s: any) => s.isInIndex).length || 0,
        nonIndexed: nonIndexedPages?.length || 0,
      },
      coreWebVitals: {
        performance: performance * 100,
        metrics: {
          lcp: coreWebVitals.data.lighthouseResult?.audits?.["largest-contentful-paint"]?.numericValue,
          fid: coreWebVitals.data.lighthouseResult?.audits?.["first-input-delay"]?.numericValue,
          cls: coreWebVitals.data.lighthouseResult?.audits?.["cumulative-layout-shift"]?.numericValue,
        },
      },
      backlinks: backlinks.data.count,
      topPages: topPages.data.rows?.map((row: any) => ({
        path: row.dimensionValues?.[0].value,
        title: row.dimensionValues?.[1].value,
        views: parseInt(row.metricValues?.[0].value || "0"),
      })),
      seoAlerts,
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("SEO veri hatası:", error);
    return NextResponse.json(
      { error: "SEO verileri alınırken bir hata oluştu" },
      { status: 500 }
    );
  }
}

function calculateTrafficChange(current: string, previous: string): number {
  const currentValue = parseInt(current || "0");
  const previousValue = parseInt(previous || "0");
  if (previousValue === 0) return 0;
  return ((currentValue - previousValue) / previousValue) * 100;
}
