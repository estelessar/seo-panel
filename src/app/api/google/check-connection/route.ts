import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/auth-options';
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json(
        { error: 'Oturum bulunamadı' },
        { status: 401 }
      );
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: session.accessToken as string,
    });

    // Test Search Console API
    const webmasters = google.webmasters({
      version: 'v3',
      auth: oauth2Client,
    });

    await webmasters.sites.list();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Google API bağlantı hatası:', error);
    return NextResponse.json(
      { error: error.message || 'Google API bağlantısı başarısız' },
      { status: 500 }
    );
  }
}
