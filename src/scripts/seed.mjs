import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Demo superadmin kullanıcısı oluştur
    const hashedPassword = bcrypt.hashSync("123456", 10);
    
    await prisma.user.upsert({
      where: { email: "admin@alessar.com" },
      update: {},
      create: {
        email: "admin@alessar.com",
        password: hashedPassword,
        name: "Superadmin",
        role: "SUPERADMIN",
      },
    });

    console.log("Demo kullanıcı başarıyla oluşturuldu");
  } catch (error) {
    console.error("Hata:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
