import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "http://localhost:3000/api/auth/callback/google"
    );

    const webmasters = google.webmasters({
      version: 'v3',
      auth: oauth2Client
    });

    // Siteleri listele
    const response = await webmasters.sites.list({});
    const sites = response.data.siteEntry || [];

    return NextResponse.json({ sites });
  } catch (error) {
    console.error("Search Console siteleri alınırken hata:", error);
    return NextResponse.json(
      { error: "Search Console siteleri alınamadı" },
      { status: 500 }
    );
  }
}
