import { google } from 'googleapis';

// Client tarafı API istekleri
export async function getSearchConsoleData(domain: string, startDate: string, endDate: string) {
  try {
    const response = await fetch('/api/search-console', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain,
        startDate,
        endDate,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Search Console API isteği başarısız oldu');
    }
    
    return response.json();
  } catch (error) {
    console.error('Search Console API Hatası:', error);
    throw error;
  }
}

export async function getAnalyticsData(propertyId: string, startDate: string, endDate: string) {
  try {
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propertyId,
        startDate,
        endDate,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Analytics API isteği başarısız oldu');
    }
    
    return response.json();
  } catch (error) {
    console.error('Analytics API Hatası:', error);
    throw error;
  }
}

export async function getGoogleClient(accessToken: string) {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  auth.setCredentials({ access_token: accessToken });

  return {
    searchConsole: google.searchconsole({ version: 'v1', auth }),
    analytics: google.analytics({ version: 'v3', auth }),
    analyticsData: google.analyticsdata({ version: 'v1beta', auth }),
  };
}

export async function getSearchConsoleDataFromGoogle(accessToken: string, siteUrl: string) {
  try {
    const { searchConsole } = await getGoogleClient(accessToken);

    // Son 28 günün verilerini al
    const now = new Date();
    const startDate = new Date(now.setDate(now.getDate() - 28)).toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    const response = await searchConsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 10,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Search Console veri alma hatası:', error);
    throw error;
  }
}

export async function getAnalyticsDataFromGoogle(accessToken: string, viewId: string) {
  try {
    const { analyticsData } = await getGoogleClient(accessToken);

    const response = await analyticsData.properties.runReport({
      property: `properties/${viewId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: '28daysAgo',
            endDate: 'today',
          },
        ],
        dimensions: [
          {
            name: 'pageTitle',
          },
        ],
        metrics: [
          {
            name: 'screenPageViews',
          },
          {
            name: 'totalUsers',
          },
        ],
      },
    });

    return response.data;
  } catch (error) {
    console.error('Analytics veri alma hatası:', error);
    throw error;
  }
}
