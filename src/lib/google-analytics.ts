import { google } from 'googleapis'

export async function getGoogleAnalyticsData(viewId: string, startDate: string, endDate: string) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    })

    const analytics = google.analytics({
      version: 'v3',
      auth,
    })

    const response = await analytics.data.ga.get({
      'ids': `ga:${viewId}`,
      'start-date': startDate,
      'end-date': endDate,
      'metrics': 'ga:users,ga:sessions,ga:pageviews,ga:bounceRate',
      'dimensions': 'ga:date',
    })

    return response.data
  } catch (error) {
    console.error('Google Analytics verisi alınırken hata oluştu:', error)
    throw error
  }
}
