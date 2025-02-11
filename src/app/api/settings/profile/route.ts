import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Oturum açmanız gerekiyor" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { name, email, currentPassword, newPassword } = data;

    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Kullanıcı bulunamadı" },
        { status: 404 }
      );
    }

    // Mevcut parolayı kontrol et
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Mevcut parola hatalı" },
        { status: 400 }
      );
    }

    // Güncelleme verilerini hazırla
    const updateData: any = {
      name,
      email,
    };

    // Yeni parola varsa hash'le
    if (newPassword) {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    // Kullanıcıyı güncelle
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return NextResponse.json({
      message: "Profil güncellendi",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: "Profil güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
