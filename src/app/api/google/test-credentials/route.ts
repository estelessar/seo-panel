import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { google } from "googleapis";

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst();

    if (!settings?.googleClientId || !settings?.googleClientSecret) {
      return NextResponse.json(
        { error: "Google API bilgileri bulunamadı" },
        { status: 400 }
      );
    }

    // OAuth2 client oluştur
    const oauth2Client = new google.auth.OAuth2(
      settings.googleClientId,
      settings.googleClientSecret,
      "http://localhost:3000/api/auth/callback/google"
    );

    // Search Console API'yi test et
    const webmasters = google.webmasters({
      version: 'v3',
      auth: oauth2Client
    });

    try {
      // API'nin erişilebilir olup olmadığını kontrol et
      await webmasters.sites.list({});
      return NextResponse.json({ success: true });
    } catch (apiError: any) {
      // API hatası detaylarını kontrol et
      const errorMessage = apiError.message || '';
      
      if (errorMessage.includes('invalid_client')) {
        return NextResponse.json({
          error: "Client ID veya Client Secret hatalı. Lütfen Google Cloud Console'dan kontrol edin:\n" +
                "1. Google Cloud Console'a gidin\n" +
                "2. Credentials > OAuth 2.0 Client IDs bölümüne gidin\n" +
                "3. Client ID ve Secret'ın doğru olduğundan emin olun\n" +
                "4. Authorized redirect URIs'de http://localhost:3000/api/auth/callback/google olduğunu kontrol edin"
        }, { status: 400 });
      }

      if (errorMessage.includes('unauthorized_client')) {
        return NextResponse.json({
          error: "API yetkilendirmesi yapılamadı. Lütfen:\n" +
                "1. Google Cloud Console'da OAuth consent screen'i yapılandırın\n" +
                "2. Search Console API'yi etkinleştirin\n" +
                "3. Test kullanıcılarını ekleyin (eğer 'Testing' modundaysa)"
        }, { status: 400 });
      }

      return NextResponse.json({
        error: "API bağlantısı başarısız: " + errorMessage
      }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Test sırasında hata:", error);
    return NextResponse.json(
      { error: `API test hatası: ${error.message}` },
      { status: 500 }
    );
  }
}
