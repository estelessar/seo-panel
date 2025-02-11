import { google } from 'googleapis';

export class GoogleSearchConsoleService {
  private searchconsole;

  constructor(credentials: any) {
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
    });

    this.searchconsole = google.searchconsole({
      version: 'v1',
      auth
    });
  }

  async getSearchAnalytics(siteUrl: string, startDate: string, endDate: string) {
    try {
      const response = await this.searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['query'],
          rowLimit: 10
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching Search Console data:', error);
      throw error;
    }
  }

  async getCrawlErrors(siteUrl: string) {
    try {
      const response = await this.searchconsole.urlcrawlerrorscounts.query({
        siteUrl,
        category: 'notFound'
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching crawl errors:', error);
      throw error;
    }
  }
}
