import { google } from 'googleapis'

export async function getSearchConsoleData(siteUrl: string, startDate: string, endDate: string) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    })

    const searchconsole = google.searchconsole({
      version: 'v1',
      auth,
    })

    const response = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: startDate,
        endDate: endDate,
        dimensions: ['query', 'page'],
        rowLimit: 100,
      },
    })

    return response.data
  } catch (error) {
    console.error('Search Console verisi alınırken hata oluştu:', error)
    throw error
  }
}
