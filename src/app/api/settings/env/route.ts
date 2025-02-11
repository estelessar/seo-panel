import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.settings.findFirst();
    
    return NextResponse.json({
      GOOGLE_CLIENT_ID: settings?.googleClientId || "",
      GOOGLE_CLIENT_SECRET: settings?.googleClientSecret || "",
    });
  } catch (error: any) {
    console.error("Ayarlar yüklenirken hata:", error);
    return NextResponse.json(
      { error: `Ayarlar yüklenemedi: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = body;

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      return NextResponse.json(
        { error: "Client ID ve Client Secret gerekli" },
        { status: 400 }
      );
    }

    await prisma.settings.upsert({
      where: { id: 1 },
      update: {
        googleClientId: GOOGLE_CLIENT_ID,
        googleClientSecret: GOOGLE_CLIENT_SECRET,
        updatedAt: new Date(),
      },
      create: {
        id: 1,
        googleClientId: GOOGLE_CLIENT_ID,
        googleClientSecret: GOOGLE_CLIENT_SECRET,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Ayarlar kaydedilirken hata:", error);
    return NextResponse.json(
      { error: `Ayarlar kaydedilemedi: ${error.message}` },
      { status: 500 }
    );
  }
}
