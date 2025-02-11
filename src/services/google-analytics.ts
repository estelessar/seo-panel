import { google } from 'googleapis';

export class GoogleAnalyticsService {
  private analytics;

  constructor(credentials: any) {
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly']
    });

    this.analytics = google.analytics({
      version: 'v3',
      auth
    });
  }

  async getPageViews(viewId: string, startDate: string, endDate: string) {
    try {
      const response = await this.analytics.data.ga.get({
        'ids': `ga:${viewId}`,
        'start-date': startDate,
        'end-date': endDate,
        'metrics': 'ga:pageviews,ga:sessions,ga:users'
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching Google Analytics data:', error);
      throw error;
    }
  }

  async getTopPages(viewId: string, startDate: string, endDate: string) {
    try {
      const response = await this.analytics.data.ga.get({
        'ids': `ga:${viewId}`,
        'start-date': startDate,
        'end-date': endDate,
        'metrics': 'ga:pageviews',
        'dimensions': 'ga:pagePath',
        'sort': '-ga:pageviews',
        'max-results': 10
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching top pages:', error);
      throw error;
    }
  }
}
