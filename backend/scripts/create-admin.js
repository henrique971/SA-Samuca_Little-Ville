import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../src/lib/prisma.js";

const email = process.env.ADMIN_EMAIL || "admin@littleville.com";
const password = process.env.ADMIN_PASSWORD || "admin123";
const name = process.env.ADMIN_NAME || "Administrador";

try {
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.user.upsert({
    where: { email },
    update: { name, password: hashedPassword, role: "ADMIN" },
    create: { name, email, password: hashedPassword, role: "ADMIN" },
  });

  console.log(`Administrador pronto: ${admin.email}`);
} catch (error) {
  console.error("Não foi possível criar o administrador:", error.message);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
