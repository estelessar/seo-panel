import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Burada gelen verileri doğrulayın
    if (!data.clientId || !data.clientSecret || !data.analyticsViewId || !data.searchConsoleUrl) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur" },
        { status: 400 }
      )
    }

    // API anahtarlarını güvenli bir şekilde saklayın
    // Örneğin: .env dosyasına veya veritabanına kaydedin
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Ayarlar kaydedilirken hata oluştu:", error)
    return NextResponse.json(
      { error: "Ayarlar kaydedilirken bir hata oluştu" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Kayıtlı ayarları getirin
    // Örneğin: .env dosyasından veya veritabanından
    
    const settings = {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      analyticsViewId: process.env.GOOGLE_ANALYTICS_VIEW_ID || "",
      searchConsoleUrl: process.env.GOOGLE_SEARCH_CONSOLE_URL || "",
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Ayarlar alınırken hata oluştu:", error)
    return NextResponse.json(
      { error: "Ayarlar alınırken bir hata oluştu" },
      { status: 500 }
    )
  }
}
