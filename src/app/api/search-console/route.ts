import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const searchConsole = google.searchconsole('v1');

export async function POST(request: Request) {
  try {
    const { domain, startDate, endDate } = await request.json();

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    // Ana metrikler için sorgu
    const metricsQuery = await searchConsole.searchanalytics.query({
      siteUrl: domain,
      auth,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['date'],
        rowLimit: 100,
      },
    });

    // En iyi sayfalar için sorgu
    const topPagesQuery = await searchConsole.searchanalytics.query({
      siteUrl: domain,
      auth,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 10,
      },
    });

    // En iyi sorgular için sorgu
    const topQueriesQuery = await searchConsole.searchanalytics.query({
      siteUrl: domain,
      auth,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 10,
      },
    });

    // Cihaz dağılımı için sorgu
    const deviceQuery = await searchConsole.searchanalytics.query({
      siteUrl: domain,
      auth,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['device'],
        rowLimit: 10,
      },
    });

    // Ülke dağılımı için sorgu
    const countryQuery = await searchConsole.searchanalytics.query({
      siteUrl: domain,
      auth,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['country'],
        rowLimit: 10,
      },
    });

    return NextResponse.json({
      metrics: metricsQuery.data,
      topPages: topPagesQuery.data,
      topQueries: topQueriesQuery.data,
      deviceStats: deviceQuery.data,
      countryStats: countryQuery.data,
    });
  } catch (error) {
    console.error('Search Console API Hatası:', error);
    return NextResponse.json(
      { error: 'Search Console verilerini getirirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
