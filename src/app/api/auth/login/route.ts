import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Kullanıcı yoksa veya parola yanlışsa hata döndür
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json(
        { error: "E-posta veya parola hatalı" },
        { status: 401 }
      );
    }

    // Başarılı giriş
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Giriş yapılırken bir hata oluştu" },
      { status: 500 }
    );
  }
}
