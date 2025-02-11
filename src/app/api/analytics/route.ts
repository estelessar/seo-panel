import { getServerSession } from "next-auth"
import { BetaAnalyticsDataClient } from "@google-analytics/data"
import { NextResponse } from "next/server"

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { propertyId, startDate, endDate } = await request.json()

    // Temel metrikler
    const [basicMetrics] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
        { name: 'averageSessionDuration' },
        { name: 'engagementRate' },
      ],
      dimensions: [{ name: 'date' }],
    })

    // Sayfa görüntülemeleri
    const [pageViews] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
      ],
      dimensions: [{ name: 'pagePath' }],
      orderBys: [
        { metric: { metricName: 'screenPageViews' }, desc: true },
      ],
      limit: 10,
    })

    // Kullanıcı kaynakları
    const [trafficSource] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'engagementRate' },
      ],
      dimensions: [{ name: 'sessionSource' }],
      orderBys: [
        { metric: { metricName: 'activeUsers' }, desc: true },
      ],
      limit: 10,
    })

    // Cihaz kategorileri
    const [devices] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
      ],
      dimensions: [{ name: 'deviceCategory' }],
    })

    // Ülke dağılımı
    const [countries] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
      ],
      dimensions: [{ name: 'country' }],
      orderBys: [
        { metric: { metricName: 'activeUsers' }, desc: true },
      ],
      limit: 10,
    })

    return NextResponse.json({
      basicMetrics: basicMetrics.rows,
      pageViews: pageViews.rows,
      trafficSource: trafficSource.rows,
      devices: devices.rows,
      countries: countries.rows,
    })
  } catch (error) {
    console.error('Analytics API Hatası:', error)
    return NextResponse.json(
      { error: 'Analytics verilerini getirirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
